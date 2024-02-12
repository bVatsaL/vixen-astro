import { selector } from 'recoil-ssr';
import { siteIdAtom, siteUniqueIdAtom } from './site.atom';
import { forthPhoneTitleAtom } from './location.atom';
import { uniqueId } from '@utils/constant';

export const secondaryPhoneSitesAtom = selector<boolean>({
  key: 'secondaryPhoneSites',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showsecondaryPhoneSites = [
      uniqueId.MYGASTONIANISSAN,
      uniqueId.MLADYNISSAN,
      uniqueId.ROCKHILLNISSAN,
      uniqueId.HILLTOPNISSAN,
      uniqueId.MBSACRAMENTO,
    ];
    return showsecondaryPhoneSites.includes(siteUniqueId);
  },
});

export const contactTitleSitesAtom = selector<boolean>({
  key: 'contactTitleSites',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showcontactTitleSites = [uniqueId.MYGASTONIANISSAN, uniqueId.MLADYNISSAN];
    return showcontactTitleSites.includes(siteUniqueId);
  },
});

export const rentalContactAtom = selector<boolean>({
  key: 'rentalContact',
  get: async ({ get }) => {
    const siteId = get(siteUniqueIdAtom);
    const dealerSites = [
      uniqueId.ROCKHILLNISSAN,
      uniqueId.TOYOTAOFLASVEGAS,
      uniqueId.TOYOTAOFMILPITAS,
      uniqueId.MBWESTCOVINA,
    ];
    return dealerSites.includes(siteId);
  },
});

export const partsContactAtom = selector<boolean>({
  key: 'partsContact',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showpartsContact = [uniqueId.ROCKHILLNISSAN];
    return showpartsContact.includes(siteUniqueId);
  },
});

export const hidePartsContactAtom = selector<boolean>({
  key: 'hidePartsContact',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const hidepartsContact: string[] = [];
    return hidepartsContact.includes(siteUniqueId);
  },
});

export const rentalPhoneTitleAtom = selector<string>({
  key: 'rentalPhoneTitle',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const forthPhoneTitle = get(forthPhoneTitleAtom);
    const useTitleFromLocation = [uniqueId.TOYOTAOFLASVEGAS, uniqueId.MBWESTCOVINA];
    return useTitleFromLocation.includes(siteUniqueId) ? forthPhoneTitle || 'Rental' : 'Rental';
  },
});

export const applySubmenuItemClassOnMainliAtom = selector({
  key: 'applySubmenuItemClassOnMainli',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const sitesWithoutClass = [uniqueId.JOHNSONCITYTOYOTA, uniqueId.HONDAKINGSPORT];
    return !sitesWithoutClass.includes(siteUniqueId);
  },
});

export const hideServiceContactAtom = selector({
  key: 'hideServiceContact',
  get: ({ get }) => {
    const siteId = get(siteIdAtom).toString();
    const hideServiceContact = ['680'];
    return hideServiceContact.includes(siteId);
  },
});

export const showWindowStickerAtom = selector({
  key: 'showWindowSticker',
  get: async ({ get }) => {
    const siteId = get(siteIdAtom).toString();
    const showWindowStickerSitesData: Record<
      string,
      { stickerLink?: string; stickerImg?: string; Disclaimer?: string }
    > = {
      '372': {
        stickerLink: '/inventory/new/',
        stickerImg: 'https://cdn-pods.foxdealer.com/toyotaoflasvegas/free_registration_logo_2c2f775505.png',
        Disclaimer:
          'David Wilson Toyota of Las Vegas is offering a Voucher up to $500.00 towards the DMV registration of all New Vehicle purchases 12/01/2023 - 01/02/2024 in the State of Nevada. Vehicle owners must register their vehicles within the first 30 days of purchase and present proof of registration to dealership for reimbursement.Voucher cannot be used in conjunction with any other discounts or incentives offered by dealership.',
      },
    };
    return showWindowStickerSitesData?.[siteId] ?? '';
  },
});
