import { selector } from 'recoil-ssr';
import { siteUniqueIdAtom } from './site.atom';
import { uniqueId } from '@utils/constant';

export const exploreHondaBannerAtom = selector<string>({
  key: 'exploreHondaBanner',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);

    // Define a lookup object for the mappings
    const imgMappings = {
      [uniqueId.HONDAMORRISTOWN]: 'https://cdn-pods.foxdealer.com/hondamorristown/CRV_23_018_12a01391de.png',
      // Add more mappings as needed
    };
    
    // Set the default image if no match is found
    const defaultImg = 'https://cdn-pods.foxdealer.com/vixenhondademo/208a6872_e121_4b6d_9366_e1deddef74b6_0fbbf8028f.png';

    // Use the lookup object to get the img or fallback to the default
    const bannerImg = imgMappings[siteUniqueId] || defaultImg;

    return bannerImg;
  },
});
