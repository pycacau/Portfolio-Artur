import { cp, mkdir, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

// Pages installs the root package; the React app has its own lockfile.
function npm(args) {
  const result = spawnSync('npm', args, {
    stdio: 'inherit',
    env: { ...process.env, GENERATE_SOURCEMAP: 'false', CI: 'false' },
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}

npm(['--prefix', 'frontend', 'ci', '--include=dev', '--no-audit', '--no-fund']);
npm(['--prefix', 'frontend', 'run', 'build']);

await rm('dist/pages', { recursive: true, force: true });
await mkdir('dist/pages', { recursive: true });
await cp('frontend/build', 'dist/pages', { recursive: true });

console.log('Cloudflare Pages ready in dist/pages (frontend + review API).');
