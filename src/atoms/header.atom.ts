import { selector } from 'recoil-ssr';
import { siteIdAtom, siteUniqueIdAtom } from './site.atom';
import { uniqueId } from '@utils/constant';

//This Atom Is Created for Nissantheme header component
export const hideSenitizedSearchBarAtom = selector<boolean>({
  key: 'hideSenitizedSearchBar',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showpartsContact = [uniqueId.ROCKHILLNISSAN];
    return showpartsContact.includes(siteUniqueId);
  },
});

export const showSearchWithModalIconAtom = selector<boolean>({
  key: 'showSearchWithModalIcon',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.JOHNSONCITYTOYOTA];
    return dealerSites.includes(siteUniqueId);
  },
});

export const showMobileMenuLabelAtom = selector({
  key: 'showMobileMenuLabel',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    let label = 'Inventory';
    switch (siteUniqueId) {
      case uniqueId.TOYOTADEMO3:
      case uniqueId.JOHNSONCITYTOYOTA:
      case uniqueId.NORWALKTOYOTA:
      case uniqueId.TOYOTAOFMILPITAS:
        label = 'View All New Inventory';
        break;
      case uniqueId.BEAMANTOYOTA:
        label = 'View All New Vehicles';
        break;
      case uniqueId.CLAREMONTTOYOTA:
      case uniqueId.TOYOTAHUNTINGTONBEACH:
      case uniqueId.SPARTANBURGTOYOTA:
      case uniqueId.TOYOTAOFLASVEGAS:
        label = 'New Vehicles';
        break;
    }
    return label;
  },
});
export const showServiceContactAtom = selector({
  key: 'showServiceContact',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showServiceContact = [uniqueId.BEAMANTOYOTA, uniqueId.WHITECOURTFORD];
    return showServiceContact.includes(siteUniqueId);
  },
});
export const showPartContactAtom = selector({
  key: 'showPartContact',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showPartContact = [uniqueId.BEAMANTOYOTA];
    return showPartContact.includes(siteUniqueId);
  },
});

export const getCenterSectionAtom = selector({
  key: 'getCenterSection',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const centerSectionData: Record<
      string,
      { tagLineText?: string; bflImage?: string; bflImageLink?: string; aboutImg?: string; headerDesc?: string }
    > = {
      [uniqueId.HILLTOPNISSAN]: {
        tagLineText: '<strong>HILLTOP NISSAN PROUDLY <br />SUPPORTS OUR VETERANS!</strong>',
        bflImageLink: 'https://www.backpacksforlife.org/',
        bflImage: 'https://cdn-pods.foxdealer.com/hilltopnissan/BFL_HP_5732594f12.png',
        aboutImg: 'https://cdn-pods.foxdealer.com/hilltopnissan/IMG_5775_cfb65f3c94.JPG',
        headerDesc: 'In October 2023, our Hilltop Nissan team donated a vehicle to a veteran in need!',
      },
    };
    return centerSectionData?.[siteUniqueId] ?? '';
  },
});

export const showSocialLinksHeaderAtom = selector({
  key: 'showSocialLinksHeader',
  get: ({ get }) => {
    const siteId = get(siteIdAtom).toString();
    const showSocialLinksHeaderSites = ['546'];
    return showSocialLinksHeaderSites.includes(siteId);
  },
});

export const showUsedJellybeansAtom = selector({
  key: 'showUsedJellybeans',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showUsedJellybeansSites = [uniqueId.TOYOTAOFLASVEGAS];
    return showUsedJellybeansSites.includes(siteUniqueId);
  },
});

export const relocateTranslateAfterLogoAtom = selector({
  key: 'relocateTranslateAfterLogo',
  get: ({ get }) => {
    const siteId = get(siteIdAtom).toString();
    const relocateTranslateAfterLogo = ['680'];
    return relocateTranslateAfterLogo.includes(siteId);
  },
});

export const useTranslateImgAtom = selector({
  key: 'useTranslateImg',
  get: ({ get }) => {
    const siteId = get(siteIdAtom).toString();
    const useTranslateImg = ['680'];
    return useTranslateImg.includes(siteId);
  },
});

