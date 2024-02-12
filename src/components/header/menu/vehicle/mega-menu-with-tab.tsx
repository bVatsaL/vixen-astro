import { Link } from '@components/link';
import { InventoryCard } from '@components/card/inventory-card';
import { type FC, Fragment, useState } from 'react';
import { type Vehicle } from '@typedefs/vehicle';
import { useModals } from '@hooks/useModal';
import cn from 'classnames';
import { getExtraClasses } from '@utils/common.util';
import styles from './styles.module.scss';
import tabStyles from './mega-menu-with-tab.module.scss';
import TabNavItem from '@components/tab/tabs/tab-nav-item';
import TabContent from '@components/tab/tabs/tab-content';

export const MenuVehicleWithTab: FC<{
  vehicles: Vehicle[];
  isModal?: boolean;
  custommodalImage?: boolean;
  vehicleTitleTheme?: string;
  externalsitelink?: string;
  cardClassName?: string;
  showStock?: boolean;
  showWithTitle?: boolean;
  className?: string;
  vehicletitleClassName?: string;
  noPriceLabel?: string;
  specialStock?: string;
  displayPrice?: boolean;
  mmvehicletitleclassName?: string;
  carMegaMenutitleClassName?: string;
  showProductLinks?: boolean;
  twoColumnCard?: boolean;
  activeclassName?: string;
  tabItemClassName?: string;
  showInventoryLink?: boolean;
}> = (props) => {
  const {
    vehicles,
    isModal = false,
    cardClassName,
    showStock = true,
    showWithTitle = false,
    className,
    noPriceLabel,
    specialStock,
    displayPrice = true,
    carMegaMenutitleClassName,
    showProductLinks,
    activeclassName,
    tabItemClassName,
    showInventoryLink = false,
  } = props;
  const [, closeModal] = useModals();
  const closeMenuVehicleModal = () => {
    closeModal('MENU_VEHICLE_MODAL');
  };

  const [activeTab, setActiveTab] = useState(0);
  const cardextraClasses = getExtraClasses(styles, cardClassName);
  const extraClasses = getExtraClasses(styles, className);
  const activeclassNames = getExtraClasses(tabStyles, activeclassName);
  const tabItemClass = getExtraClasses(tabStyles, tabItemClassName);
  return (
    <ul className={cn(styles.mega_Menu, tabStyles.mega_Menu_Container, extraClasses)}>
      <li className={styles.main_Mobile_Title} onClick={isModal ? closeMenuVehicleModal : () => {}}>
        <Link className={styles.link} to='/inventory/?type=new'>
          View All New Vehicles
        </Link>
      </li>
      <li>
        <div className={tabStyles.tab_Row}>
          {vehicles?.map((item, index: number) => (
            <div key={index} className={tabStyles.tab_Item}>
              <TabNavItem
                title={item?.category?.replace?.(/_/g, ' ')?.replace(/Â/g, '')}
                id={index}
                key={index}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                className={cn('activetab', tabStyles.tab_Menu, tabItemClass)}
                activeClassName={cn(tabStyles.active, activeclassNames)}
              />
            </div>
          ))}
        </div>
        <div className={tabStyles.tab_Content_Container}>
          {vehicles?.map((item, index: number) => (
            <Fragment key={index}>
              <TabContent
                id={index}
                activeTab={activeTab}
                className={tabStyles.tab_Content}
                activeTabClassName={tabStyles.open_Tab}
              >
                {(item.details ?? []).map((value, i: number) => (
                  <div
                    className={cn(tabStyles.category_Item, {
                      [styles.Cat_Image_None]: !!value?.isPicture,
                    })}
                    key={i}
                    onClick={isModal ? closeMenuVehicleModal : () => {}}
                  >
                    <InventoryCard
                      url={value['inventory-url']}
                      image={value['image-src']}
                      title={value.title?.replace(/Â/g, '')}
                      stock={value.inventory_count ? value.inventory_count : value.noStockLabel}
                      startingPrice={value.lowest_price ? `Starting at $${value.lowest_price}` : noPriceLabel}
                      className={cn('card_sm', cardextraClasses)}
                      showStock={showStock}
                      showWithTitle={showWithTitle}
                      specialStock={specialStock}
                      displayPrice={displayPrice}
                      titleClassName={carMegaMenutitleClassName}
                      productPageUrl={value['research-url']}
                      showProductLinks={showProductLinks}
                      subTitle={value?.subtitle}
                      showInventoryLink={showInventoryLink}
                    />
                  </div>
                ))}
              </TabContent>
            </Fragment>
          ))}
        </div>
      </li>
    </ul>
  );
};
