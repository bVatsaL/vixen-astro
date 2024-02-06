import { selector } from 'recoil-ssr';
import { siteUniqueIdAtom } from './site.atom';
import { uniqueId } from '@utils/constant';

export const showSubHeroNavFiveAtom = selector<boolean>({
  key: 'showSubHeroNavFive',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showSubHeroNavFive = [uniqueId.TOYOTAOFMIDLAND];
    return showSubHeroNavFive.includes(siteUniqueId);
  },
});
