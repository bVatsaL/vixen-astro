import { selectorFamily } from 'recoil-ssr';
import { cachedFetch } from './cache.atom';
import { expectedSiteOriginAtom, siteUrlAtom } from './site.atom';

export const srpVdpSeoAtom = selectorFamily({
  key: 'srp-vdp-seo',
  get:
    ({ pathname, searchStr }: { pathname?: string; searchStr?: string }) =>
    async ({ get }) => {
      const searchParams = new URLSearchParams(searchStr);
      const siteUrl = get(siteUrlAtom);
      const expectedSiteOrigin = get(expectedSiteOriginAtom);
      let path = pathname;
      if (!path?.startsWith('/')) {
        path = `/${path}`;
      }
      const seoApiEndPoint = new URL(`/_api/seodata${path}`, siteUrl);
      if (searchStr) {
        searchParams.forEach((data, key) => {
          seoApiEndPoint.searchParams.set(key, data);
        });
      }
      seoApiEndPoint.searchParams.set('origin', expectedSiteOrigin);
      const seoData = await cachedFetch(
        {
          id: `srp-vdp-seo-${seoApiEndPoint.searchParams.toString()}`,
          path: seoApiEndPoint?.toString(),
        },
        get,
      );
      return seoData ?? {};
    },
});

export const srpVdpMetaDataAtom = selectorFamily({
  key: 'srpVdpMetaData',
  get:
    ({ pathname, search }: { pathname: string; search: string }) =>
    async ({ get }) => {
      const siteUrl = get(siteUrlAtom);
      const expectedSiteOrigin = get(expectedSiteOriginAtom);
      const seoApiEndPoint = new URL(siteUrl);
      if (!pathname?.startsWith('/')) {
        pathname = `/${pathname}`;
      }
      seoApiEndPoint.pathname = `/_api/seodata${pathname}`;
      seoApiEndPoint.search = search;
      seoApiEndPoint.searchParams.set('origin', expectedSiteOrigin);
      const seoData = await cachedFetch(
        {
          id: `srpVdpMetaData-${seoApiEndPoint.toString()}`,
          path: seoApiEndPoint?.toString(),
        },
        get,
      );
      return seoData ?? {};
    },
});
