export { default as fetch, toFormData, FetchError } from './fetch';

export { default as validation } from './validation';

export const capitalize = <T extends string>(s: T) => (
  s[0].toLocaleUpperCase() + s.slice(1)
) as Capitalize<T>;

export const clamp = (_: number, min: number, max: number) => (
  Math.min(Math.max(_, min), max)
);

export const clipboardCopy = async (text: string): Promise<void> => (
  navigator.clipboard
    ? navigator.clipboard.writeText(text)
    : new Promise((res, rej) => {
      let err;

      const textArea = document.createElement('textarea');
      textArea.value = text;

      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.position = 'fixed';

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand('copy');
      }
      catch (caughtError) {
        err = caughtError;
      }

      document.body.removeChild(textArea);

      if (err) {
        rej(err);
      }
      else {
        res();
      }
    })
);

export const match = (a: unknown, b: unknown): boolean => {
  if (a && typeof a === 'object' && b && typeof b === 'object') {
    return Object.keys(a).length === Object.keys(b).length
      && Object.keys(a).map((k) => (
        (a as Record<string, unknown>)[k]
        === (b as Record<string, unknown>)?.[k]
      )).every((_) => _);
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.map(
      (_, i) => match(_, b[i]),
    ).every((_) => _);
  }

  return a === b;
};

export const only = (
  object: Record<string, unknown>,
  keys: string[] = [],
) => {
  let result = {};
  keys.forEach((key) => {
    result = { ...result, [key]: object[key] };
  });
  return result;
};

export const sleep = (ms = 1000) => new Promise<void>(
  (res) => setTimeout(res, ms),
);

export const uniqueId = (random = true) => {
  const sec = Date.now() * 1000 + Math.random() * 1000;
  const id = sec.toString(16).replace(/\./g, '').padEnd(14, '0');
  return `${id}${random ? `.${Math.trunc(Math.random() * 100000000)}` : ''}`;
};

export const waitUntil = <T>(
  getter: () => T,
  cancel: () => boolean = () => false,
  ms: number = 1000,
) => new Promise<NonNullable<T>>((res, rej) => {
  // let _timeout: ReturnType<typeof setTimeout>;

  const _fn = () => {
    try {
      const t = getter();
      if (!!t) {
        res(t);
      }
      else {
        if (cancel()) {
          rej('Cancelled.');
        }
        setTimeout(_fn, ms);
      }
    }
    catch (e) {
      rej(e);
    }
  };

  _fn();
});

export const wrap = <T>(_: T | T[]) => Array.isArray(_) ? _ : [_];
