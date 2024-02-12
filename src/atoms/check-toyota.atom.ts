import { selector } from 'recoil-ssr';
import { siteIdAtom, siteUniqueIdAtom } from './site.atom';
import { uniqueId } from '@utils/constant';

export const staticRecallLinkAtom = selector({
  key: 'staticRecallLink',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showBflImg = [uniqueId.TOYOTAOFLASVEGAS];
    return showBflImg.includes(siteUniqueId);
  },
});

export const disableTCUVAtom = selector({
  key: 'disableTCUV',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const disableTCUVLogoAtom = [uniqueId.ROCKYMOUNTTOYOTA];
    return disableTCUVLogoAtom.includes(siteUniqueId);
  },
});

export const getBlackFridayPopupAtom = selector({
  key: 'getBlackFridayPopup',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const blackFridayPopupImg: Record<string, { bannerImg?: string }> = {
      [uniqueId.JOHNSONCITYTOYOTA]: {
        bannerImg:
          'https://cdn-pods.foxdealer.com/toyotademo3/HAG_2310_Thankgivings_Black_Friday_Pop_Up_Fox_Dealer_1_V1_ecc19582b7.jpg',
      },
      [uniqueId.SPARTANBURGTOYOTA]: {
        bannerImg:
          'https://cdn-pods.foxdealer.com/toyotademo3/HAG_2310_Thankgivings_Black_Friday_Pop_Up_Fox_Dealer_2_V1_333da65d90.jpg',
      },
    };
    return blackFridayPopupImg?.[siteUniqueId] ?? '';
  },
});

export const moveToyotaBadgesUnderBtnsAtom = selector({
  key: 'moveToyotaBadgesUnderBtns',
  get: ({ get }) => {
    const siteId = get(siteIdAtom).toString();
    const moveToyotaBadgesUnderBtns = ['680'];
    return moveToyotaBadgesUnderBtns.includes(siteId);
  },
});
export const timeSectionWithAllBtnsAtom = selector({
  key: 'timeSectionWithAllBtns',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const timeSectionWithAllBtnsSites = [uniqueId.TOYOTAOFMIDLAND, uniqueId.MBOFEDH];
    return timeSectionWithAllBtnsSites.includes(siteUniqueId);
  },
});
