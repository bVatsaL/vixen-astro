import { selector } from 'recoil-ssr';
import { cachedFetch } from './cache.atom';
import { siteUniqueIdAtom, siteUrlAtom } from './site.atom';
import { uniqueId } from '@utils/constant';

export const siteMapAtom = selector({
  key: 'sitemap',
  get: async ({ get }) => {
    const siteUrl = get(siteUrlAtom);
    const siteMapUrl = new URL('/_api/sitemap', siteUrl);
    const siteMapData = await cachedFetch(
      {
        id: 'sitemap',
        path: siteMapUrl.toString(),
      },
      get,
    );
    return siteMapData ?? [];
  },
});

export const siteMapBlogAtom = selector({
  key: 'siteMapBlogs',
  get: async ({ get }) => {
    const siteUrl = get(siteUrlAtom);
    const siteMapUrl = new URL('/_api/blogs', siteUrl);
    const siteMapBlogData = await cachedFetch(
      {
        id: 'sitemapBlogList',
        path: siteMapUrl.toString(),
      },
      get,
    );
    return siteMapBlogData ?? [];
  },
});

export const usedToPreOwnedAtom = selector<boolean>({
  key: 'usedToPreOwned',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const usedToPreOwned = [
      uniqueId.MBESCONDIDO,
      uniqueId.MBCINCY,
      uniqueId.WESTCHESTERBENZ,
      uniqueId.TRISTATEVANS,
      uniqueId.MBSACRAMENTO,
      uniqueId.MBOFEDH,
      uniqueId.MBOFROCKLIN,
      uniqueId.MBWESTCOVINA,
    ];
    return usedToPreOwned.includes(siteUniqueId);
  },
});
