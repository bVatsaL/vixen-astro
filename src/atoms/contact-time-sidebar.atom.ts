import { selector } from 'recoil-ssr';
import { siteUniqueIdAtom } from './site.atom';
import { uniqueId } from '@utils/constant';
import { siteIdAtom } from './site.atom';

export const showPartsDataAtom = selector({
  key: 'showPartsData',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const siteNames = [uniqueId.SUBURBANTOYOTA, uniqueId.TOYOTAOFMILPITAS];
    return siteNames.includes(siteUniqueId);
  },
});

export const customServiceTextAtom = selector<string>({
  key: 'customServiceText',
  get: async ({ get }) => {
    const siteId = get(siteIdAtom);
    const customServiceContactSite = ['470'].toString();
    const defaultLabel = 'Service';
    return customServiceContactSite.includes(siteId) ? 'Toll Free' : defaultLabel;
  },
});
