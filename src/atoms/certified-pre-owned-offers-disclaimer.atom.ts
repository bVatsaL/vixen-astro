import { selector } from 'recoil-ssr';
import { siteUniqueIdAtom } from './site.atom';
import { uniqueId } from '@utils/constant';
export const isCertifiedPreOwnedOfferDisclaimerAtom = selector({
  key: 'isCertifiedPreOwnedOfferDisclaimer',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerIds = [uniqueId.JAGUARCERRITOS];
    return dealerIds.includes(siteUniqueId);
  },
});
