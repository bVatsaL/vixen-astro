import cn from 'classnames';
import { Link } from '@components/link';
import { type FC, memo, type MouseEventHandler, type SyntheticEvent, useEffect, useRef, useState } from 'react';
import { type MenuItem } from '@typedefs/menu';
import { type Vehicle } from '@typedefs/vehicle';
import { useLocation, useNavigate, useParams } from '@reactpwa/core';
// import { useModals } from '@hooks/useModal';
import { getExtraClasses } from '@utils/common.util';
import { SearchBar } from '@components/search-bar';
import { withLang } from '@utils/language.util';
import { useRecoilValue } from 'recoil-ssr';
import { partsDataAtom, salesDataAtom, servicesDataAtom, smartPathActiveAtom } from '@atoms/settings.atom';
// import { ContactTimeList } from '@components/contact-timing-sidebar/contact-timings';
// import { Form1002ContactUsForm } from '@components/form-1002';
import { MenuVehicle } from './vehicle';
import { MenuVehicleWithTab } from './vehicle/mega-menu-with-tab';
// import { MenuCouponSlider } from '../menu-coupon-slider';
import { MenuVehicleModal } from './vehicle/vehicle-modal';
// import { FuelEcoWidgetModal } from '@components/fuel-eco-widget-modal';
import styles from './styles.module.scss';
import { type CouponItem } from '@typedefs/coupon';
import { Button } from '@components/button';
import { useCookies } from '@reactpwa/core';
import { type VehicleDetail } from '@typedefs/vehicle';
import { trackAscEvent } from '@utils/analytics.util';
import {
  showHeartIconInBlackAtom,
  showHearticonOnMenuLogoLeftAtom,
} from '@atoms/show-heart-icon-on-menu-logo-left.atom';
import { hideSearchBarMobileMenuAtom } from '@atoms/check-mercedesbenz.atom';
interface IMenu {
  items?: MenuItem[];
  vehicles?: Vehicle[];
  usedJellyBeans?: Vehicle[];
  btnClassName?: string;
  megaMenuClassName?: string;
  navBarClassName?: string;
  navLinkClassName?: string;
  navListClassName?: string;
  subMenuClassName?: string;
  vehicleTitleTheme?: string;
  externalsitelink?: string;
  custommodalImage?: boolean;
  specialnavcategory?: string;
  cardClassName?: string;
  highlightLabels?: string[];
  highlightStyle?: Record<string, string>;
  navLinkLevel1ClassName?: string;
  settoggleClassName?: string;
  showStock?: boolean;
  showWithTitle?: boolean;
  searchBarPlaceholders?: { display_name: string; item: string }[];
  searchAutoType?: string[];
  mobileSearchClassName?: string;
  cardModalClasses?: string;
  megaMenuDDClassName?: string;
  vehicletitleClassName?: string;
  submenuItemClassName?: string;
  showMobileModelLabel?: string;
  nestedSubmenuClassName?: string;
  innerSubMenuClass?: string;
  showExploreMenu?: boolean;
  noPriceLabel?: string;
  showMegaMenuWithCol?: boolean;
  specialStock?: string;
  mmvehicletitleclassName?: string;
  openTradeInModal?: boolean;
  displayPrice?: boolean;
  carMegaMenutitleClassName?: string;
  siteName?: string;
  couponPartsData?: {
    data: CouponItem[];
  };
  couponServiceData?: {
    data: CouponItem[];
  };
  showProductLinks?: boolean;
  twoColumnCard?: boolean;
  showTranslateBtn?: boolean;
  translatebtnClass?: string;
  showOnlyMobile?: boolean;
  megaMenuWithTab?: boolean;
  showInventoryLink?: boolean;
  navListHoverClassName?: string;
  translatebtnContainerClassName?: string;
  subMegaMenuClassName?: string;
  hasInnerSubmenuClassName?: string;
  espanolSiteUrl?: string;
  navListItemLevel1ClassName?: string;
  showTranslateBtnMobile?: boolean;
  startingPriceClassName?: string;
  usedMegaMenuClassName?: string;
}

