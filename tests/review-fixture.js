import { DatabaseSync } from 'node:sqlite';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
function binding(sqlite) {
  return {
    prepare(sql) {
      const stmt = sqlite.prepare(sql); let values = [];
      return { bind(...args) { values = args; return this; }, async first() { return stmt.get(...values) || null; }, async run() { return stmt.run(...values); }, async all() { return { results: stmt.all(...values) }; } };
    },
    async batch(statements) { sqlite.exec('BEGIN'); try { const result = []; for (const stmt of statements) result.push(await stmt.all()); sqlite.exec('COMMIT'); return result; } catch (e) { sqlite.exec('ROLLBACK'); throw e; } },
  };
}
export function fixture(file = ':memory:', init = true) {
  const sqlite = new DatabaseSync(file);
  if (init) for (const migration of readdirSync('drizzle').filter(name => name.endsWith('.sql'))) sqlite.exec(readFileSync(join('drizzle', migration), 'utf8'));
  const objects = new Map();
  const env = { DB: binding(sqlite), PROFILE_PHOTOS: {
    async put(key, bytes, options) { objects.set(key, { bytes, options }); },
    async delete(key) { objects.delete(key); },
    async get(key) { const item = objects.get(key); return item && { body: item.bytes, httpMetadata: item.options.httpMetadata }; },
  }, ASSETS: { async fetch(request) {
    const path = new URL(request.url).pathname;
    if (path === '/index.html') return new Response(null, { status: 307, headers: { Location: '/' } });
    return new Response(request.method === 'HEAD' ? null : path === '/' ? '<html>portfolio</html>' : 'missing', { status: path === '/' ? 200 : 404 });
  } } };
  return { sqlite, env, objects };
}
