import { selector } from 'recoil-ssr';
import { siteUniqueIdAtom } from './site.atom';
import { uniqueId } from '@utils/constant';

//use a Set for displayContainerBanner instead of an array for faster membership checks. 
const containerBannerSites = new Set([uniqueId.MLADYNISSAN]);

export const displayContainerBannerAtom = selector<boolean>({
  key: 'displayContainerBanner',
  get: ({ get }) => containerBannerSites.has(get(siteUniqueIdAtom)),
});
