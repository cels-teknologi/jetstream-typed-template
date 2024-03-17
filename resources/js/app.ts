import '../css/app.pcss';

import { createApp, defineAsyncComponent, h, type DefineComponent } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import AppVue from './App.vue';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: (name) => {
    const c = defineAsyncComponent({
      loader: async () => {
        const globs = import.meta.glob<DefineComponent>('./Pages/**/*.vue');
        const componentDef = (
          await globs[`./Pages/${name}.vue`]()
        ).default as DefineComponent;
        componentDef.inheritAttrs = false;
        return componentDef;
      },
    });
    c.layout = (_h: typeof h, child: unknown) => _h(AppVue, {}, () => [child]);
    return c;
  },
  setup: ({ el, App, props, plugin }) => {
    const app = createApp({ render: () => h(App, props) })
      .use(plugin);

    app.mount(el);
    return app;
  },
  progress: { color: '#006b59' },
});