export const translateImgSrcAtom = selector({
  key: 'translateImgSrc',
  get: ({ get }) => {
    const siteId = get(siteIdAtom).toString();
    const imgPaths: Record<string, string> = {
      '680': 'https://static.foxdealer.com/38/2017/08/ClickHere_Spanish.png',
    };
    return imgPaths?.[siteId]?.toString() ?? '';
  },
});

export const callUsButtonTextAtom = selector({
  key: 'callUsButtonText',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    let buttonText = 'Call Us';
    if (siteUniqueId === uniqueId.MLADYNISSAN) {
      buttonText = 'Call Sales';
    }
    return buttonText;
  },
});

export const showCallServiceMobileCTAAtom = selector<boolean>({
  key: 'showCallServiceMobileCTA',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showCallServiceMobileCTA = [uniqueId.MLADYNISSAN];
    return showCallServiceMobileCTA.includes(siteUniqueId);
  },
});

export const displayMapInNewTabAtom = selector<boolean>({
  key: 'displayMapInNewTab',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const displayMapInNewTab = [uniqueId.JAGUARCERRITOS];
    return displayMapInNewTab.includes(siteUniqueId);
  },
});

export const showAGMLogoHeaderAtom = selector<{
  showAGMLogo: boolean;
  amgUrl: string;
}>({
  key: 'showAGMLogoHeader',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const agmLogoHeaderData: Record<string, { showAGMLogo: boolean; amgUrl: string }> = {
      [uniqueId.MBOFROCKLIN]: {
        showAGMLogo: true,
        amgUrl: '',
      },
      [uniqueId.MBESCONDIDO]: {
        showAGMLogo: true,
        amgUrl: '/what-is-mercedes-benz-amgF',
      },
      [uniqueId.MBWESTCOVINA]: {
        showAGMLogo: true,
        amgUrl: '/what-is-mercedes-benz-amgF',
      },
      [uniqueId.MBSACRAMENTO]: {
        showAGMLogo: true,
        amgUrl: '/',
      },
    };
    return agmLogoHeaderData?.[siteUniqueId] ?? { showAGMLogo: false, amgUrl: '' };
  },
});

export const getJellyBinCategorySequenceAtom = selector<Record<string, string[]>>({
  key: 'getJellyBinCategorySequence',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const sequenceObject: Record<'categorySequence' | 'vehilceSequence', string[]> = {
      categorySequence: ['Range Rover Family', 'Discovery Family', 'Defender Family'],
      vehilceSequence: [
        'Range Rover',
        'Range Rover Evoque',
        'Range Rover Velar',
        'Range Rover Sport',
        'Discovery',
        'Discovery Sport',
      ],
    };
    if (siteUniqueId === uniqueId.LANDROVERCERRITOS) {
      sequenceObject.categorySequence[1] = 'Defender Family';
      sequenceObject.categorySequence[2] = 'Discovery Family';

      const discoveryIndex = sequenceObject.vehilceSequence.indexOf('Discovery');
      const discoverySportIndex = sequenceObject.vehilceSequence.indexOf('Discovery Sport');
      if (discoveryIndex > -1 && discoverySportIndex > -1) {
        sequenceObject.vehilceSequence[discoveryIndex] = 'Discovery Sport';
        sequenceObject.vehilceSequence[discoverySportIndex] = 'Discovery';
      }
    }
    return sequenceObject;
  },
});

export const showHeaderSecondaryLogoAtom = selector<{
  isSecondaryLogo: boolean;
  secondaryLogoUrl: string;
}>({
  key: 'showHeaderSecondaryLogo',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const hondaWarrantyLogo: Record<string, { isSecondaryLogo: boolean; secondaryLogoUrl: string }> = {
      [uniqueId.HONDAKINGSPORT]: {
        isSecondaryLogo: true,
        secondaryLogoUrl: 'https://cdn-pods.foxdealer.com/hondamorristown/LTW_Logo_1_b38c6e0e5e.png',
      },
    };
    return hondaWarrantyLogo?.[siteUniqueId] ?? { isSecondaryLogo: false, secondaryLogoUrl: '' };
  },
});
