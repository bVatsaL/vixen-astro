//category atoms

import { selector } from 'recoil-ssr';
import { siteUniqueIdAtom } from './site.atom';
import { uniqueId } from '@utils/constant';

export const getSocialMediaHeadingAtom = selector<string>({
  key: 'getSocialMediaHeading',
  get: async ({ get }) => {
    const socialMediaHeadingMap: Record<string, string> = {
      [uniqueId.ROCKYMOUNTTOYOTA]: 'Connect with us!',
    };
    const siteUniqueId = get(siteUniqueIdAtom);
    return socialMediaHeadingMap[siteUniqueId] ? socialMediaHeadingMap[siteUniqueId] : '';
  },
});
