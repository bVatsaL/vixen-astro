import { selector } from 'recoil-ssr';
import { siteUniqueIdAtom } from './site.atom';
import { uniqueId } from '@utils/constant';

import * as FooterData from '@themes/usedcartheme1/components/footer/subfooterlink';
import { SierracdjrusedcarsuperstoreData } from '@themes/usedcartheme2/components/footer/subfooterlink';
import { ToyotaDemo } from '@themes/toyotacanadatheme1/components/footer/subfooterlink';
import { TristatevansData } from '@themes/tristatevans/components/footer/subfooterlink';
import { RockyMountToyotaSubFooterLinks } from '@themes/toyotatheme2/components/footer/subfooterlink';
import {
  SpartanburgToyotaSubfooterLinksData,
  toyotaOfLasvegasLinkData,
  norwalkToyotaLinkData,
  toyotaOfMidlandLinkData,
  ToyotaOfMilpitasLinkData,
} from '@themes/newtoyota/components/subfooterlink';
import { CityToyotaDemoData } from '@themes/toyotatheme5/components/footer/subfooterlink';
import { TownToyotaDemoData } from '@themes/toyotatheme4/components/footer/subfooterlink';
import { cdjrWestCovinaLinkData } from '@themes/cdjrtheme1/components/footer/subfooterlink';


export const getSubFooterDataAtom = selector({
  key: 'getSubFooterData',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);

    const subFooterDataMappings = {
      [uniqueId.HUDSONAUTO]: FooterData.HudstonautoSubfooterData,
      [uniqueId.MYCARPARK]: FooterData.MycarparkData,
      [uniqueId.SIERRACDJRUSEDCARSUPERSTORE]: SierracdjrusedcarsuperstoreData,
      [uniqueId.TOYOTADEMO3]: ToyotaDemo,
      [uniqueId.TOYOTACANADADEMO]: ToyotaDemo,
      [uniqueId.TRISTATEVANS]: TristatevansData,
      [uniqueId.ROCKYMOUNTTOYOTA]: RockyMountToyotaSubFooterLinks,
      [uniqueId.SPARTANBURGTOYOTA]: SpartanburgToyotaSubfooterLinksData,
      [uniqueId.TOYOTAOFLASVEGAS]: toyotaOfLasvegasLinkData,
      [uniqueId.NORWALKTOYOTA]: norwalkToyotaLinkData,
      [uniqueId.TOYOTAOFMIDLAND]: toyotaOfMidlandLinkData,
      [uniqueId.TOYOTAOFMILPITAS]: ToyotaOfMilpitasLinkData,
      [uniqueId.CITYTOYOTADEMO]: CityToyotaDemoData,
      [uniqueId.TOWNTOYOTADEMO]: TownToyotaDemoData,
      [uniqueId.CDJRWESTCOVINA]: cdjrWestCovinaLinkData,
    };

    return subFooterDataMappings[siteUniqueId] || [];
  },
});

export const SubFooterCopyrightTextAtom = selector<string>({
  key: 'SubFooterCopyrightText',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);

    const customCopyrightMappings = {
      [uniqueId.SOUTHFORTCHEV]: 'South Fort Chevrolet Ltd.',
      [uniqueId.WHITECOURTFORD]: 'Whitecourt Ford Inc.',
      [uniqueId.BARRHEADFORD]: 'Barrhead Ford Inc.',
    };

    return customCopyrightMappings[siteUniqueId] || siteUniqueId;
  },
});


export const footerRightNavTitleLinkAtom = selector({
  key: 'footerRightNavTitleLink',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);

    const enableLinkOnTitleSites = [uniqueId.TOYOTAOFMILPITAS, uniqueId.TOYOTAOFMIDLAND];

    return enableLinkOnTitleSites.includes(siteUniqueId);
  },
});


export const footerWidgetOverlapAtom = selector({
  key: 'footerWidgetOverlap',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);

    const footerWidgetOverlapSites = [uniqueId.TOYOTAOFMIDLAND];

    return footerWidgetOverlapSites.includes(siteUniqueId);
  },
});
