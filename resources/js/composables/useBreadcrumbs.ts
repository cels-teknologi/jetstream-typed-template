import { readonly, shallowRef } from 'vue';

export type Breadcrumbs = [name: string, link: string];

export default () => {
  const breadcrumbs = shallowRef<Breadcrumbs[]>([]);

  const clear = () => {
    breadcrumbs.value = [];
  };

  const pop = () => {
    if (breadcrumbs.value.length === 0) {
      return undefined;
    }

    const v = breadcrumbs.value[breadcrumbs.value.length - 1];
    breadcrumbs.value = [...breadcrumbs.value.slice(0, -1)];
    return v;
  };

  const push = (v: [string, string]) => {
    breadcrumbs.value = [
      ...breadcrumbs.value,
      [...v],
    ];
  };

  const set = (i: number, newBreadcrumbs: Breadcrumbs[]) => {
    breadcrumbs.value = [...newBreadcrumbs];
  };

  return {
    clear,
    pop,
    push,
    set,
    breadcrumbs: readonly(breadcrumbs),
  };
};
