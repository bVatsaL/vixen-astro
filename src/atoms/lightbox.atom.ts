import { atom } from 'recoil-ssr';

export const lightBoxAtom = atom<boolean>({
  key: 'lightBox',
  default: false,
});
