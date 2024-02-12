import { selector } from 'recoil-ssr';
import { cachedFetch } from './cache.atom';

export const staffAtom = selector({
  key: 'staff',
  get: async ({ get }) => {
    const data = await cachedFetch({
      id: 'staff',
      path: 'staff',
      rootContext: 'staff',
    }, get);
    return data;
  },
});
