import path from 'node:path';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
  // server: {
  //   hmr: {
  //     host: 'localhost',
  //   },
  // },
  // build: { rollupOptions: { output: { preserveModules: true } } },
  plugins: [
    laravel({
      input: ['resources/js/app.ts', 'resources/css/app.pcss'],
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
