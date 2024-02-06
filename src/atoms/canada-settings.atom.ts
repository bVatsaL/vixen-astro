import { selector } from 'recoil-ssr';
import { countryNameAtom } from './location.atom';

export const isCanadianSiteSelector = selector({
  key: 'isCanadianSiteSelector',
  get: ({ get }) => {
    const countryName: any = get(countryNameAtom);
    return countryName;
  },
});

export const fordAllInPriceDisclaimer = selector({
  key: 'fordAllInPriceDisclaimer',
  get: ({ get }) => {
    const countryName: any = get(isCanadianSiteSelector);
    return countryName === 'Canada'
      ? 'All-in price includes dealer fees which includes AMVIC ($6.25) and documentation fee ($599).'
      : '';
  },
});
