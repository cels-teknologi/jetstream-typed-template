import * as ziggy from '@/ziggy';
// eslint-disable-next-line import/order
import type { RouteList } from 'ziggy-js';

declare global {
  interface Window {
    Ziggy: {
      url: string;
      port: unknown;
      routes: RouteList;
    };
  }
}

export default (): void => {
  // @ts-expect-error TS is not detecting ziggy.js exports
  window.Ziggy = ziggy.Ziggy;
};
