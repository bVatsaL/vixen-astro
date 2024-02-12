import { selector } from 'recoil-ssr';
import { siteUniqueIdAtom } from './site.atom';
import { uniqueId } from '@utils/constant';
interface props {
  [key: string]: string;
}

export const getSiteNameWithPhoneNumberAtom = selector<string>({
  key: 'getSiteNameWithPhoneNumberAtom',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const phoneMappingToSite: props = {
      [uniqueId.MLADYNISSAN]: '(815) 923-3762',
      [uniqueId.MYGASTONIANISSAN]: '(888) 471-1513',
    };
    const siteToIncludesToShowCallInfo = [uniqueId.MYGASTONIANISSAN, uniqueId.MLADYNISSAN];
    return siteToIncludesToShowCallInfo.includes(siteUniqueId)
      ? `${siteUniqueId.replace('&#039', "'")} at ${phoneMappingToSite[siteUniqueId]}`
      : 'us';
  },
});
