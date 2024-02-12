// broken down to for easier understanding

/*
 * serial executes Promises sequentially.
 * @param {funcs} An array of funcs that return promises.
 * @example
 * const urls = ['/url1', '/url2', '/url3']
 * serial(urls.map(url => () => $.ajax(url)))
 *     .then(console.log.bind(console))
 */
export const serial = (funcs: (() => Promise<any>)[]) =>
  funcs.reduce(
    (promise: Promise<any>, func) => promise.then((result) => func().then(Array.prototype.concat.bind(result))),
    Promise.resolve([]),
  );
