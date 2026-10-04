export class ReviewError extends Error {
  constructor(message, status = 400) { super(message); this.status = status; }
}
export function normalizeReviewerName(name) {
  return name.normalize('NFKD').replace(/\p{M}/gu, '').trim().replace(/\s+/gu, ' ').toLocaleLowerCase('pt-BR');
}
const duplicateNameError = () => new ReviewError('Já existe uma avaliação com esse nome. Cada nome pode enviar apenas uma avaliação.', 409);
export function database(env) {
  if (!env.DB) throw new ReviewError('As avaliações estão indisponíveis no momento. Tente novamente em instantes.', 503);
  return env.DB;
}
export function publicReview(row) {
  return {
    id: row.id, name: row.name, rating: row.rating, text: row.comment,
    projectName: row.project_name, projectUrl: row.project_url,
    photoUrl: row.photo_key ? `/api/review-photos/${row.id}` : null,
    createdAt: row.created_at, isExample: false,
  };
}
export function validateReview(data) {
  const name = String(data.get('name') || '').trim();
  const comment = String(data.get('comment') || '').trim();
  const projectName = String(data.get('projectName') || '').trim();
  const rawUrl = String(data.get('projectUrl') || '').trim();
  const rating = Number(data.get('rating'));
  const requestId = String(data.get('requestId') || '');
  if (name.length < 2 || name.length > 80) throw new ReviewError('Informe seu nome, com 2 a 80 caracteres.');
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) throw new ReviewError('Escolha uma nota de 1 a 5 estrelas.');
  if (comment.length < 15 || comment.length > 1500) throw new ReviewError('Escreva um comentário com 15 a 1.500 caracteres.');
  if (projectName.length > 100) throw new ReviewError('O nome do projeto deve ter até 100 caracteres.');
  if (!/^[a-zA-Z0-9-]{16,80}$/.test(requestId)) throw new ReviewError('Recarregue a página e tente novamente.');
  if (data.get('consent') !== 'true') throw new ReviewError('Autorize a publicação da sua avaliação para continuar.');
  if (String(data.get('companyWebsite') || '').trim()) throw new ReviewError('Não foi possível enviar a avaliação.');
  let projectUrl = '';
  if (rawUrl) {
    if (rawUrl.length > 500) throw new ReviewError('O link é muito longo.');
    try {
      const url = new URL(rawUrl);
      if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) throw new Error();
      projectUrl = url.href;
    } catch { throw new ReviewError('Informe um link completo, começando com https:// ou http://.'); }
  }
  return { name, comment, projectName, projectUrl, rating, requestId };
}
export async function validatePhoto(photo) {
  if (!photo || typeof photo.arrayBuffer !== 'function' || !photo.size) return null;
  if (photo.size > 1024 * 1024) throw new ReviewError('A foto preparada deve ter até 1 MB. Escolha outra imagem.');
  const bytes = new Uint8Array(await photo.arrayBuffer());
  const matches = (values, offset = 0) => values.every((value, index) => bytes[offset + index] === value);
  let type;
  if (matches([0xff, 0xd8, 0xff])) type = 'image/jpeg';
  else if (matches([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) type = 'image/png';
  else if (matches([0x52, 0x49, 0x46, 0x46]) && matches([0x57, 0x45, 0x42, 0x50], 8)) type = 'image/webp';
  else throw new ReviewError('Envie uma foto em JPG, PNG ou WebP.');
  if (photo.type !== type) throw new ReviewError('O formato da foto não corresponde ao arquivo.');
  return { bytes, type };
}
export async function listReviews(request, env) {
  const db = database(env), url = new URL(request.url);
  let offset = 0;
  if (url.searchParams.has('cursor')) {
    const raw = url.searchParams.get('cursor');
    if (!/^\d{1,8}$/.test(raw)) throw new ReviewError('Página inválida.');
    offset = Number(raw);
  }
  const [page, count] = await db.batch([
    db.prepare('SELECT * FROM reviews ORDER BY created_at ASC, id ASC LIMIT 100 OFFSET ?').bind(offset),
    db.prepare('SELECT COUNT(*) AS total FROM reviews'),
  ]);
  const total = Number(count.results[0]?.total || 0);
  return { items: page.results.map(publicReview), total, nextCursor: offset + page.results.length < total ? String(offset + page.results.length) : null };
}
export async function submitReview(request, env) {
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) throw new ReviewError('Envie sua avaliação pela página do site.', 403);
  const length = Number(request.headers.get('Content-Length') || 0);
  if (length > 1200000) throw new ReviewError('A foto é muito grande. Escolha outra imagem.', 413);
  if (!request.headers.get('Content-Type')?.startsWith('multipart/form-data')) throw new ReviewError('Formato de envio inválido.');
  const reader = request.body?.getReader();
  if (!reader) throw new ReviewError('Preencha o formulário para enviar.');
  const chunks = []; let size = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 1200000) { await reader.cancel(); throw new ReviewError('A foto é muito grande. Escolha outra imagem.', 413); }
    chunks.push(value);
  }
  let data;
  try { data = await new Response(new Blob(chunks), { headers: { 'Content-Type': request.headers.get('Content-Type') } }).formData(); }
  catch { throw new ReviewError('Não foi possível ler o formulário. Tente novamente.'); }
  const input = validateReview(data), db = database(env);
  const existing = await db.prepare('SELECT * FROM reviews WHERE request_id = ?').bind(input.requestId).first();
  if (existing) return { review: publicReview(existing), duplicate: true };
  const nameKey = normalizeReviewerName(input.name);
  if (nameKey.length < 2) throw new ReviewError('Informe um nome válido, com 2 a 80 caracteres.');
  const claimed = await db.prepare('SELECT * FROM reviews WHERE name_key = ?').bind(nameKey).first();
  // Older reviews keep their original data and are covered by the same rule.
  const legacy = claimed ? null : await db.prepare('SELECT * FROM reviews WHERE name_key IS NULL').all();
  const matchingName = claimed || legacy.results.find(row => normalizeReviewerName(row.name) === nameKey);
  if (matchingName) {
    if (matchingName.request_id === input.requestId) return { review: publicReview(matchingName), duplicate: true };
    throw duplicateNameError();
  }
  const photo = await validatePhoto(data.get('photo'));
  if (photo && !env.PROFILE_PHOTOS) throw new ReviewError('Não foi possível salvar a foto. Tente novamente em instantes.', 503);
  const now = Date.now();
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) {
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${ip}:${Math.floor(now / 3600000)}`));
    const key = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
    const result = await db.prepare('INSERT INTO review_rate_limits (key, attempts, expires_at) VALUES (?, 1, ?) ON CONFLICT(key) DO UPDATE SET attempts = attempts + 1 WHERE attempts < 5 RETURNING attempts').bind(key, now + 3600000).first();
    if (!result) throw new ReviewError('Você já enviou várias avaliações. Tente novamente mais tarde.', 429);
    await db.prepare('DELETE FROM review_rate_limits WHERE expires_at < ?').bind(now).run();
  }
  const id = crypto.randomUUID();
  const photoKey = photo ? `review-photos/${id}` : null;
  if (photo) await env.PROFILE_PHOTOS.put(photoKey, photo.bytes, { httpMetadata: { contentType: photo.type } });
  try {
    await db.prepare('INSERT INTO reviews (id, request_id, name, name_key, rating, comment, project_name, project_url, photo_key, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(request_id) DO NOTHING ON CONFLICT(name_key) DO NOTHING').bind(id, input.requestId, input.name, nameKey, input.rating, input.comment, input.projectName, input.projectUrl, photoKey, now).run();
  } catch (error) {
    if (photoKey) await env.PROFILE_PHOTOS.delete(photoKey).catch(() => {});
    throw error;
  }
  const saved = await db.prepare('SELECT * FROM reviews WHERE request_id = ?').bind(input.requestId).first();
  if (saved?.id !== id && photoKey) await env.PROFILE_PHOTOS.delete(photoKey);
  if (!saved) throw duplicateNameError();
  return { review: publicReview(saved), duplicate: saved.id !== id };
}
