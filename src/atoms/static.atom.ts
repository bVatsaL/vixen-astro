import { selector } from 'recoil-ssr';
import { siteUniqueIdAtom } from './site.atom';
import { uniqueId } from '@utils/constant';

export const showScheduleServieCtaOnEVPageAtom = selector({
  key: 'showScheduleServieCtaOnEVPage',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showScheduleServieCtaOnEVPSites = [uniqueId.HILLTOPNISSAN, uniqueId.MLADYNISSAN];
    return showScheduleServieCtaOnEVPSites.includes(siteUniqueId);
  },
});

export const getCouponCTARedirectionLinkAtom = selector<(couponCTAText: string, defaultLink: string) => string>({
  key: 'getCouponCTARedirectionLink',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    return (couponCTAText: string, defaultLink: string) => {
      if (siteUniqueId === uniqueId.HONDAKINGSPORT && couponCTAText === 'Learn More') {
        return '/Auto-Service-Financing-in-Kingsport-TN';
      } else {
        return defaultLink;
      }
    };
  },
});
