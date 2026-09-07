import { cp, mkdir, rm } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const output = new URL('dist/', root);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const file of ['index.html', 'preview.html', 'styles.css', 'figma-buttons.css', 'wireframe.js', 'public']) {
  await cp(new URL(`wireframe/${file}`, root), new URL(file, output), { recursive: true });
}

console.log('Static wireframe built in dist/');
