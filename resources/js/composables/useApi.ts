import {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from 'axios';
import {
  isRef,
  ref,
  toValue,
  watch,
  type Ref,
} from 'vue';

export default <T>(
  axiosRequest: AxiosInstance | AxiosInstance['request'],
  cfg: Ref<AxiosRequestConfig> | AxiosRequestConfig,
  immediate: boolean = false,
) => {
  const rr: AxiosInstance['request'] = (
    typeof axiosRequest !== 'function'
      ? (axiosRequest as AxiosInstance).request
      : (axiosRequest as AxiosInstance['request'])
  );
  const response = ref<{ data: T } | undefined>(undefined);
  const error = ref<unknown>(undefined);
  const processing = ref(false);

  const request = async () => {
    if (processing.value) {
      return;
    }

    response.value = undefined;
    error.value = undefined;
    processing.value = true;
    try {
      response.value = await rr(toValue(cfg));
    }
    catch (e) {
      //
      if (e instanceof AxiosError) {
        error.value = e?.response?.data?.message || e;
        response.value = e?.response || undefined;
      }
      else {
        error.value = e;
      }
    }
    processing.value = false;
  };

  if (isRef(cfg)) {
    watch(cfg, request, { immediate, deep: true });
  }
  else if (immediate) {
    request();
  }

  return { response, error, processing, refresh: request };
};
