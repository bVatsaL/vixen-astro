import { selector } from 'recoil-ssr';
import { siteUniqueIdAtom } from './site.atom';
import { uniqueId } from '@utils/constant';

export const footerSettingsAtom = selector({
  key: 'footerSettings',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);

    return {
      showFooterHeadingWithLinks: siteUniqueId === uniqueId.JAGUARCERRITOS,
      hideFooterAddress: siteUniqueId === uniqueId.HUDSONAUTO,
    };
  },
});
