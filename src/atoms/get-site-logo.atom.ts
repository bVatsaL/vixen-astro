import { selector } from 'recoil-ssr';
import { siteUniqueIdAtom } from './site.atom';
import { siteLogoAtom, secondaryLogoAtom } from './settings.atom';
import { uniqueId } from '@utils/constant';

export const getSiteLogoAtom = selector<string>({
  key: 'getSiteLogo',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const siteLogo = get(siteLogoAtom);
    const secondaryLogo = get(secondaryLogoAtom);
    const filterSitesForLogo = [uniqueId.HILLTOPNISSAN];
    return filterSitesForLogo.includes(siteUniqueId) ? secondaryLogo : siteLogo;
  },
});

export const headerAwardLogoAtom = selector({
  key: 'headerAwardLogo',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const awardLogoDetails: Record<string, { link: string; imgSrc: string }> = {
      [uniqueId.ROCKYMOUNTTOYOTA]: {
        link: '/inventory/used',
        imgSrc: 'https://static.foxdealer.com/878/2023/02/carfax-RMT-1.png',
      },
    };
    return awardLogoDetails?.[siteUniqueId] || '';
  },
});
export const getSiteLogoNameAtom = selector({
  key: 'getSiteLogoNameAtom',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const filterSitesForLogo = [uniqueId.TOYOTAOFLASVEGAS];
    return filterSitesForLogo.includes(siteUniqueId)
  },
});
