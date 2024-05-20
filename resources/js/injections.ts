import type {
  InjectionKey,
  Ref,
} from 'vue';

export const Keys = {
  //
  FontAwesome: Symbol('fontawesome') as InjectionKey<Ref<boolean>>,
};

export const NOP = () => {};
