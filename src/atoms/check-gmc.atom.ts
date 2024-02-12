import { selector } from "recoil-ssr";
import { siteIdAtom } from "./site.atom";

export const showInTransitQVAtom = selector({
  key: 'showInTransitQV',
  get: ({ get }) => {
    const siteId = get(siteIdAtom).toString();
    const showInTransitQV = ['983'];
    return showInTransitQV.includes(siteId);
  },
});

export const showInTransitVDPAtom = selector({
  key: 'showInTransitVDP',
  get: ({ get }) => {
    const siteId = get(siteIdAtom).toString();
    const showInTransitVDP = ['983'];
    return showInTransitVDP.includes(siteId);
  },
});

export const nonCourtesyCommentFiveAtom = selector({
  key: 'nonCourtesyCommentFive',
  get: ({ get }) => {
    const siteId = get(siteIdAtom).toString();
    const showInTransitQV = ['983'];
    return showInTransitQV.includes(siteId);
  },
});