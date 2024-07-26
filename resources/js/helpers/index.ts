export { default as fetch, toFormData, FetchError } from './fetch';
export { default as fontawesome, FAStyles } from './fontawesome';
export { default as validation } from './validation';

export const capitalize = <T extends string>(s: T) => (
  s[0].toLocaleUpperCase() + s.slice(1)
) as Capitalize<T>;

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

export const wrap = <T>(_: T | T[]) => Array.isArray(_) ? _ : [_];
