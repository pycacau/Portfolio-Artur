import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { writeFile } from 'node:fs/promises';

// Resolve from the frontend package so this also works when Pages installs
// dependencies only inside frontend (the React framework preset).
const require = createRequire(new URL('../frontend/package.json', import.meta.url));
const { build } = require('esbuild');
await build({
  entryPoints: [fileURLToPath(new URL('../server/index.js', import.meta.url))],
  outfile: fileURLToPath(new URL('../frontend/build/_worker.js', import.meta.url)),
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  minify: true,
});
await writeFile(new URL('../frontend/build/_routes.json', import.meta.url), JSON.stringify({
  version: 1, include: ['/api/*'], exclude: [],
}));
console.log('Review API included in frontend/build.');
