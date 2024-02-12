import { selector } from 'recoil-ssr';
import { siteUniqueIdAtom } from './site.atom';
import { uniqueId } from '@utils/constant';

export const getHeroImgAtom = selector({
  key: 'getHeroImg',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const getHeroImgLink: { img: string } = { img: '' };
    const siteMapToNumber: Record<string, string> = {
      [uniqueId.CLAREMONTTOYOTA]: '5',
      [uniqueId.TOYOTAHUNTINGTONBEACH]: '1',
      [uniqueId.JOHNSONCITYTOYOTA]: '1',
      [uniqueId.SPARTANBURGTOYOTA]: '1',
      [uniqueId.TOYOTAOFLASVEGA]: '2',
    };
    const numberMapToImage: Record<string, string> = {
      1: 'https://static.foxdealer.com/global/2023/09/2024_Toyota_Land_Cruiser_1958_002-scaled.jpg',
      2: 'https://static.foxdealer.com/372/2023/10/MicrosoftTeams-image-6.jpg',
      3: 'https://static.foxdealer.com/596/2023/12/toyotathon.png',
      4: 'https://static.foxdealer.com/596/2023/12/fox.atlassian-4.png',
      5: 'https://cdn-pods.foxdealer.com/claremonttoyota/Claremont_Hero_16_1_2024_58498a933e.jpg',
    };

    if (siteMapToNumber[siteUniqueId]) getHeroImgLink.img = numberMapToImage[siteMapToNumber[siteUniqueId]];

    return getHeroImgLink;
  },
});
