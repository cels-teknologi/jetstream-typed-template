import { ref } from 'vue';
import { waitUntil } from '@/helpers';

declare const ___FONT_AWESOME___: (
  { styles: Record<string, Record<string, unknown[]>> } | undefined
);

export default (REQUIRED_PREFIXES: string[]) => {
  const ready = ref<boolean>(false);

  (async () => {
    await waitUntil(() => REQUIRED_PREFIXES.map(
      (_) => !!___FONT_AWESOME___?.styles?.[_],
    ).every((_) => _));
    ready.value = true;
  })();

  return ready;
};

export enum FAStyles {
  Solid = 'fas',
  Regular = 'far',
  Light = 'fal',
  Thin = 'fat',
  Duotone = 'fad',
  SharpSolid = 'fass',
  SharpRegular = 'fasr',
  SharpLight = 'fasl',
  SharpThin = 'fast',
  SharpDuotoneSolid = 'fasds',
  Brands = 'fab',
};
