import { type ReactElement, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from '@reactpwa/core';
import cn from 'classnames';

import { getExtraClasses } from '@utils/common.util';
import { SearchBar } from '@components/search-bar';
import { Link } from '@components/link';
import { withLang } from '@utils/language.util';
import { Img } from '@components/img';
import { type MenuItem } from '@typedefs/menu';
import { type Vehicle } from '@typedefs/vehicle';
import { useRecoilValue } from 'recoil-ssr';
import { showCompareandFavAtom } from 'src/stores/global-settings.atom';
import CompareVehicles from '@components/compare-vehicles';
import { SearchOnHoverIcon } from '@components/search_on_hover_icon';
import { HeaderMenu } from '../menu';
import styles from './styles.module.scss';
import { ManufacturerInfo } from '../manufacturer-info';
import { Button } from '@components/button';
import { ToggleSwitch } from '@components/toggle-button';
import { ContactHoursTab } from '@components/contact-hours-tab';
import useOnClickOutside from '@hooks/useOnclickOutside';
import { type CouponItem } from '@typedefs/coupon';
import { isValidVin } from '@components/compare-vehicles';

interface IHeader {
  className?: string;
  children?: ReactElement;
  siteLogo?: string;
  siteName?: string;
  navigationMenu?: MenuItem[];
  vehicles?: Vehicle[];
  searchAutoType: string[];
  searchBarPlaceholders?: { display_name: string; item: string }[];
  searchOnHover?: boolean;
  megaMenuClassName?: string;
  navListClassName?: string;
  cardClassName?: string;
  navLinkClassName?: string;
  navLinkLevel1ClassName?: string;
  navBarClassName?: string;
  showStock?: boolean;
  handleModalSearch?: any;
  showInstantSearch?: boolean;
  mobileSearchClassName?: string;
  megaMenuDDClassName?: string;
  headerMenuContainClassName?: string;
  submenuItemClassName?: string;
  nestedSubmenuClassName?: string;
  subMenuClassName?: string;
  logoClassName?: string;
  compareVehicleClassName?: string;
  showExploreMenu?: boolean;
  noPriceLabel?: string;
  showMegaMenuWithCol?: boolean;
  manufacturerUrl?: string;
  manufacturerImg?: string;
  manufacturerTitle?: string;
  ManufacturerInfoClassName?: string;
  searchWithModal?: boolean;
  siteContactNav?: boolean;
  searchPlaceholderWithModal?: boolean;
  searchIconClass?: string;
  searchPlaceholderClass?: string;
  menuIconClass?: string;
  displayPrice?: boolean;
  showWithTitle?: boolean;
  carMegaMenutitleClassName?: string;
  innerSubMenuClassName?: string;
  couponServiceData?: {
    data: CouponItem[];
  };
  couponPartsData?: {
    data: CouponItem[];
  };
  showMobileModelLabel?: string;
  specialStock?: string;
  showProductLinks?: boolean;
  navBannerClass?: string;
  navBannerText?: string;
  navBannerUrl?: any;
  isNavBanner?: boolean;
  showOnlyMobile?: boolean;
  searchlabel?: string;
  megaMenuWithTab?: boolean;
  showInventoryLink?: boolean;
}

export const HeaderSearchBarMegaMenu: React.FC<IHeader> = (props) => {
  const {
    className,
    children,
    siteLogo,
    siteName,
    navigationMenu,
    vehicles,
    searchBarPlaceholders,
    searchAutoType,
    searchOnHover = false,
    megaMenuClassName,
    navListClassName,
    cardClassName,
    navLinkClassName,
    navLinkLevel1ClassName,
    navBarClassName,
    showStock = true,
    handleModalSearch,
    mobileSearchClassName,
    megaMenuDDClassName,
    headerMenuContainClassName,
    submenuItemClassName,
    nestedSubmenuClassName,
    innerSubMenuClassName,
    logoClassName,
    subMenuClassName,
    compareVehicleClassName,
    showExploreMenu = false,
    showMegaMenuWithCol = false,
    noPriceLabel,
    manufacturerUrl = '',
    manufacturerImg = '',
    manufacturerTitle = '',
    ManufacturerInfoClassName,
    searchWithModal = false,
    siteContactNav = false,
    searchPlaceholderWithModal = false,
    searchIconClass = '',
    searchPlaceholderClass = '',
    menuIconClass = '',
    displayPrice = true,
    showWithTitle,
    carMegaMenutitleClassName,
    couponServiceData,
    couponPartsData,
    showMobileModelLabel,
    specialStock,
    showProductLinks,
    showOnlyMobile = false,
    searchlabel,
    megaMenuWithTab = false,
    showInventoryLink = false,
    showInstantSearch = false,
  } = props;
  const extraClasses = getExtraClasses(styles, className);
  const megaMenuClasses = getExtraClasses(styles, megaMenuClassName);
  const navListClasses = getExtraClasses(styles, navListClassName);
  const submenuItemExtraClasses = getExtraClasses(styles, submenuItemClassName);
  const subMenuExtraClasses = getExtraClasses(styles, subMenuClassName);
  const navLinkClasses = getExtraClasses(styles, navLinkClassName);
  const mobileSearchClasses = getExtraClasses(styles, mobileSearchClassName);
  const megaMenuDDClasses = getExtraClasses(styles, megaMenuDDClassName);
  const nestedSubmenuClasses = getExtraClasses(styles, nestedSubmenuClassName);
  const innerSubMenuClassClasses = getExtraClasses(styles, innerSubMenuClassName);
  const showSaveandCompare = useRecoilValue(showCompareandFavAtom);
  const [showDealerHoursTabs, setShowDealerHoursTabs] = useState(false);
  const hoursBtnTabRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { lang } = useParams();

  const handleDealerHoursBtnClick = () => {
    setShowDealerHoursTabs(true);
  };
  const closeDealerHoursBtnClick = () => {
    setShowDealerHoursTabs(false);
  };
  useOnClickOutside(hoursBtnTabRef, closeDealerHoursBtnClick);

  let isCurrentInventoryUsed = false;
  let isCurrentInventoryNew = false;
  if (location?.pathname?.startsWith('/inventory')) {
    const slugParts = (location?.pathname ?? '').split('-');
    const vin = slugParts[slugParts.length - 1];
    isCurrentInventoryUsed =
      !isValidVin(vin) &&
      (`${location?.pathname}${location?.search}`?.indexOf('used') > -1 ||
        `${location?.pathname}${location?.search}`?.indexOf('Used') > -1);
    isCurrentInventoryNew =
      !isValidVin(vin) &&
      (`${location?.pathname}${location?.search}`?.indexOf('new') > -1 ||
        `${location?.pathname}${location?.search}`?.indexOf('New') > -1);
  }
  const onSearch = (searchValue: string) => {
    const searchParams = new URLSearchParams();
    searchParams.append('s', searchValue.trim());
    if (location?.pathname?.startsWith('/inventory')) {
      const pathSplit = location?.pathname?.split('/')?.filter(Boolean);
      const slug = pathSplit?.[pathSplit.length - 1];
      const slugParts = (slug ?? '').split('-');
      const vin = slugParts[slugParts.length - 1];
      if (!isValidVin(vin)) {
        if (isCurrentInventoryNew) {
          searchParams.set('type', 'new');
        }
        if (isCurrentInventoryUsed) {
          searchParams.set('type', 'used');
        }
      }
    }
    const searchStr = searchParams.toString();
    const queryParams = searchStr ? `?${searchStr}` : '';
    const inventoryUrl = `/inventory/${queryParams}`;
    navigate(withLang(inventoryUrl, lang));
  };

  const cardextraClasses = getExtraClasses(styles, cardClassName);

  const renderLogo = () => {
    return (
      <div className={cn(styles.site_Logo, logoClassName)}>
        <Link to='/' className={styles.site_Logo_Link}>
          <Img src={siteLogo ?? ''} alt={siteName ?? ''} maxWidth={1024} />
        </Link>
      </div>
    );
  };
  return (
    <header className={cn(styles.site_Header, extraClasses)}>
      {children}
      <div className={styles.header_Content}>
        <div
          className={cn(styles.header_Container, 'container container-fluid', {
            [styles.header_Container__searchOnHover]: !!searchOnHover || !!searchWithModal,
          })}
        >
          {showSaveandCompare === 'true' && (
            <div className={cn(styles.compare_Vehicle_Contain, compareVehicleClassName)}>
              <CompareVehicles btnClassName={styles.compare_Btn} />
            </div>
          )}
          {!!siteLogo && renderLogo()}
          {(!!manufacturerUrl || !!manufacturerImg || !!manufacturerTitle) && (
            <ManufacturerInfo
              className={ManufacturerInfoClassName}
              url={manufacturerUrl}
              image={manufacturerImg}
              title={manufacturerTitle}
            />
          )}
          <div
            className={cn(styles.header_Menu_Contain, headerMenuContainClassName, {
              [styles.header_Menu_Contain__searchOnHover]: !!searchOnHover || !!searchWithModal,
            })}
          >
            <HeaderMenu
              navListClassName={navListClasses}
              items={navigationMenu}
              vehicles={vehicles}
              megaMenuClassName={megaMenuClasses}
              megaMenuDDClassName={megaMenuDDClasses}
              btnClassName={cn(styles.header_Menu_Btn, menuIconClass)}
              cardClassName={cardextraClasses}
              navLinkClassName={navLinkClasses}
              navLinkLevel1ClassName={navLinkLevel1ClassName}
              navBarClassName={navBarClassName}
              showStock={showStock}
              searchBarPlaceholders={searchBarPlaceholders}
              searchAutoType={searchAutoType}
              mobileSearchClassName={cn(styles.mobile_Search, mobileSearchClasses)}
              cardModalClasses={cardextraClasses}
              submenuItemClassName={submenuItemExtraClasses}
              innerSubMenuClass={innerSubMenuClassClasses}
              subMenuClassName={subMenuExtraClasses}
              nestedSubmenuClassName={nestedSubmenuClasses}
              showExploreMenu={showExploreMenu}
              noPriceLabel={noPriceLabel}
              showMegaMenuWithCol={showMegaMenuWithCol}
              displayPrice={displayPrice}
              showWithTitle={showWithTitle}
              carMegaMenutitleClassName={carMegaMenutitleClassName}
              siteName={siteName}
              couponServiceData={couponServiceData}
              couponPartsData={couponPartsData}
              showMobileModelLabel={showMobileModelLabel}
              specialStock={specialStock}
              showProductLinks={showProductLinks}
              showOnlyMobile={showOnlyMobile}
              megaMenuWithTab={megaMenuWithTab}
              showInventoryLink={showInventoryLink}
            />
            {!!searchWithModal && (
              <span
                className={cn(styles.search_Icon_Btn, styles.search_Icon)}
                title='Search'
                onClick={handleModalSearch}
              >
                <i className='foxicon foxicon-search' />
              </span>
            )}
            {!!siteContactNav && (
              <div className={cn('d_Flex', styles.siteContactNav)}>
                <div ref={hoursBtnTabRef} className={styles.hours_section_Wrapper}>
                  <Button className={cn('btn-icon btn-outline', styles.hours_Btn)} onClick={handleDealerHoursBtnClick}>
                    Dealer Hours
                  </Button>
                  {showDealerHoursTabs && (
                    <div className={styles.hours_Tab}>
                      <ContactHoursTab showHours={false} />
                    </div>
                  )}
                </div>
                <Button className={cn('btn-icon btn-outline', styles.search_Btn)} onClick={handleModalSearch}>
                  <i className='foxicon foxicon-search' />
                  Search
                </Button>
                <ToggleSwitch className='mx_1' label1='FR' label2='EN' />
              </div>
            )}
            {!!searchPlaceholderWithModal && (
              <SearchBar
                onSearch={onSearch}
                className={cn(styles.header_Search_Sm, searchPlaceholderClass)}
                placeholders={searchBarPlaceholders}
                autotype={searchAutoType}
                handleModalSearch={handleModalSearch}
              />
            )}
            {!!searchOnHover && (
              <SearchOnHoverIcon
                onSearch={onSearch}
                className={cn(styles.header_Search_Icon, searchIconClass)}
                placeholders={searchBarPlaceholders}
                autotype={searchAutoType}
                handleModalSearch={handleModalSearch}
                searchlabel={searchlabel}
              />
            )}
          </div>
          {!searchOnHover && !searchWithModal && !searchPlaceholderWithModal && !siteContactNav && (
            <SearchBar
              onSearch={onSearch}
              className={styles.header_Search}
              placeholders={searchBarPlaceholders}
              autotype={searchAutoType}
              {...(showInstantSearch
                ? {
                    handleModalSearch: handleModalSearch,
                  }
                : {})}
            />
          )}
        </div>
      </div>
    </header>
  );
};
