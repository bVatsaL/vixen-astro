import { selector } from 'recoil-ssr';
import { siteUniqueIdAtom } from './site.atom';
import { uniqueId } from '@utils/constant';

//Use a Set for the showHappyDayLogo array instead of an array. Checking for inclusion in a Set is generally faster than in an array.
const happyDayLogoSites = new Set([uniqueId.HONDAMORRISTOWN, uniqueId.HONDAKINGSPORT]);

export const hondaHappyDaysLogoAtom = selector<boolean>({
  key: 'hondaHappyDaysLogo',
  get: ({ get }) => happyDayLogoSites.has(get(siteUniqueIdAtom)),
});
