import {
  createApp,
  defineAsyncComponent,
  h,
  type DefineComponent,
} from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { FAStyles, useFontawesome } from './composables';
import { InjectionKeys as K } from './vue-constants';
import AppVue from './App.vue';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: (name) => {
    const c = defineAsyncComponent({
      loader: async () => {
        const globs = import.meta.glob<DefineComponent>('./Pages/**/*.vue');

        let page = `./Pages/${name}.vue`;
        if (!globs[page]) {
          page = './Pages/Errors/501.vue';
        }

        const componentDef = (await globs[page]()).default as DefineComponent;
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
    app.provide(K.FontAwesome, useFontawesome([
      //
      FAStyles.Solid,
    ]));
    app.mount(el);
    return app;
  },
  progress: {
    color: '#006b59',
    includeCSS: false,
  },
});
