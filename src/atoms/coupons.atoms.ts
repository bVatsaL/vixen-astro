import { selector } from 'recoil-ssr';
import { cachedFetch } from './cache.atom';

export const couponsAtom = selector({
  key: 'coupons',
  get: async ({ get }) => {
    const coupons = await cachedFetch(
      {
        id: 'coupons',
        path: 'coupons',
      },
      get,
    );
    return coupons?.coupons ?? [];
  },
});

export const couponsServiceDataAtom = selector({
  key: 'couponsservicedata',
  get: ({ get }) => get(couponsAtom)?.find?.((i: any) => i?.title === 'Service'),
});

export const partsDataAtom = selector({
  key: 'coupon-parts-data',
  get: ({ get }) => get(couponsAtom)?.find?.((i: any) => i.title === 'Parts'),
});
export const serviceAndPartsDataAtom = selector({
  key: 'coupon-service-parts-data',
  get: ({ get }) => get(couponsAtom)?.find?.((i: any) => i.title === 'Service And Parts'),
});
