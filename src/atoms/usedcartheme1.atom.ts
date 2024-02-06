import { selector } from 'recoil-ssr';
import { siteUniqueIdAtom } from './site.atom';
import { uniqueId } from '@utils/constant';

export const showBrowseVehiclebyStyleAtom = selector<boolean>({
  key: 'showBrowseVehiclebyStyle',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showBrowseVehiclebyStyleSites = [uniqueId.MYCARPARK, uniqueId.VIXENUSEDCARDEMO];
    return showBrowseVehiclebyStyleSites.includes(siteUniqueId);
  },
});

export const showBrowseByTabViewAtom = selector<boolean>({
  key: 'showBrowseByTabView',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showBrowseByTabView = [uniqueId.HUDSONAUTO];
    return showBrowseByTabView.includes(siteUniqueId);
  },
});

export const showHowitWorksAtom = selector<boolean>({
  key: 'showHowitWorks',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showHowitWorksSites = [uniqueId.MYCARPARK];
    return showHowitWorksSites.includes(siteUniqueId);
  },
});

export const showServiceSectionAtom = selector<boolean>({
  key: 'showServiceSection',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showServiceSectionSites = [uniqueId.HUDSONAUTO];
    return showServiceSectionSites.includes(siteUniqueId);
  },
});

export const showCommunityBannerAtom = selector<boolean>({
  key: 'showCommunityBanner',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showCommunityBannerSites = [''];
    return showCommunityBannerSites.includes(siteUniqueId);
  },
});

export const showValueYourTradeAtom = selector<boolean>({
  key: 'showValueYourTrade',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.MYCARPARK, uniqueId.VIXENUSEDCARDEMO];
    return dealerSites.includes(siteUniqueId);
  },
});
