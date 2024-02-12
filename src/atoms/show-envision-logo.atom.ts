import { selector } from 'recoil-ssr';
import { siteUniqueIdAtom } from './site.atom';
import { uniqueId } from '@utils/constant';

const envisionLogoSites = new Set([
  uniqueId.CDJRWESTCOVINA,
  uniqueId.TOYOTAOFMILPITAS,
  uniqueId.TOYOTAWESTCOVINA,
  uniqueId.MBESCONDIDO,
  uniqueId.MBWESTCOVINA,
  uniqueId.MBOFEDH,
  uniqueId.MBOFROCKLIN,
  uniqueId.MBSACRAMENTO,
]);

export const showEnvisionLogoAtom = selector({
  key: 'showEnvisionLogo',
  get: ({ get }) => envisionLogoSites.has(get(siteUniqueIdAtom)),
});
