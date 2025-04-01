import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit(), paraglideVitePlugin({ project: './project.inlang', outdir: './src/lib/paraglide' })],

  test: { include: ['tests/unit/**/*.{test,spec}.{js,ts}'] },
});
