import { selector } from 'recoil-ssr';
import { siteUniqueIdAtom } from './site.atom';
import { uniqueId } from '@utils/constant';

//use a Set for displayMpgDataVdp instead of an array for faster membership checks. 
const mpgDataVdpSites = new Set([uniqueId.LANDROVERCERRITOS]);

export const displayMpgDataVdpAtom = selector<boolean>({
  key: 'displayMpgDataVdp',
  get: ({ get }) => mpgDataVdpSites.has(get(siteUniqueIdAtom)),
});
