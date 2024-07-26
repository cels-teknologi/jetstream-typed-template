import type { InjectionKey, Ref } from 'vue';

export const InjectionKeys = {
  FontAwesome: Symbol() as InjectionKey<Ref<boolean>>,
};
