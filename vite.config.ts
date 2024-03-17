import path from 'node:path';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.ts',
      refresh: true,
    }),
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './resources/js/'),
      'ziggy-js': path.resolve(__dirname, './vendor/tightenco/ziggy/'),
    },
  },
});
