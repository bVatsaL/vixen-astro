import { selector, selectorFamily } from 'recoil-ssr';
import { siteUniqueIdAtom } from './site.atom';
import { uniqueId } from '@utils/constant';

export const showVdpFinanceleasePriceAtom = selector<boolean>({
  key: 'showVdpFinanceleasePrice',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showVdpFinanceleasePrice = [
      uniqueId.NISSANDEMOV3,
      uniqueId.MYGASTONIANISSAN,
      uniqueId.MLADYNISSAN,
      uniqueId.HILLTOPNISSAN,
    ];
    return showVdpFinanceleasePrice.includes(siteUniqueId);
  },
});

export const staticPriceDisclaimerAtom = selector<{ used: string; new: string } | undefined>({
  key: 'showStaticPriceDisclaimer',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const staticPriceDisclaimers: Record<string, { used: string; new: string }> = {
      [uniqueId.TOYOTAOFLASVEGAS]: {
        new: '+Dealer Adds',
        used: '+RECONDITIONING',
      },
    };
    return staticPriceDisclaimers?.[siteUniqueId];
  },
});

export const hideCashTitleAtom = selector({
  key: 'hideCashTitle',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const hideCashTitleSites = [
      uniqueId.ROCKYMOUNTTOYOTA,
      uniqueId.NORWALKTOYOTA,
      uniqueId.TOYOTAWESTCOVINA,
      uniqueId.BEAMANTOYOTA,
    ];
    return hideCashTitleSites.includes(siteUniqueId) ?? false;
  },
});

export const overWritedFinalPriceAtom = selectorFamily({
  key: 'overWritedFinalPrice',
  get:
    ({ hasLiftKit, finalPrice }: { hasLiftKit?: boolean; finalPrice?: string | number }) =>
    async ({ get }) => {
      const siteUniqueId = get(siteUniqueIdAtom);
      let finalPriceValue: string | number = Number(finalPrice);
      if (siteUniqueId === uniqueId.BEAMANTOYOTA && hasLiftKit) {
        finalPriceValue = 'Call For Price';
      }
      return finalPriceValue ?? '';
    },
});

export const showVdpSubTitleAtom = selector<boolean>({
  key: 'showSubTitle',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.TOYOTAOFMIDLAND, uniqueId.HONDAMORRISTOWN, uniqueId.MBOFEDH];
    return dealerSites.includes(siteUniqueId);
  },
});
export const showToolTipOnRetailPriceAtom = selector<boolean>({
  key: 'showToolTipOnRetailPrice',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.TOYOTAOFMIDLAND];
    return dealerSites.includes(siteUniqueId);
  },
});
export const showTotalSavingBelowFinalPriceAtom = selector<boolean>({
  key: 'showTotalSavingBelowFinalPrice',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.NORWALKTOYOTA];
    return dealerSites.includes(siteUniqueId);
  },
});
export const showTripleStackAtom = selector<boolean>({
  key: 'showTripleStack',
  get: async ({ get }) => {
    const siteId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.CDJRWESTCOVINA];
    return dealerSites.includes(siteId);
  },
});
export const defaultInterestRateAtom = selector<number>({
  key: 'defaultInterestRate',
  get: async ({ get }) => {
    let defaultInterestRate;
    const siteId = get(siteUniqueIdAtom);
    switch (siteId) {
      case uniqueId.JOSEPHTOYOTA:
        defaultInterestRate = 3.3;
        break;
      default:
        defaultInterestRate = 7.99;
    }
    return defaultInterestRate;
  },
});