export const HeaderMenu: FC<IMenu> = memo((props) => {
  const location = useLocation();
  const homePageUrl = location.pathname === '/';
  const hoveredElements = useRef(new Set<HTMLLIElement>());
  const [isOpen, setIsOpen] = useState(false);
  const [hide, setHide] = useState(-1);
  const [activeParent, setActiveParent] = useState(-1);
  const activeParentRef = useRef(activeParent);
  // const [openModal] = useModals();
  const toggleOpen = () => setIsOpen((s) => !s);
  const [showSubMenu, setShowSubMenu] = useState(-1);
  const showHearticonOnMenuLogoLeft = useRecoilValue(showHearticonOnMenuLogoLeftAtom);
  const showHeartIconInBlack = useRecoilValue(showHeartIconInBlackAtom);
  const {
    items,
    vehicles,
    usedJellyBeans,
    btnClassName,
    megaMenuClassName,
    navBarClassName,
    navLinkClassName,
    navLinkLevel1ClassName,
    navListClassName,
    subMenuClassName,
    vehicleTitleTheme,
    custommodalImage,
    externalsitelink,
    cardClassName,
    highlightLabels,
    highlightStyle,
    showStock,
    showWithTitle = false,
    searchBarPlaceholders,
    searchAutoType,
    mobileSearchClassName,
    // settoggleClassName,
    cardModalClasses,
    megaMenuDDClassName,
    vehicletitleClassName,
    submenuItemClassName,
    showMobileModelLabel = 'Inventory',
    nestedSubmenuClassName,
    innerSubMenuClass,
    showExploreMenu = false,
    noPriceLabel,
    showMegaMenuWithCol = false,
    specialStock,
    mmvehicletitleclassName,
    displayPrice = true,
    openTradeInModal = false,
    carMegaMenutitleClassName,
    siteName,
    couponPartsData,
    couponServiceData,
    showProductLinks,
    twoColumnCard,
    showTranslateBtn = false,
    translatebtnClass,
    showOnlyMobile = false,
    megaMenuWithTab = false,
    showInventoryLink = false,
    navListHoverClassName,
    translatebtnContainerClassName,
    subMegaMenuClassName,
    hasInnerSubmenuClassName,
    espanolSiteUrl,
    navListItemLevel1ClassName,
    showTranslateBtnMobile = false,
    startingPriceClassName,
    usedMegaMenuClassName,
  } = props;

  const hoverClasses = [styles.hover, navListHoverClassName];
  const hideSearchBarMobileMenu = useRecoilValue(hideSearchBarMobileMenuAtom);

  useEffect(() => {
    // On location change reset the menu
    setIsOpen(false);
    setHide(-1);
    setActiveParent(-1);
    activeParentRef.current = -1;
    hoveredElements.current.forEach((element) => {
      // element.classList.remove(...hoverClasses);
    });
  }, [location]);

  const handleMouseEnter: (execute: boolean, index?: number) => MouseEventHandler<HTMLLIElement> =
    (execute: boolean, index) => (e) => {
      if (typeof index !== 'undefined') {
        setShowSubMenu(index);
      }

      if (!execute) {
        return;
      }
      // e.currentTarget.classList.add(...hoverClasses);
      hoveredElements.current.add(e.currentTarget);
    };
  const handleMouseLeave: (execute: boolean, index?: number) => MouseEventHandler<HTMLLIElement> =
    (execute: boolean, index) => (e) => {
      if (typeof index !== 'undefined') {
        setShowSubMenu((subMenuIndex) => {
          if (subMenuIndex === index) {
            return -1;
          }
          return subMenuIndex;
        });
      }

      if (!execute) {
        return;
      }
      // e.currentTarget.classList.remove(...hoverClasses);
      hoveredElements.current.delete(e.currentTarget);
    };

  const onParentClickCallback = (parentIndex: number, e: SyntheticEvent) => {
    if (window.innerWidth <= 1024 && activeParentRef.current !== parentIndex) {
      e.preventDefault();
      setActiveParent(parentIndex);
      activeParentRef.current = parentIndex;
    }
  };

  const openMenuVehicleModal = (e: any) => {
    if (window.innerWidth < 1024) {
      e?.preventDefault();
      openModal('MENU_VEHICLE_MODAL', {
        vehicles,
        externalsitelink,
        custommodalImage,
        showStock,
        showWithTitle,
        cardModalClasses,
        noPriceLabel,
        specialStock,
        displayPrice,
        className: styles.vehicle_Modal,
        twoColumnCard,
        showInventoryLink,
        startingPriceClassName: startingPriceClassName,
      });
    }
  };

  const openFuelWidgetModal = (e: any) => {
    e?.preventDefault();
    openModal('FUEL_ECO_WIDGET_MODAL');
  };

  const handleHide = (e: any, i: number) => {
    if (window.innerWidth < 1024) {
      e.preventDefault();
      if (hide === i) {
        setHide(-1);
      } else {
        setHide(i);
      }
    }
  };

  const getAllVehicles = () => {
    const replaceVehicleTitle: Record<string, string> = {
      'Ct4-v': 'CT4 V',
      'Ct5-v': 'CT5 V',
    };
    const allVehicles: any = [];
    vehicles?.forEach((v) => v.details?.forEach((i) => allVehicles.push(i)));
    const replacedTitleVehicles = allVehicles.map((i: VehicleDetail) => ({
      ...i,
      title: replaceVehicleTitle?.[i?.title ?? ''] ?? i?.title,
    }));
    return replacedTitleVehicles;
  };
  const navBarextraClasses = getExtraClasses(styles, navBarClassName);
  const extraClasses = getExtraClasses(styles, btnClassName);
  const megamenuExtraClasses = getExtraClasses(styles, megaMenuClassName);
  const usedMegamenuExtraClasses = getExtraClasses(styles, usedMegaMenuClassName);
  const navLinkExtraClasses = getExtraClasses(styles, navLinkClassName);
  const navListExtraClasses = getExtraClasses(styles, navListClassName);
  const subMenuExtraClasses = getExtraClasses(styles, subMenuClassName);
  const submenuItemExtraClasses = getExtraClasses(styles, submenuItemClassName);
  // const settoggleClasses = getExtraClasses(styles, settoggleClassName);
  const cardextraClasses = getExtraClasses(styles, cardClassName);
  const mobileSearchClasses = getExtraClasses(styles, mobileSearchClassName);
  const subMegaMenuClasses = getExtraClasses(styles, subMegaMenuClassName);
  const megaMenuDDClasses = getExtraClasses(styles, megaMenuDDClassName);
  const vehicletitleClasses = getExtraClasses(styles, vehicletitleClassName);
  const nestedSubmenuClasses = getExtraClasses(styles, nestedSubmenuClassName);
  const mmvehicletitleclasses = getExtraClasses(styles, mmvehicletitleclassName);
  const translatebtnContainerClass = getExtraClasses(styles, translatebtnContainerClassName);
  const isSmartPathActive = useRecoilValue(smartPathActiveAtom);
  if (!items?.length) {
    // If not menu items found, then return null
    return null;
  }

  const navigate = useNavigate();
  const { lang } = useParams();
  const onSearch = (searchValue: string) => {
    const searchParams = new URLSearchParams();
    searchParams.append('s', searchValue.trim());
    const searchStr = searchParams.toString();
    const inventoryUrl = `/inventory/${searchStr ? `?${searchStr}` : ''}`;
    navigate(withLang(inventoryUrl, lang));
  };
  const servicesData = useRecoilValue(partsDataAtom);
  const partsData = useRecoilValue(servicesDataAtom);
  const salesData = useRecoilValue(salesDataAtom);
  const filterServiceData = { ...servicesData, title: 'Service hours' };
  const filterPartsData = { ...partsData, title: 'Parts hours' };
  const filterSalesData = { ...salesData, title: 'Sales hours' };
  //showtranslatebtn
  const [cookies, setCookie, removeCookie] = useCookies(['googtrans']);
  const getDomain = (u: any, s?: any) => {
    let url = u;
    let subdomain = s;
    subdomain = subdomain || false;
    url = url?.replace(/(https?:\/\/)?(www.)?/i, '');
    if (!subdomain) {
      url = url.split('.');
      url = url.slice(url.length - 2).join('.');
    }
    if (url.indexOf('/') !== -1) {
      return url.split('/')[0];
    }
    return url;
  };
  const handleChangeLang = () => {
    if (cookies?.googtrans === '/en/es') {
      removeCookie('googtrans', { path: '/' });
      removeCookie('googtrans', { path: '/', domain: getDomain(window.location.hostname) });
      window.location.reload();
    } else {
      setCookie('googtrans', '/en/es', { path: '/' });
    }
  };

  const openTradeOnlyDealerEngine = (e: SyntheticEvent) => {
    e?.preventDefault?.();
    if (typeof window?.TradeOnlyDealerEngine?.Launch === 'function') {
      window?.TradeOnlyDealerEngine.Launch();
    }
  };
  const handleSubmenuClick =
    (isInventory: boolean, subMenuLength: number, popUpclass: string, isTrageIn: boolean, index: number) =>
    (e: any) => {
      if (isInventory && window.innerWidth < 1024) {
        e.preventDefault();
        openMenuVehicleModal(e);
      } else if (popUpclass === 'fuel-eco-widget-popup') {
        openFuelWidgetModal(e);
      } else if (subMenuLength) {
        handleHide(e, index);
      } else if (isTrageIn) {
        siteName === 'Cincinnati Land Rover' ? openTradeOnlyDealerEngine(e) : window?.openAutoHubWidget();
      } else {
        undefined;
      }
    };

  const renderSubMenu = (
    isMegaMenu: boolean,
    hasExploreMenu: boolean,
    subitem: any,
    index: number,
    isInventory: boolean,
    isTradeIn: boolean,
  ) => (
    <li
      data-a="a"
      onMouseEnter={handleMouseEnter(isMegaMenu)}
      onMouseLeave={handleMouseLeave(isMegaMenu)}
      className={cn(styles.nav_List_Item, styles.desktop_Link, {
        [styles.mega_Menu]: isMegaMenu,
        [styles.explore_Menu_Item]: showExploreMenu && !!hasExploreMenu,
        [subitem?.submenu?.length > 0 ? cn(styles.has_InnerSubmenu, hasInnerSubmenuClassName) : '']: true,
      })}
      key={index}
      data-label={subitem.label?.replace('&#038;', '&')}
    >
      <Link
        className={cn(styles.nav_Link, navLinkExtraClasses, subitem?.class, {
          [styles.mega_Menu_Link]: isMegaMenu,
        })}
        to={subitem?.url ?? '/'}
        onClick={handleSubmenuClick(isInventory, subitem?.submenu?.length, subitem?.class, isTradeIn, index)}
        // onClick={
        //   isInventory ? openMenuVehicleModal : subitem?.submenu?.length ? (e) => handleHide(e, index) : undefined
        // }
        target={subitem?.target}
      >
        {}
        {/* {subitem.label?.replace('&#038;', '&')?.replace('<br>', '\n')} */}
        <span
          dangerouslySetInnerHTML={{
            __html: subitem?.label?.replace('&#038;', '&').replace('â', "'").replace(' â ', ' - ') ?? '',
          }}
        />
        {showExploreMenu && !!hasExploreMenu && (
          <div className={styles.hide_In_Mobile}>
            <img
              src={
                getAllVehicles().find(
                  (v: any) =>
                    subitem?.label?.replace('ESCALADE-V', 'ESCALADE ESV')?.toLowerCase() === v.title.toLowerCase(),
                )?.['image-src']
              }
              alt={subitem.label?.replace('&#038;', '&')}
              // maxWidth={800}
            />
            <span className={styles.outline_Btn}>Explore</span>
          </div>
        )}
      </Link>
      {subitem?.submenu?.length > 0 && (
        <ul className={cn(styles.inner_Sub_Menu, innerSubMenuClass)}>
          {subitem?.submenu?.map((subitems: any, id: number) => (
            <li
              className={cn(styles.nav_List_Item, styles.desktop_Link, {
                [styles.active]: hide === index,
              })}
              key={id}
            >
              <Link to={subitems?.url ?? '/'} className={cn(styles.nav_Link, navLinkExtraClasses)}>
                {subitems?.label?.replace('<br>', '\n')}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {/* {subitem.menu_field__dropdown_theme === 'megamenu' && (
                    <Link className={cn(styles.nav_Link, styles.mobile_Link)} to={subitem?.url ?? '/'}>
                      {subitem.label}
                    </Link>
                  )} */}
      {isMegaMenu && (
        <div className={cn(styles.car_Mega_Menu, subMegaMenuClasses)}>
          {!megaMenuWithTab && vehicles && (
            <MenuVehicle
              vehicles={vehicles}
              vehicleTitleTheme={vehicleTitleTheme}
              cardClassName={cardextraClasses}
              showStock={showStock}
              showWithTitle={showWithTitle}
              className={vehicletitleClasses}
              noPriceLabel={noPriceLabel}
              specialStock={specialStock}
              mmvehicletitleclassName={mmvehicletitleclasses}
              displayPrice={displayPrice}
              carMegaMenutitleClassName={carMegaMenutitleClassName}
              showProductLinks={showProductLinks}
              twoColumnCard={twoColumnCard}
            />
          )}
          {!!megaMenuWithTab && vehicles && (
            <MenuVehicleWithTab
              vehicles={vehicles}
              vehicleTitleTheme={vehicleTitleTheme}
              cardClassName={cardextraClasses}
              showStock={showStock}
              showWithTitle={showWithTitle}
              className={megaMenuDDClasses}
              noPriceLabel={noPriceLabel}
              specialStock={specialStock}
              displayPrice={displayPrice}
              showProductLinks={showProductLinks}
              showInventoryLink={showInventoryLink}
            />
          )}
        </div>
      )}
    </li>
  );

  return (
    <>
      {showTranslateBtnMobile && (
        <div className={cn(styles.translate_Btn_Top_Mobile, styles.hide_In_Desktop, translatebtnContainerClass)}>
          <Button
            {...(espanolSiteUrl ? { element: 'a', href: espanolSiteUrl ?? '', targetSelf: false } : {})}
            onClick={!espanolSiteUrl ? handleChangeLang : undefined}
            className={cn('notranslate', styles.btn_Translate_Mobile, translatebtnClass)}
            type="button"
          >
            {cookies.googtrans ? 'ENGLISH' : 'ESPAÑOL'}
          </Button>
        </div>
      )}
      <button
        type="button"
        aria-label="Menu"
        title="Menu"
        className={cn(styles.mobile_Nav_Icon, extraClasses, {
          [styles.open]: isOpen,
        })}
        onClick={toggleOpen}
      >
        <span />
      </button>

      <nav
        className={cn(
          styles.navbar,
          {
            [styles.active]: isOpen,
          },
          navBarextraClasses,
        )}
      >
        <ul className={cn(styles.nav_List, navListExtraClasses)}>
          {items?.map((item, index: number) => {
            const submenu = item.submenu || [];
            const hasSubMenu = !!submenu.length;
            const isSubmenuActive = activeParent === index;
            const hasMegaMenu = item.menu_field__add_newVehicle_dropdown === 'yes';
            const hasExploreMenu = item.class === 'mainNav__explore_item';
            const displayInMobile = item.class === 'mobile-only-nav';
            const hasMegaMenuWithCol = item.menu_field__dropdown_theme === 'defalut';
            const showContactForm = ['megamenu__parts', 'megamenu__aboutus'];
            const showTwoCol = ['megamenu__specials', 'megamenu__service', 'megamenu__collision'];
            const isTradeIn =
              ((openTradeInModal &&
                (item?.label?.includes?.('Trade In') ||
                  (!!(siteName === 'Cincinnati Land Rover') && item?.label?.includes?.('Value Your Trade')))) ||
                item.url === '#tradeIn') ??
              false;
            const onClickMainNavEvent = (itemLabel: string) => (e: any) => {
              trackAscEvent(`asc_menu_interaction${Date.now()}`, {
                page_type: window?.asc_datalayer?.page_type ?? 'custom',
                event: 'asc_menu_interaction',
                element_text: itemLabel,
                event_subtype: 'dropdown',
                element_type: 'main_nav',
                event_action: 'click',
              });
              if (isTradeIn) {
                siteName === 'Cincinnati Land Rover' ? openTradeOnlyDealerEngine(e) : window?.openAutoHubWidget();
              } else if (item.menu_field__add_newVehicle_dropdown === 'yes') {
                openMenuVehicleModal(e);
              } else if (hasSubMenu) {
                onParentClickCallback(index, e);
              } else {
                undefined;
              }
            };
            return (
              <li
                key={index}
                className={cn(
                  styles.nav_List_Item,
                  navListItemLevel1ClassName,
                  styles?.[`${item?.class}`],
                  item?.class,
                  {
                    [cn(styles.has_SubMenu, submenuItemExtraClasses)]: hasSubMenu,
                    [styles.active]: isSubmenuActive,
                    [styles.mega_Menu]: hasMegaMenu,
                    [styles.explore_Menu_List]: showExploreMenu && !!hasExploreMenu,
                    [styles.has_Mega_Menu_List]: showMegaMenuWithCol && !!hasMegaMenuWithCol,
                    [styles.hide_In_Desktop]: showOnlyMobile && displayInMobile,
                  },
                )}
                onMouseEnter={handleMouseEnter(hasSubMenu || hasMegaMenu, index)}
                onMouseLeave={handleMouseLeave(hasSubMenu || hasMegaMenu, index)}
                data-label={item?.label?.replace('&#038;', '&')?.replace('<br>', '\n') ?? ''}
              >
                <Link
                  to={item.url?.replace('%20', '') ?? '/'}
                  target={item?.target ?? '_self'}
                  className={cn(styles.nav_Link, styles.desktop_Link, navLinkLevel1ClassName)}
                  style={highlightLabels?.includes?.(item?.label?.toLowerCase?.() ?? '') ? highlightStyle : {}}
                  onClick={onClickMainNavEvent(item?.label ?? '')}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html:
                        `${item?.label?.replace('&#038;', '&')?.replace('<br>', '\n')} 
                      ${
                        item.menu_field__gets_inventory_count === 'append' && item.inventory_count
                          ? `(${item.inventory_count})`
                          : ''
                      }` ?? '',
                    }}
                  />
                </Link>
                {showSubMenu === index && (
                  <>
                    {item?.menu_field__add_newVehicle_dropdown === 'yes' && (
                      <div className={cn(styles.car_Mega_Menu, megamenuExtraClasses)}>
                        {!megaMenuWithTab && vehicles && (
                          <MenuVehicle
                            vehicles={vehicles}
                            vehicleTitleTheme={vehicleTitleTheme}
                            cardClassName={cardextraClasses}
                            showStock={showStock}
                            showWithTitle={showWithTitle}
                            className={megaMenuDDClasses}
                            noPriceLabel={noPriceLabel}
                            specialStock={specialStock}
                            displayPrice={displayPrice}
                            showProductLinks={showProductLinks}
                          />
                        )}
                        {megaMenuWithTab && vehicles && (
                          <MenuVehicleWithTab
                            vehicles={vehicles}
                            vehicleTitleTheme={vehicleTitleTheme}
                            cardClassName={cardextraClasses}
                            showStock={showStock}
                            showWithTitle={showWithTitle}
                            className={megaMenuDDClasses}
                            noPriceLabel={noPriceLabel}
                            specialStock={specialStock}
                            displayPrice={displayPrice}
                            showProductLinks={showProductLinks}
                            showInventoryLink={showInventoryLink}
                          />
                        )}
                      </div>
                    )}
                    {hasSubMenu && (
                      <ul
                        className={cn(
                          styles.sub_Menu,
                          item?.submenu?.find((i) => i?.submenu?.length) ? nestedSubmenuClasses : '',
                          // { [nestedSubmenuClasses]: !!item?.submenu?.find((i) => i?.submenu?.length) },
                          subMenuExtraClasses,
                          {
                            [styles.explore_Menu]: showExploreMenu && !!hasExploreMenu,
                          },
                          {
                            [styles.mega_Menu_Col]: showMegaMenuWithCol && !!hasMegaMenuWithCol,
                          },
                          {
                            [styles.mega_Menu_Col2]: showTwoCol.includes(item?.class ?? ''),
                          },
                        )}
                      >
                        {showMegaMenuWithCol && !!hasMegaMenuWithCol && (
                          <>
                            <li className={styles.mega_Menu_Col_Item}>
                              <ul>
                                {submenu?.map((subitem, i: number) => {
                                  // const isInventory = (subitem?.label?.indexOf?.(showMobileModelLabel ?? '') ?? -1) > -1;
                                  const isInventory = subitem?.label === showMobileModelLabel ?? '';
                                  const isMegaMenu = subitem.menu_field__dropdown_theme === 'megamenu';
                                  const isTrageIn =
                                    ((openTradeInModal &&
                                      (subitem?.label?.includes?.('Trade In') ||
                                        (!!(siteName === 'Cincinnati Land Rover') &&
                                          subitem?.label?.includes?.('Value Your Trade')))) ||
                                      subitem.url === '#tradeIn') ??
                                    false;
                                  return renderSubMenu(isMegaMenu, hasExploreMenu, subitem, i, isInventory, isTrageIn);
                                })}
                              </ul>
                            </li>
                            {item?.class?.includes('specials') && (
                              <li className={cn(styles.mega_Menu_Col_Item, styles.visible_Only_Desktop)}>
                                <h2>Specials Coming Soon!</h2>
                              </li>
                            )}
                            {(item?.class?.includes('service') || item?.class?.includes('collision')) && (
                              <>
                                {siteName === 'Tubman Chevrolet' && (
                                  <li className={cn(styles.mega_Menu_Col_Item, styles.visible_Only_Desktop)}>
                                    <h3>Service Coupons</h3>
                                    <MenuCouponSlider couponData={couponServiceData} />
                                  </li>
                                )}
                                {!(siteName === 'Tubman Chevrolet') && (
                                  <li className={cn(styles.mega_Menu_Col_Item, styles.visible_Only_Desktop)}>
                                    <ContactTimeList items={filterServiceData} className={styles.custom_Timelist} />
                                  </li>
                                )}
                              </>
                            )}
                            {item?.class?.includes('parts') && (
                              <>
                                {siteName === 'Tubman Chevrolet' && (
                                  <li className={cn(styles.mega_Menu_Col_Item, styles.visible_Only_Desktop)}>
                                    <h3>Parts Coupons</h3>
                                    <MenuCouponSlider couponData={couponPartsData} />
                                  </li>
                                )}
                                {!(siteName === 'Tubman Chevrolet') && (
                                  <li className={cn(styles.mega_Menu_Col_Item, styles.visible_Only_Desktop)}>
                                    <ContactTimeList items={filterPartsData} className={styles.custom_Timelist} />
                                  </li>
                                )}
                              </>
                            )}

                            {item?.class?.includes('aboutus') && (
                              <li className={cn(styles.mega_Menu_Col_Item, styles.visible_Only_Desktop)}>
                                <ContactTimeList items={filterSalesData} className={styles.custom_Timelist} />
                              </li>
                            )}
                            {showContactForm.includes(item?.class ?? '') && (
                              <li className={cn(styles.mega_Menu_Col_Item, styles.visible_Only_Desktop)}>
                                <h2>Contact Us</h2>
                                <Form1002ContactUsForm className={styles.mega_Menu_Form} />
                              </li>
                            )}
                          </>
                        )}
                        {((!showMegaMenuWithCol && !!hasMegaMenuWithCol) || !hasMegaMenuWithCol) && (
                          <>
                            {!!usedJellyBeans && item?.class === 'inventoryused' && (
                              <div className={cn(usedMegamenuExtraClasses)}>
                                {usedJellyBeans && (
                                  <MenuVehicle
                                    vehicles={usedJellyBeans}
                                    vehicleTitleTheme={vehicleTitleTheme}
                                    cardClassName={cn(cardextraClasses, 'used_Jellybean_Card')}
                                    showStock={showStock}
                                    showWithTitle={showWithTitle}
                                    className={cn(megaMenuDDClasses, 'used_Jellybeans')}
                                    noPriceLabel={noPriceLabel}
                                    specialStock={specialStock}
                                    displayPrice={displayPrice}
                                    showProductLinks={showProductLinks}
                                    isCategoryLink={true}
                                  />
                                )}
                              </div>
                            )}
                            {submenu?.map((subitem, i: number) => {
                              // const isInventory = (subitem?.label?.indexOf?.(showMobileModelLabel ?? '') ?? -1) > -1;
                              const isInventory = subitem?.label === showMobileModelLabel ?? '';
                              const isMegaMenu = subitem.menu_field__dropdown_theme === 'megamenu';
                              const isTrageIn =
                                ((openTradeInModal &&
                                  (subitem?.label?.includes?.('Trade In') ||
                                    subitem?.url?.includes('#tradeIn') ||
                                    (siteName === 'Cincinnati Land Rover' &&
                                      subitem?.label?.includes?.('Value Your Trade')))) ||
                                  subitem.url === '#tradeIn') ??
                                false;
                              return renderSubMenu(isMegaMenu, hasExploreMenu, subitem, i, isInventory, isTrageIn);
                            })}
                          </>
                        )}
                      </ul>
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ul>
        {showTranslateBtn && (
          <div className={cn(styles.btn_Container, styles.hide_In_Desktop, translatebtnContainerClass)}>
            <Button
              {...(espanolSiteUrl ? { element: 'a', href: espanolSiteUrl ?? '', targetSelf: false } : {})}
              onClick={!espanolSiteUrl ? handleChangeLang : undefined}
              className={cn('notranslate', styles.btn_translate, translatebtnClass)}
              type="button"
            >
              {cookies.googtrans ? 'ENGLISH' : 'ESPAÑOL'}
            </Button>
          </div>
        )}
        {!hideSearchBarMobileMenu && (
          <SearchBar
            onSearch={onSearch}
            className={cn(styles.menu_Search, mobileSearchClasses, 'icon_btn_only')}
            placeholders={searchBarPlaceholders}
            autotype={searchAutoType}
          />
        )}
      </nav>
      {isSmartPathActive && (
        <div className={styles.header_Smartpath_Icon} id="smartpath-icons">
          <div id="dg-component-nav-menu-desktop" />
          {!showHearticonOnMenuLogoLeft && <div id="dg-component-nav-menu-mobile" />}
          {/* @ts-ignore */}
          {homePageUrl && showHearticonOnMenuLogoLeft && !showHeartIconInBlack && <dg-save-heart color="white" />}
          {/* @ts-ignore */}
          {!homePageUrl && showHearticonOnMenuLogoLeft && <dg-save-heart color="black" />}
          {/* @ts-ignore */}
          {!showHearticonOnMenuLogoLeft && !showHeartIconInBlack && <dg-save-heart color="white" />}
          {/* @ts-ignore */}
          {showHeartIconInBlack && <dg-save-heart color='black'/>}
          <div id="dg-shopping-cart" />
          {/* @ts-ignore */}
          {/* <dg-shopping-cart force-show='true' /> */}
        </div>
      )}
      <MenuVehicleModal />
      <FuelEcoWidgetModal />
    </>
  );
});
