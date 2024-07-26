import type { InertiaForm } from '@inertiajs/vue3';
import type { FetchError } from '.';

export default async <T extends Record<string, unknown>>(
  form: InertiaForm<T>,
  e: FetchError,
) => {
  const { errors } = (
    await e.response.clone().json()
  ) as ValidationErrors<T>;

  const _e: Partial<Record<keyof T, string>> = {};
  (Object.keys(form.data()) as Array<keyof T>).map((_) => {
    const _v = errors?.[_];
    _e[_] = _v ? _v[0] : '';
  });
  form.setError(_e as Record<keyof T, string>);
};
