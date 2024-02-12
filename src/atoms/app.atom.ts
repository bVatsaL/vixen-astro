import { atom } from 'recoil-ssr';

export const initialLoadAtom = atom({
  key: 'initialLoad',
  default: true,
});

export const isMobileAtom = atom({
  key: 'isMobile',
  default: false,
});

export const onClickSearchModalAtom = atom({
  key: 'searchModal',
  default: false,
});
