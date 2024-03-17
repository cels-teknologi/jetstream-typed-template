import {
  computed,
  ref,
  toValue,
  type Ref,
} from 'vue';
import useDebounce from '@/composables/useDebounce';
import { match } from '@/helpers';

export default <T extends object>(f: T, ms: number = 1000) => {
  const DEFAULT_FILTER = { ...toValue(f) };

  const filter = ref({ ...DEFAULT_FILTER }) as Ref<T>;
  const debounce = useDebounce(filter, ms);

  const isEmpty = computed(() => match(toValue(filter), DEFAULT_FILTER));
  const reset = () => {
    filter.value = { ...DEFAULT_FILTER };
    return debounce.sync();
  };

  return {
    debounce,
    filter,
    isEmpty,
    reset,
  };
};
