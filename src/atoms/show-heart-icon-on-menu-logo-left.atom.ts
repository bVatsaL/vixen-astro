import { selector } from 'recoil-ssr';
import { siteUniqueIdAtom } from './site.atom';
import { uniqueId } from '@utils/constant';

export const showHearticonOnMenuLogoLeftAtom = selector({
  key: 'showHeartIconOnMenuLogoLeft',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showHearticonOnMenuLogoLeft = [
      uniqueId.CLAREMONTTOYOTA,
      uniqueId.JOHNSONCITYTOYOTA,
      uniqueId.SPARTANBURGTOYOTA,
    ];
    return showHearticonOnMenuLogoLeft.includes(siteUniqueId);
  },
});

export const showHeartIconInBlackAtom = selector({
  key: 'showHeartIconInBlack',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showHeartIconInBlack = [
      uniqueId.TOYOTAOFMILPITAS,
      uniqueId.NORWALKTOYOTA,
      uniqueId.TOYOTAWESTCOVINA,
      uniqueId.TOYOTAHUNTINGTONBEACH,
    ];
    return showHeartIconInBlack.includes(siteUniqueId);
  },
});
