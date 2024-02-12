import { selector } from 'recoil-ssr';
import { siteUniqueIdAtom, themeAtom } from './site.atom';
import { uniqueId } from '@utils/constant';

export const showOnlyMsrpPriceStackAtom = selector({
  key: 'showOnlyMsrpPriceStack',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showOnlyMsrpPriceStackSites = [uniqueId.CARTERCADILLAC];
    return showOnlyMsrpPriceStackSites.includes(siteUniqueId);
  },
});

export const overWritePriceTitleAtom = selector({
  key: 'overWritePriceTitle',
  get: ({ get }) => {
    const themeName = get(themeAtom);
    const overWritetheme = ['jaguar', 'landrover'];
    return overWritetheme?.includes?.(themeName) ?? false;
  },
});

export const showPriceLineThroughAtom = selector({
  key: 'showPriceLineThrough',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showPriceLineThroughSites = [uniqueId.ROCKHILLNISSAN];
    return showPriceLineThroughSites?.includes?.(siteUniqueId) ?? false;
  },
});

export const showDiscountAboveIncentivesAtom = selector({
  key: 'showDiscountAboveIncentives',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showDiscountAboveIncentivesSites = [uniqueId.ROCKHILLNISSAN];
    return showDiscountAboveIncentivesSites?.includes?.(siteUniqueId) ?? false;
  },
});

export const hideConditionalFinalPriceVehiclesAtom = selector({
  key: 'hideConditionalFinalPriceVehicles',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const hideConditionalFinalPriceVehicles = [uniqueId.CHEVROLETOFMONTEBELLO];
    if (hideConditionalFinalPriceVehicles.includes(siteUniqueId)) {
      return ['Bolt EUV', 'Bolt EV'];
    }
    return;
  },
});
