import { selector } from 'recoil-ssr';
import { hasSiteAtom, siteUniqueIdAtom, themeAtom } from './site.atom';
import { uniqueId } from '@utils/constant';

export const getFaviconAtom = selector({
  key: 'getFavicon',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const themeName = get(themeAtom);
    const isSiteHavingNewHudsonLogo = get(hasSiteAtom(uniqueId.HUDSONAUTO));
    const faviconLinks = {
      [uniqueId.HUDSONAUTO]:
        'https://cdn-pods.foxdealer.com/hudsonautogroup2/cropped_White_1_e1598887399658_32x32_7b28b59b2c.webp',
      [uniqueId.MYCARPARK]: 'https://static.foxdealer.com/731/2022/04/cropped-MyCarPark_512x512-32x32.jpg',
      [uniqueId.SIERRACDJRUSEDCARSUPERSTORE]:
        'https://cdn-pods.foxdealer.com/sierracdjrusedcarsuperstore/favicon_985b856deb.png',
      [uniqueId.VIXENHONDADEMO]: 'https://cdn-pods.foxdealer.com/vixenhondademo/honda_new_logo_d00c21d76f.png',
      [uniqueId.TRISTATEVANS]: 'https://static.foxdealer.com/982/2023/09/cropped-favicon-32x32.png',
      [uniqueId.HONDAMORRISTOWN]: 'https://s3.amazonaws.com/fzautomotive/dealers/5ed168dcd1ec3.ico',
      [uniqueId.HONDAKINGSPORT]: 'https://s3.amazonaws.com/fzautomotive/dealers/5ed168dcd1ec3.ico',
      [uniqueId.SUBURBANTOYOTA]: 'https://cdn-pods.foxdealer.com/westchesterbenz/toyotafa_6421827ef1.webp',
      [uniqueId.TOYOTAWESTCOVINA]: 'https://cdn-pods.foxdealer.com/westchesterbenz/toyotafa_6421827ef1.webp',
      [uniqueId.TOYOTAOFMILPITAS]: 'https://cdn-pods.foxdealer.com/westchesterbenz/toyotafa_6421827ef1.webp',
      [uniqueId.NORWALKTOYOTA]: 'https://cdn-pods.foxdealer.com/toyotademo3/toyotafav_82df9478a8.webp',
      [uniqueId.CDJRWESTCOVINA]:
        'https://cdn-pods.foxdealer.com/cdjrwestcovina/cropped_favicon_2_32x32_4972e4e515.webp',
    };
    if (isSiteHavingNewHudsonLogo && themeName === 'usedcartheme1') {
      return [{ link: 'https://cdn-pods.foxdealer.com/hudsonautogroup2/Hudson_Logo_Favicon_58d2e6d508.png' }];
    }

    return faviconLinks[siteUniqueId] ? [{ link: faviconLinks[siteUniqueId] }] : [];
  },
});
