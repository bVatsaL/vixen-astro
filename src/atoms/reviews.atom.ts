import { selector } from 'recoil-ssr';
import { cachedFetch } from './cache.atom';
import { expectedSiteOriginAtom, siteUrlAtom } from './site.atom';

export const reviewsAtom = selector({
  key: 'reviews',
  get: async ({ get }) => {
    const siteUrl = get(siteUrlAtom);
    const siteOrigin = get(expectedSiteOriginAtom);
    const dealerReviewUrl = new URL('/_api/dealer-reviews/', siteUrl);
    dealerReviewUrl.searchParams.append('origin', siteOrigin);
    const reviewData = await cachedFetch({
      id: 'reviews',
      path: dealerReviewUrl.toString(),
    }, get);
    return reviewData ?? {};
  },
});
