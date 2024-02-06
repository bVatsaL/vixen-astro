import { selector } from 'recoil-ssr';
import { siteUniqueIdAtom } from './site.atom';
import { ctaPrimaryTextAtom } from './settings.atom';
import { uniqueId } from '@utils/constant';

export const showEdmundsValueYourTradeCtaAtom = selector({
  key: 'showEdmundsValueYourTradeCta',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showEdmundsValueYourTradeCtaSites = [uniqueId.HILLTOPNISSAN];
    return showEdmundsValueYourTradeCtaSites.includes(siteUniqueId);
  },
});

export const showWindowStickerQVCtaAtom = selector({
  key: 'showWindowStickerQVCta',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const windowStickerCtaSites = [uniqueId.MLADYNISSAN, uniqueId.MYGASTONIANISSAN];
    return windowStickerCtaSites.includes(siteUniqueId);
  },
});

export const qvFormSubmitButtonTextAtom = selector<string>({
  key: 'qvFormSubmitButtonText',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const qvFormSubmitButtonText: any = {
      [uniqueId.ROCKHILLNISSAN]: {
        comment: 'Get Our Best Price',
      },
      [uniqueId.MYGASTONIANISSAN]: {
        comment: get(ctaPrimaryTextAtom),
      },
      [uniqueId.HILLTOPNISSAN]: {
        comment: 'GET E-PRICE',
      },
      [uniqueId.MLADYNISSAN]: {
        comment: get(ctaPrimaryTextAtom),
      },
      [uniqueId.NISSANDEMOV3]: {
        comment: 'GET E-PRICE',
      },
      [uniqueId.HUDSONAUTO]: {
        comment: 'Next Steps',
      },
    };
    return qvFormSubmitButtonText?.[siteUniqueId]?.comment ?? '';
  },
});
// Added below atom for MB sites only
export const qvFormSubmitButtonTextMBAtom = selector<string>({
  key: 'qvFormSubmitButtonTextMB',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const qvFormSubmitButtonTextMB: any = {
      [uniqueId.MBWESTCOVINA]: {
        comment: 'Get More Info',
      },
    };
    return qvFormSubmitButtonTextMB?.[siteUniqueId]?.comment ?? 'GET E-PRICE';
  },
});
export const qvVDPdetailsBtnTopLocationAtom = selector<boolean>({
  key: 'qvVDPdetailsTopBtnLocation',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerNamesToHideBtn = [uniqueId.MBCINCY, uniqueId.WESTCHESTERBENZ];
    return dealerNamesToHideBtn.includes(siteUniqueId) ? true : false;
  },
});
export const packageHighlightsLowestMsrpAtom = selector<number>({
  key: 'packageHighlightsLowestMsrp',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const packageHighlightsLowestMsrpValues: Record<string, number> = {
      [uniqueId.MLADYNISSAN]: 0,
    };
    return packageHighlightsLowestMsrpValues?.[siteUniqueId] ?? 249;
  },
});
//this atom is created for quickview
//there is already one atom to show this button or not  but that is created for vehile details ans also that is created for only 3 sites so if i use that it will affect other sites so i decided to create separate atom
export const hideSheduleTestDriveCTABtnAtom = selector<boolean>({
  key: 'hideSheduleTestDriveCTABtn',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerNamesToHideBtn = [uniqueId.MYGASTONIANISSAN];
    return dealerNamesToHideBtn.includes(siteUniqueId) ? false : true;
  },
});
