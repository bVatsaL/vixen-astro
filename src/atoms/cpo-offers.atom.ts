import { selector, selectorFamily } from 'recoil-ssr';
import { cachedFetch } from './cache.atom';
import { siteUniqueIdAtom } from './site.atom';
import { uniqueId } from '@utils/constant';

export const cpoOffersAtom = selectorFamily({
  key: 'cpoOffers',
  get: (offerOem: string) => async ({ get }) => {
    const cpoOffers = await cachedFetch(
      {
        id: `cpoOffers-${offerOem}`,
        path: `oem_offers?offer_oem=${offerOem}&offer_type=cpo`,
      },
      get,
    );
    return cpoOffers?.oem_offers ?? [];
  },
});

export const showCertifiedPreownedCtaAtom = selector({
  key: 'showCertifiedPreownedCta',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showCertifiedPreownedCtaSites = [uniqueId.COLEEUROPEAN];
    return showCertifiedPreownedCtaSites.includes(siteUniqueId);
  },
});
