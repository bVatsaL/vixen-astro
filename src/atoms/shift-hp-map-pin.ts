import { selector } from 'recoil-ssr';
import { siteIdAtom } from './site.atom';

export const shiftHpMapPinAtom = selector({
    key: 'shiftHpMapPin',
    get: ({ get }) => {
      const siteId = get(siteIdAtom).toString();
      const shiftHpMapPin = ['1026'];
      return shiftHpMapPin.includes(siteId);
    },
  });