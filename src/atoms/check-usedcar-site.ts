import { selector } from 'recoil-ssr';
import { sellyourVehicleButtonAtom } from './home.atom';
import { siteUniqueIdAtom } from './site.atom';
import { uniqueId } from '@utils/constant';

export const showBannerVideoAtom = selector({
  key: 'showBannerVideo',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    return siteUniqueId === uniqueId.MYCARPARK;
  },
});

export const showHeroBannerCtasAtom = selector({
  key: 'showHeroBannerCtas',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const BannerCtaInfo = [];

    switch (siteUniqueId) {
      case uniqueId.HUDSONAUTO:
        BannerCtaInfo.push(
          { ctaBtnText: 'Shop All Inventory', ctaBtnLink: '/inventory', ctaBtnClassName: 'btn_Browse' },
          { ctaBtnText: 'View All Locations', ctaBtnLink: '/locations', ctaBtnClassName: 'btn_Locations' },
          { ctaBtnText: 'View Job Openings', ctaBtnLink: '/job-openings', ctaBtnClassName: 'btn_Viewall' },
        );
        break;

      default: {
        const sellyourVehicleButtonLink = get(sellyourVehicleButtonAtom);
        const sellyourVehicleLink = sellyourVehicleButtonLink[0]?.link || '';
        BannerCtaInfo.push(
          { ctaBtnText: 'View All Inventory', ctaBtnLink: '/inventory', ctaBtnClassName: 'btn_Browse' },
          { ctaBtnText: 'Sell us your car', ctaBtnLink: sellyourVehicleLink, ctaBtnClassName: 'btn_Sell_Car' },
          { ctaBtnText: 'Get pre-qualified', ctaBtnLink: '/finance-application', ctaBtnClassName: 'btn_Viewall' },
        );
        break;
      }
    }
    return BannerCtaInfo;
  },
});
