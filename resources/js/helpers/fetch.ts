import cookie from './cookie';

export class FetchError extends Error {
  #response: Response;

  constructor(response: Response) {
    super(`Request failed with status code ${response.status}`);
    this.#response = response;
  }

  get response() {
    return this.#response;
  }
}

const f = async <T, V extends boolean = false, R = V extends true ? string : T>(
  url: RequestInfo | URL,
  init?: RequestInit,
  raw?: V,
): Promise<R | undefined> => {
  const xsrf = cookie('XSRF-TOKEN');
  const r = await fetch(url, {
    ...init,
    headers: {
      ...init?.headers,
      Accept: 'application/json',
      'Accept-Language': document.documentElement.lang,
      ...(xsrf ? { 'X-XSRF-Token': xsrf } : {}),
    },
  });

  if (!r.ok) {
    throw new FetchError(r);
  }

  if (raw) {
    return await r.text() as R;
  }
  else {
    return (await r.json()) as R;
  }
};

const map = (
  body: Record<string, unknown>,
  _cb: (_k: string, _: unknown) => void,
) => {
  for (const [_k, _v] of Object.entries(body)) {
    if (Array.isArray(_v)) {
      _v.forEach((_vv) => _cb(_k, _vv));
    }
    else {
      _cb(_k, _v);
    }
  }
};

const _m = (method: RequestInit['method']) =>
  <T, V extends boolean = false, R = V extends true ? string : T>(
    url: string,
    body?: Record<string, unknown> | FormData,
    init?: RequestInit,
    raw?: V,
  ): Promise<R | undefined> => {
    const { lang } = document.documentElement;
    if (body instanceof FormData) {
      body.append('lang', lang);
    }

    const d = {
      ...init,
      body: body instanceof FormData
        ? body
        : JSON.stringify({ ...body, lang }),
      method,
      headers: {
        ...(body instanceof FormData
          ? {}
          : { 'Content-Type': 'application/json' }
        ),
        ...init?.headers,
      },
    };
    return ((raw ? f(url, d, true) : f<T>(url, d)) as Promise<R | undefined>);
  };

export default {
  request: f,
  get: <T, V extends boolean = false, R = V extends true ? string : T>(
    url: string,
    params?: Record<string, unknown>,
    init?: RequestInit,
    raw?: V,
  ): Promise<R | undefined> => {
    const _u = new URL(url);
    if (params) {
      map(params, (_k, _) => _u.searchParams.append(
        _k,
        typeof _ === 'string' ? _ : JSON.stringify(_),
      ));
    }
    _u.searchParams.set('lang', document.documentElement.lang);

    return raw
      ? f(_u, { ...init, method: 'GET' }, true) as Promise<R | undefined>
      : f<T>(_u, { ...init, method: 'GET' }) as Promise<R | undefined>;
  },
  patch: _m('PATCH'),
  post: _m('POST'),
  put: _m('PUT'),
  delete: _m('DELETE'),
};

export const toFormData = (body: Record<string, unknown>) => {
  const _fd = new FormData();
  map(body, (_k, _) => _fd.append(_k, (
    typeof _ === 'string' || _ instanceof Blob
      ? _
      : JSON.stringify(_)
  )));
  return _fd;
};
