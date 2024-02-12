import { type ReactElement } from 'react';

import cn from 'classnames';
import { useNavigate, useParams } from '@reactpwa/core';
import { getExtraClasses } from '@utils/common.util';
import { withLang } from '@utils/language.util';
import { Link } from '@components/link';
import { SearchBar } from '@components/search-bar';
import { Img } from '@components/img';
import { type MenuItem } from '@typedefs/menu';
import { type Vehicle } from '@typedefs/vehicle';
import { HeaderMenu } from '../menu';
import styles from './styles.module.scss';
import wolfeHeaderImage from './image/wolfeHeaderLogo.png';

interface IHeader {
  className?: string;
  children?: ReactElement;
  siteLogo?: string;
  siteName?: string;
  navigationMenu?: MenuItem[];
  vehicles?: Vehicle[];
  searchAutoType: string[];
  searchBarPlaceholders?: { display_name: string; item: string }[];
  vehicleTitleTheme?: string;
  externalsiteurl?: string;
  externalsitelink?: string;
  custommodalImage?: boolean;
  containerclassname?: string;
  navLinkClassName?: string;
  highlightLabels?: string[];
  highlightStyle?: Record<string, string>;
  showMobileModelLabel?: string;
  nestedSubmenuClassName?: string;
}

export const HeaderWithoutSearchBar: React.FC<IHeader> = (props) => {
  const {
    className,
    children,
    siteLogo,
    siteName,
    navigationMenu,
    vehicles,
    searchBarPlaceholders,
    searchAutoType,
    vehicleTitleTheme = 'heading',
    externalsiteurl,
    custommodalImage,
    externalsitelink,
    containerclassname,
    navLinkClassName,
    highlightLabels,
    highlightStyle,
    showMobileModelLabel,
    nestedSubmenuClassName,
  } = props;
  const extraClasses = getExtraClasses(styles, className);
  const containerextraClasses = getExtraClasses(styles, containerclassname);
  const navLinkextraClasses = getExtraClasses(styles, navLinkClassName);
  const nestedSubmenuClasses = getExtraClasses(styles, nestedSubmenuClassName);

  const navigate = useNavigate();
  const { lang } = useParams();
  const onSearch = (searchValue: string) => {
    const searchParams = new URLSearchParams();
    searchParams.append('s', searchValue.trim());
    const searchStr = searchParams.toString();
    const inventoryUrl = `/inventory/${searchStr ? `?${searchStr}` : ''}`;
    navigate(withLang(inventoryUrl, lang));
  };

  return (
    <header className={cn(styles.site_Header, extraClasses)}>
      <div className={styles.header_Content}>
        <div className={cn('container container-fluid', containerextraClasses)}>
          <div className={styles.header_Container}>
            {!!siteLogo && (
              <div className={styles.site_Logo}>
                <Link to='/' className={styles.site_Logo_Link}>
                  <Img src={siteLogo} alt={siteName ?? ''} maxWidth={574} />
                </Link>
              </div>
            )}
            <div className={styles.header_Wolfe_Logo}>
              <Link to={externalsiteurl ?? ''}>
                <Img width={276} src={wolfeHeaderImage} />
              </Link>
            </div>
            {children}
          </div>
          <SearchBar
            onSearch={onSearch}
            className={cn(styles.header_Search, 'icon_btn_only')}
            placeholders={searchBarPlaceholders}
            autotype={searchAutoType}
          />
        </div>
        <div className={styles.header_Menu_Contain}>
          <HeaderMenu
            items={navigationMenu}
            vehicles={vehicles}
            btnClassName={styles.nav_Btn}
            navBarClassName={cn(styles.nav_Bar, styles.top)}
            megaMenuClassName='level_1 wolfe_Megamenu'
            subMenuClassName={styles.sub_Menu_Position_Right}
            vehicleTitleTheme={vehicleTitleTheme}
            custommodalImage={custommodalImage}
            externalsitelink={externalsitelink}
            navLinkClassName={cn(styles.nav_Link, navLinkextraClasses)}
            highlightLabels={highlightLabels}
            highlightStyle={highlightStyle}
            showMobileModelLabel={showMobileModelLabel}
            nestedSubmenuClassName={nestedSubmenuClasses}
          />
        </div>
      </div>
    </header>
  );
};
