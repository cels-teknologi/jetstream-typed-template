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
        compilerOptions: {
          // WebAwesome elements support
          isCustomElement: (tag) => tag.startsWith('wa-') || [
            'your-custom-element',
          ].includes(tag),
        },
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
    // VitePWA(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './resources/js/'),
      'ziggy-js': path.resolve(__dirname, './vendor/tightenco/ziggy/'),
    },
  },
});
