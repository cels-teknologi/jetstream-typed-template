import { ref } from 'vue';

declare const ___FONT_AWESOME___: (
  { styles: Record<string, Record<string, unknown[]>> }
);

export default (REQUIRED_PREFIXES: string[]) => {
  const ready = ref<boolean>(false);

  const _watch = () => {
    setTimeout(() => {
      if (___FONT_AWESOME___
        && ___FONT_AWESOME___.styles
        && REQUIRED_PREFIXES.map(
          (_) => !!___FONT_AWESOME___.styles[_],
        ).every((_) => _)
      ) {
        ready.value = true;
        return;
      }
      _watch();
    }, 1000);
  };
  _watch();

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
  SharpDuotone = 'fasd',
  Brands = 'fab',
};
