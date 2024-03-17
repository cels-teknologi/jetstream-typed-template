import {
  computed,
  nextTick,
  ref,
  toValue,
  watch,
  type Ref,
} from 'vue';

const _clone = <T>(v: T): T => (
  typeof v === 'object'
    ? { ...v }
    : (Array.isArray(v) ? <T>[...v] : v)
);

export default <T>(oriRef: Ref<T>, ms: number = 1000) => {
  const timeout = ref<number | undefined>(undefined);
  const copyRef = ref(_clone(toValue(oriRef))) as Ref<T>;
  const debouncing = computed<boolean>(() => !!timeout.value);

  const sync: () => Promise<void> = async () => {
    await nextTick();
    if (timeout.value) {
      clearTimeout(timeout.value);
      timeout.value = undefined;
    }
    copyRef.value = _clone(toValue(oriRef));
  };

  const onModified = () => {
    if (timeout.value) {
      clearTimeout(timeout.value);
      timeout.value = undefined;
    }

    timeout.value = setTimeout(async () => {
      timeout.value = undefined;

      await sync();
    }, ms);
  };

  watch(
    oriRef,
    onModified,
    { deep: typeof toValue(oriRef) === 'object' },
  );

  return { debouncing, sync, ref: copyRef };
};
