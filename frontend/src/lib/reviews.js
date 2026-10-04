export const PLACEHOLDER_COUNT = 20;
export function composeFeedbacks(reviews, examples) {
  return [...reviews, ...examples.slice(Math.min(reviews.length, PLACEHOLDER_COUNT), PLACEHOLDER_COUNT).map(item => ({ ...item, isExample: true }))];
}
export async function loadReviews(signal) {
  const items = [], seen = new Set();
  let cursor = null;
  do {
    const response = await fetch(`/api/reviews${cursor ? `?cursor=${encodeURIComponent(cursor)}` : ''}`, { signal, cache: 'no-store' });
    if (!response.ok) throw new Error('Não foi possível carregar as avaliações agora.');
    const page = await response.json();
    if (!Array.isArray(page.items)) throw new Error('Resposta inválida.');
    items.push(...page.items);
    cursor = page.nextCursor;
    if (cursor && seen.has(cursor)) throw new Error('Não foi possível carregar todas as avaliações.');
    if (cursor) seen.add(cursor);
  } while (cursor);
  return items;
}
export async function prepareProfilePhoto(file) {
  if (!file) return null;
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) {
    throw new Error('Escolha uma foto JPG, PNG ou WebP de até 5 MB.');
  }
  const bitmap = await createImageBitmap(file);
  try {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 256;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Não foi possível preparar a foto.');
    const scale = Math.min(256 / bitmap.width, 256 / bitmap.height);
    const width = bitmap.width * scale, height = bitmap.height * scale;
    context.fillStyle = '#f3f3f0'; context.fillRect(0, 0, 256, 256);
    context.drawImage(bitmap, (256 - width) / 2, (256 - height) / 2, width, height);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/webp', 0.85));
    if (!blob) throw new Error('Não foi possível preparar a foto. Escolha outra imagem.');
    return blob;
  } finally { bitmap.close(); }
}
