import { type FC } from 'react';
import cn from 'classnames';
import { HeaderSearchBarMegaMenu } from '@components/header/search_bar-mega_menu';
// import { useRecoilValue } from 'recoil-ssr';
// import { siteLogoAtom, srpAutotypeAtom } from '@atoms/settings.atom';
// import { siteNameAtom } from '@atoms/site.atom';
// import { headerMainNavAtom } from '@atoms/menus.atom';
// import { vehiclesAtom } from '@atoms/vehicles.atom';

// import { googleAddressUrlAtom } from '@atoms/location.atom';
// import { defaultCarModelsAtom, preOwnedTotalAtom } from '@atoms/search.atom';
import { type Vehicle, type VehicleDetail } from '@typedefs/vehicle';
// import HeaderCall from '@components/header/call-direction/call';
// import HeaderDirections from '@components/header/call-direction/direction';
import style from './styles.module.scss';
// import NavBannerV1 from '@components/nav-banner';

const HudsonHeader: FC = () => {
  // const siteLogo = useRecoilValue(siteLogoAtom);
  // const siteName = useRecoilValue(siteNameAtom);
  // const preOwnedTotal = useRecoilValue(preOwnedTotalAtom);
  // const mainNav = useRecoilValue(headerMainNavAtom);
  //const primaryPhone = useRecoilValue(primaryPhoneAtom);
  const primaryPhone = '843-302-8534';
  // const googleAddressUrl = useRecoilValue(googleAddressUrlAtom);
  // const vehicles = useRecoilValue(vehiclesAtom);
  // const models = useRecoilValue(defaultCarModelsAtom);
  // const autoTypes = useRecoilValue(srpAutotypeAtom);
  // const vechiclesWithPriceLabel = vehicles.map((v: Vehicle) => ({
  //   ...v,
  //   details: v?.details?.map((i: VehicleDetail) => ({
  //     ...i,
  //     'inventory-url': i.inventory_count ? i?.['inventory-url'] : 'contact-us',
  //     noStockLabel: 'Reserve Now!',
  //   })),
  // }));
  // const mainNavWithPreOwnedTotal = mainNav.map((m) => ({
  //   ...m,
  //   ...(m.label === 'Pre-Owned Vehicles'
  //     ? {
  //         submenu: m?.submenu?.map((s) => ({
  //           ...s,
  //           label: s?.label?.replace(
  //             'View All Pre-Owned Vehicles',
  //             `View All ${preOwnedTotal ? preOwnedTotal : ''} Pre-Owned Vehicles`,
  //           ),
  //         })),
  //       }
  //     : {}),
  // }));
  return (
    <>
      <HeaderSearchBarMegaMenu
        siteLogo={''}
        className='hudson_Header'
        siteName={''}
        navigationMenu={[]}
        vehicles={[]}
        searchBarPlaceholders={[]}
        searchAutoType={[]}
        navListClassName='justify_Content_Between'
        navLinkLevel1ClassName={cn(style.menu_Font_Size, style.mobile_Nav_Bg)}
        submenuItemClassName='subMenuItem_bg_Hover_White'
      />
      <div className={style.call_Direction_Contain}>
        {/* <HeaderCall className={style.call_Btn} number={primaryPhone} /> */}
        {/* <HeaderDirections className={style.direction_Btn} url={googleAddressUrl} /> */}
      </div>
      {/* <NavBannerV1 /> */}
    </>
  );
};

export default HudsonHeader;
