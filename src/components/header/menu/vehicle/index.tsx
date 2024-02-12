import { Link } from '@components/link';
import { InventoryCard } from '@components/card/inventory-card';
import { TwoColumnInventoryCard } from '@components/card/inventory-card/two-column-inventory_card';
import { type FC } from 'react';
import { type Vehicle } from '@typedefs/vehicle';
import { useModals } from '@hooks/useModal';
import cn from 'classnames';
import { getExtraClasses } from '@utils/common.util';
import styles from './styles.module.scss';
import accessCadillacMobileImage from '../../menu_without_search/image/cadillacMobile.png';
import { trackAscEvent } from '@utils/analytics.util';

export const MenuVehicle: FC<{
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
  startingPriceClassName?: string;
  showProductLinks?: boolean;
  twoColumnCard?: boolean;
  showInventoryLink?: boolean;
  isCategoryLink?: boolean;
}> = (props) => {
  const {
    vehicles,
    isModal = false,
    vehicleTitleTheme = 'heading',
    custommodalImage = false,
    externalsitelink,
    cardClassName,
    showStock = true,
    showWithTitle = false,
    className,
    vehicletitleClassName,
    noPriceLabel,
    specialStock,
    mmvehicletitleclassName,
    displayPrice = true,
    carMegaMenutitleClassName,
    startingPriceClassName,
    showProductLinks,
    twoColumnCard = false,
    showInventoryLink = false,
    isCategoryLink = false,
  } = props;
  const [, closeModal] = useModals();

  const trackCTAInteraction = (value: any) => {
    trackAscEvent('asc_cta_interaction', {
      event: 'asc_cta_interaction',
      element_text: value?.title,
      link_url: value['inventory-url'],
      event_action: 'click',
      event_action_result: 'redirect',
      element_type: 'jellybean',
      item_mode: (value?.title ?? '').toLowerCase(),
      page_type: 'custom',
    });
  };
  const closeMenuVehicleModal = (value: any) => () => {
    if (value) {
      trackCTAInteraction(value);
    }
    closeModal('MENU_VEHICLE_MODAL');
  };

  const isSidebarTheme = vehicleTitleTheme === 'sideBar';
  const cardextraClasses = getExtraClasses(styles, cardClassName);
  const vehicletitleClasses = getExtraClasses(styles, vehicletitleClassName);
  const mmvehicletitleclasses = getExtraClasses(styles, mmvehicletitleclassName);
  const extraClasses = getExtraClasses(styles, className);
  return (
    <ul className={cn(styles.mega_Menu, extraClasses)}>
      <li className={styles.main_Mobile_Title} onClick={isModal ? closeMenuVehicleModal(null) : () => {}}>
        <Link className={styles.link} to='/inventory/?type=new'>
          View All New Vehicles
        </Link>
      </li>
      {vehicles?.map((item, index: number) => (
        <li className={cn(styles.nav_Category, vehicletitleClasses)} key={index}>
          {(isCategoryLink && !!item?.categoryLink) ? (
            <Link to={item?.categoryLink ?? ''}>
              <p className={cn(styles.nav_Category_Title, isSidebarTheme && styles.d_None, mmvehicletitleclasses)}>
                <span>{item.category?.replaceAll('Â', '')}</span>
              </p>
            </Link>
          ) : (
            <p className={cn(styles.nav_Category_Title, isSidebarTheme && styles.d_None, mmvehicletitleclasses)}>
              <span>{item.category?.replaceAll('Â', '')}</span>
            </p>
          )}
          {isSidebarTheme && (
            <div className={isSidebarTheme && styles.d_None_Desktop}>
              {item?.catLogo?.url?.length ? (
                <Link to={item?.catLogo?.url ?? ''}>
                  <img src={item?.catLogo?.image} alt='catlogo' />
                  <span className={styles.text_White}>{item?.catLogo?.title}</span>
                </Link>
              ) : (
                <>
                  <img src={item?.catLogo?.image} alt='catlogo' />
                  <span className={styles.text_White}>{item?.catLogo?.title}</span>
                </>
              )}
            </div>
          )}
          <ul className={styles.category_Items}>
            {(item.details ?? []).map((value, i: number) => (
              <li
                className={cn(styles.category_Item, {
                  [styles.Cat_Image_None]: !!value?.isPicture,
                })}
                key={i}
                onClick={isModal ? closeMenuVehicleModal(value) : () => trackCTAInteraction(value)}
              >
                {twoColumnCard ? (
                  <TwoColumnInventoryCard
                    url={value['inventory-url']}
                    image={value['image-src']}
                    title={value.title}
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
                  />
                ) : (
                  <InventoryCard
                    url={value['inventory-url']}
                    image={value['image-src']}
                    title={value.title}
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
                    startingPriceClassName={startingPriceClassName}
                  />
                )}
              </li>
            ))}
          </ul>
        </li>
      ))}
      {custommodalImage && (
        <a href={externalsitelink}>
          <img src={accessCadillacMobileImage} alt='Cadillac' className={styles.d_None} />
        </a>
      )}
    </ul>
  );
};
