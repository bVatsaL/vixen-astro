import { selectorFamily } from 'recoil-ssr';
import { cachedFetch } from './cache.atom';
import { pagesApiEndpointAtom } from './site.atom';

export const pagesAtom = selectorFamily({
  key: 'wp-pages',
  get:
    ({ slug }: { slug: string }) =>
    async ({ get }) => {
      if (!slug) {
        // @todo return json data for home page, task pending
        return {};
      }
      const pagesApiEndpoint = get(pagesApiEndpointAtom);
      const requestUrl = new URL('pages', pagesApiEndpoint);
      requestUrl.searchParams.set('slug', slug);
      const page = await cachedFetch({
        id: `pages-${slug}`,
        path: requestUrl.toString(),
        rootContext: '[0]',
        options: {
          returnError: true,
        },
      }, get);
      return page;
    },
});
