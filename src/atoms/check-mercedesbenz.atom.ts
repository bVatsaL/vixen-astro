import { selector } from 'recoil-ssr';
import { siteConfigAtom, siteUniqueIdAtom } from './site.atom';
import { uniqueId } from '@utils/constant';
import { siteIdAtom } from './site.atom';
import expressBannerImage from '@resources/images/roadster-srp-scaled.webp';
import { primaryPhoneAtom, secondaryPhoneAtom } from './location.atom';

export const expressVideoHpAtom = selector<{ url: string }>({
  key: 'expressVideoHp',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const expressVideoHp: Record<string, { url: string }> = {
      [uniqueId.MBOFEDH]: {
        url: 'https://static.foxdealer.com/924/2023/11/MB-EDH-Tour.mp4',
      },
      [uniqueId.MBWESTCOVINA]: {
        url: 'https://static.foxdealer.com/880/2023/11/MBWC_Promo_min.mp4',
      },
      [uniqueId.MBSACRAMENTO]: {
        url: 'https://static.foxdealer.com/928/2023/10/MBS-Tour.mp4',
      },
    };

    return expressVideoHp?.[siteUniqueId] ?? { url: '' };
  },
});

export const expressBannerSrpAtom = selector<{ url: string; image: string; mobileImage: string }>({
  key: 'expressBannerSrp',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const expressBannerSrp: Record<string, { url: string; image: string; mobileImage: string }> = {
      [uniqueId.MBWESTCOVINA]: {
        url: 'https://express.mbwestcovina.com/inventory',
        image: expressBannerImage,
        mobileImage: 'https://static.foxdealer.com/880/2022/09/roadster-srp-mobile.png',
      },
      [uniqueId.MBESCONDIDO]: {
        url: 'https://express.mbescondido.com/inventory',
        image: expressBannerImage,
        mobileImage: '',
      },
      [uniqueId.MBOFROCKLIN]: {
        url: 'https://express.mbofrocklin.com/inventory',
        image: 'https://cdn-pods.foxdealer.com/mbofrocklin/p_1_d6ed756fb5.webp',
        mobileImage: '',
      },
    };

    return expressBannerSrp?.[siteUniqueId] ?? { url: '', image: '' };
  },
});
export const showPhoneNumberOnOfferPageAtom = selector<boolean>({
  key: 'showPhoneNumberOnOffer',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showPhoneNumberOnOfferPageSites = [uniqueId.MBOFEDH];
    return showPhoneNumberOnOfferPageSites.includes(siteUniqueId);
  },
});

export const leaseOffersPhoneAtom = selector<string>({
  key: 'leaseOffersPhone',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const primaryPhone = get(primaryPhoneAtom);
    const secondaryPhone = get(secondaryPhoneAtom);
    const leaseOffersPhone: Record<string, string> = {
      [uniqueId.MBSACRAMENTO]: '8443144913',
      [uniqueId.MBOFEDH]: primaryPhone,
      [uniqueId.MBOFROCKLIN]: secondaryPhone,
    };
    return leaseOffersPhone?.[siteUniqueId] ?? primaryPhone;
  },
});

export const displayTranslateBtnMobileAtom = selector<boolean>({
  key: 'displayTranslateBtnMobile',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const displayTranslateBtnMobile = [uniqueId.MBWESTCOVINA, uniqueId.MBSACRAMENTO];
    return displayTranslateBtnMobile.includes(siteUniqueId);
  },
});
export const displaySearchBtnMobileAtom = selector<boolean>({
  key: 'displaySearchBtnMobile',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const displaySearchBtnMobile = [uniqueId.MBWESTCOVINA, uniqueId.MBSACRAMENTO];
    return displaySearchBtnMobile.includes(siteUniqueId);
  },
});
export const hideSearchBarMobileMenuAtom = selector<boolean>({
  key: 'hideSearchBarMobileMenu',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const hideSearchBarMobileMenu = [uniqueId.MBWESTCOVINA, uniqueId.MBSACRAMENTO];
    return hideSearchBarMobileMenu.includes(siteUniqueId);
  },
});

export const usePercentValuesForOffersAtom = selector({
  key: 'usePercentValuesForOffers',
  get: ({ get }) => {
    const siteId = get(siteIdAtom).toString();
    const hideSearchBarMobileMenu = ['982'];
    return hideSearchBarMobileMenu.includes(siteId);
  },
});

export const replaceUsedWithPreOwnedAtom = selector({
  key: 'replaceUsedWithPreOwned',
  get: ({ get }) => {
    const siteConfig = get(siteConfigAtom);
    return siteConfig.theme === 'mercedesbenz';
  },
})