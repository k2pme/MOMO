// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    outDir: 'dist',
    format: ['esm', 'cjs'],    // -> dist/index.js (ESM) + dist/index.cjs (CJS)
    dts: true,                 // -> dist/index.d.ts
    clean: true,
    target: 'node18',
    sourcemap: false,
    treeshake: true,
});
