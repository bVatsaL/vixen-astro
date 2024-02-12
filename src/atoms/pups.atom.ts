import { selector } from 'recoil-ssr';
import { cachedFetch } from './cache.atom';
import { expectedSiteOriginAtom, siteUrlAtom } from './site.atom';

export const pupsAtom = selector({
  key: 'pups',
  get: async ({ get }) => {
    const siteUrl = get(siteUrlAtom);
    const siteOrigin = get(expectedSiteOriginAtom);
    const pupsUrl = new URL('/_api/pups/', siteUrl);
    pupsUrl.searchParams.append('origin', siteOrigin);
    const pupsData = await cachedFetch({
      id: 'pups',
      path: pupsUrl.toString(),
    }, get);
    return pupsData?.pups__ui ?? [];
  },
});
