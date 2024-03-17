import {
  computed,
  toValue,
  type Ref,
} from 'vue';

export interface Pagination<T> {
  data: T[];
  page: number;
  per_page: number;
  start: number;
  end: number;
  total: number;
  total_page: number;
}

export interface PaginatedResource<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    next: string;
    prev: string;
  };
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    from: number;
    to: number;
    total: number;

    [key: string]: unknown;
  };
}

export default <T>(
  dataRef: Ref<{ data: PaginatedResource<T> } | undefined>,
) => computed(() => {
  const d = toValue(dataRef)?.data;
  const meta = d?.meta;
  const total = meta?.total || 0;
  const page = meta?.current_page || 1;
  const per_page = meta?.per_page || 10;
  const start = Math.min(meta?.from || 0, total);
  const end = Math.min(meta?.to || 0, total);

  return {
    page,
    per_page,
    start,
    end,
    total,
    total_page: Math.ceil(total / per_page),
    data: d?.data || [],
  } as Pagination<T>;
});
