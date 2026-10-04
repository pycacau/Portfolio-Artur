import { cp, mkdir, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { build } from 'esbuild';

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

// Pages advanced mode expects a standalone module at the output root.
await build({
  entryPoints: ['server/index.js'],
  outfile: 'dist/pages/_worker.js',
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  minify: true,
});

console.log('Cloudflare Pages ready in dist/pages (frontend + review API).');
