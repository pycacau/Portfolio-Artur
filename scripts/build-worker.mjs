import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
const build = spawnSync('npm', ['--prefix', 'frontend', 'run', 'build'], {
  stdio: 'inherit', env: { ...process.env, GENERATE_SOURCEMAP: 'false', CI: 'false' },
});
if (build.status !== 0) process.exit(build.status || 1);
await rm('dist', { recursive: true, force: true });
await mkdir('dist/server', { recursive: true });
await mkdir('dist/.openai', { recursive: true });
await cp('frontend/build', 'dist/client', { recursive: true });
await cp('server', 'dist/server', { recursive: true });
await cp('.openai/hosting.json', 'dist/.openai/hosting.json');
await writeFile('dist/server/wrangler.json', JSON.stringify({
  name: 'artur-portfolio', main: 'index.js', compatibility_date: '2026-10-04',
  assets: { directory: '../client', binding: 'ASSETS', not_found_handling: 'single-page-application', run_worker_first: ['/api/*'] },
}, null, 2));
console.log('Portfolio and persistent review API ready.');
