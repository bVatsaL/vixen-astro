import { type AbortableFn, type JsonRequestInit } from '../typedefs/json-api';
import { abortableFetch, fetch } from './fetch.util';

const defaultHeaders = Object.freeze({
  Accept: 'application/json',
});

const defaultOptions: JsonRequestInit = Object.freeze({
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'omit',
  headers: defaultHeaders,
});

export class FetchError extends Error {
  status: number | string;

  statusCode: number | string;

  error: any;

  response: any;

  jsonResponse: any;

  constructor(message: string, statusCode: number | string, response: any, jsonResponse = {}) {
    super(message);
    if (Error.captureStackTrace && typeof Error.captureStackTrace === 'function') {
      Error.stackTraceLimit = Infinity;
      Error.captureStackTrace(this, FetchError);
    }
    this.statusCode = statusCode;
    this.status = statusCode;
    this.response = response;
    this.jsonResponse = jsonResponse;
  }
}

const status = async (response: Response) => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  let error = `[HTTP STATUS: ${response.status}] Error while fetching: ${response.url}.`;
  const hasContentType = response.headers.has('Content-Type');
  if (hasContentType) {
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.toLowerCase().indexOf('json') !== -1) {
      const jsonResponse = await response.json();
      if (jsonResponse.error_description) {
        error += ` ${jsonResponse.error_description}`;
      }
      throw new FetchError(jsonResponse.error_description || error, response.status, response, jsonResponse);
    }
  }
  throw new FetchError(error, response.status, response);
};

function json(response: Response) {
  const hasContentType = response.headers.has('Content-Type');
  if (hasContentType) {
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.toLowerCase().indexOf('json') !== -1) {
      return response.json();
    }
  }
  return response;
}

/**
 * Create request options for the fetch
 * @param options
 */
const createRequestOptions = (options: JsonRequestInit = {}) => {
  let requestHeaders: JsonRequestInit['headers'] = { ...defaultHeaders };
  const method = (options.method || 'GET').toUpperCase();
  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    requestHeaders = {
      ...requestHeaders,
      'Content-Type': 'application/json',
    };
  }
  requestHeaders = { ...requestHeaders, ...options.headers };
  if (options.isMultipart) {
    // @ts-ignore
    requestHeaders['Content-Type'] = undefined;
    // @ts-ignore
    requestHeaders['Content-Type'] = undefined;
    try {
      // @ts-ignore
      delete requestHeaders['Content-Type'];
    } catch {}

  }

  const requestOptions = { ...defaultOptions, ...options };
  requestOptions.method = requestOptions.method ? requestOptions.method.toUpperCase() : requestOptions.method;
  if (!options.isMultipart && typeof requestOptions.body === 'object') {
    requestOptions.body = JSON.stringify(requestOptions.body);
  }
  requestOptions.headers = requestHeaders;
  return requestOptions;
};

export const abortableJsonFetch = <T = any>(u: string, options: JsonRequestInit = {}): [Promise<T>, AbortableFn] => {
  const [fPromise, abort] = abortableFetch(u, createRequestOptions(options));
  const fetchPromise = fPromise.then(status).then(json);
  return [fetchPromise, abort];
};

const jsonFetch = (u: string, options: JsonRequestInit = {}) =>
  fetch(u, createRequestOptions(options)).then(status).then(json);

export default jsonFetch;
