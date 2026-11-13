import { build } from 'esbuild';
import { mkdir } from 'node:fs/promises';

await mkdir('public/cs-dicom-loader', { recursive: true });

await build({
    entryPoints: ['./node_modules/@cornerstonejs/dicom-image-loader/dist/esm/decodeImageFrameWorker.js'],
    outfile: 'public/cs-dicom-loader/decodeImageFrameWorker.js',
    bundle: true,
    format: 'esm',
    platform: 'browser',
    target: 'es2022',
    external: ['fs', 'path']
});