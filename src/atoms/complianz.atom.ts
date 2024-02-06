import { selector } from 'recoil-ssr';
import { cachedFetch } from './cache.atom';

export const complianzAtom = selector({
  key: 'complianz',
  get: async ({ get }) => {
    const complianz = await cachedFetch({
      id: 'complianz',
      path: 'cookie_complianz_configration',
      rootContext: 'cookie_complianz_configration',
    }, get);
    return complianz;
  },
});
