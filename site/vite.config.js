import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Single self-contained index.html so the site opens straight from file://.
// It is written to ../docs, the folder GitHub Pages serves.
export default defineConfig({
  base: './',
  plugins: [svelte(), viteSingleFile()],
  build: { outDir: '../docs', emptyOutDir: true },
});
