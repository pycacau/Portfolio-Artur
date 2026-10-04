import { ReviewError, database, listReviews, submitReview } from './reviews.js';
const json = (body, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    try {
      if (url.pathname === '/api/reviews') {
        if (request.method === 'GET') return json(await listReviews(request, env));
        if (request.method === 'POST') return json(await submitReview(request, env), 201);
        return json({ error: 'Método não permitido.' }, 405);
      }
      const photoRoute = url.pathname.match(/^\/api\/review-photos\/([a-f0-9-]{36})$/);
      if (photoRoute && ['GET', 'HEAD'].includes(request.method)) {
        const row = await database(env).prepare('SELECT photo_key FROM reviews WHERE id = ?').bind(photoRoute[1]).first();
        if (!row?.photo_key || !env.PROFILE_PHOTOS) return json({ error: 'Foto não encontrada.' }, 404);
        const photo = await env.PROFILE_PHOTOS.get(row.photo_key);
        if (!photo) return json({ error: 'Foto não encontrada.' }, 404);
        return new Response(request.method === 'HEAD' ? null : photo.body, { headers: {
          'Content-Type': photo.httpMetadata?.contentType || 'image/webp',
          'Cache-Control': 'public, max-age=31536000, immutable',
          'X-Content-Type-Options': 'nosniff',
        } });
      }
      if (url.pathname.startsWith('/api/')) return json({ error: 'Página não encontrada.' }, 404);
      if (!env.ASSETS) return new Response('Site indisponível.', { status: 503 });
      // Fetch the clean root internally: /index.html is normalized to a redirect by the asset service.
      if (['GET', 'HEAD'].includes(request.method) && !url.pathname.split('/').at(-1).includes('.')) {
        return env.ASSETS.fetch(new Request(new URL('/', url), request));
      }
      return env.ASSETS.fetch(request);
    } catch (error) {
      if (!(error instanceof ReviewError)) console.error('Review request failed:', error);
      return json({ error: error instanceof ReviewError ? error.message : 'Não foi possível concluir agora. Seus dados não foram apagados; tente novamente.' }, error.status || 503);
    }
  },
};
