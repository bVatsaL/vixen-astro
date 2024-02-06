import fetch from 'cross-fetch';
import { AbortableFn, JsonRequestInit } from '../typedefs/json-api';

export const abortableFetch = (url: string, options: JsonRequestInit = {}): [Promise<Response>, AbortableFn] => {
  let abort = () => {};
  let signalOptions = {};
  if (typeof AbortController !== 'undefined') {
    const controller = new AbortController();
    abort = () => controller.abort();
    signalOptions = {
      signal: controller.signal,
    };
  }
  const fetchPromise = fetch(url, Object.assign(signalOptions, options));
  return [fetchPromise, abort];
};

export { fetch };
