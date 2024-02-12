import cn from 'classnames';
import { getExtraClasses } from '@utils/common.util';
import { Img } from '@components/img';
import { Link } from '@components/link';
import { Button } from '@components/button';
import styles from './styles.module.scss';
import { siteNameAtom } from '@atoms/site.atom';
import { useRecoilValue } from 'recoil-ssr';

interface IFullHeightTwoColumnInventoryCard {
  className?: string;
  title?: string;
  image?: string;
  startingPrice?: string;
  url?: string;
  stock?: number | string;
  showStock?: boolean;
  showWithTitle?: boolean;
  titleClassName?: string;
  displayBtn?: boolean;
  displayPrice?: boolean;
  stockClassName?: string;
  specialStock?: string;
  subTitle?: string;
  productPageUrl?: string;
  showProductLinks?: boolean;
  hideDefaultStockLayout?: boolean;
  showExtraBtn?: boolean;
  extraBtnClassName?: string;
  extraBtnTitle?: string;
  viewInventoryBtnText?: string;
  exploreVehicleBtnText?: string;
  t?: (key?: string) => string;
  contentBackgroundColor?: string;
  vehicleCategory?: string;
  showVehicleCategory?: boolean;
}

export const FullHeightTwoColumnInventoryCard: React.FC<IFullHeightTwoColumnInventoryCard> = (props) => {
  const {
    title,
    image,
    startingPrice,
    url,
    stock,
    className,
    showStock = true,
    showWithTitle = false,
    titleClassName,
    displayBtn = false,
    displayPrice = true,
    stockClassName,
    specialStock,
    subTitle,
    productPageUrl,
    showProductLinks,
    hideDefaultStockLayout = true,
    showExtraBtn = false,
    extraBtnClassName,
    extraBtnTitle,
    viewInventoryBtnText = 'View Inventory',
    exploreVehicleBtnText = 'Explore',
    contentBackgroundColor = 'grey',
    vehicleCategory = '',
    showVehicleCategory = true,
    t,
  } = props;
  const extraClasses = getExtraClasses(styles, className);
  const titleExtraClasses = getExtraClasses(styles, titleClassName);
  const stockextraclasses = getExtraClasses(styles, stockClassName);
  const vehicle_Stock_title = {
    customTitle: {
      sites: {
        siteNameAndTitle: [['Wolfe Cadillac Calgary', 'View Inventory']],
      },
    },
  };
  const siteName = useRecoilValue(siteNameAtom);

  const customeTitleSiteName = vehicle_Stock_title.customTitle.sites.siteNameAndTitle.length;
  const siteTitleArr = vehicle_Stock_title.customTitle.sites.siteNameAndTitle;
  let finalSiteTitle = 'In Stock';
  const titleFinder = () => {
    for (let i = 0; i < customeTitleSiteName; i++) {
      if (siteName === siteTitleArr[i][0]) {
        finalSiteTitle = siteTitleArr[i][1];
      }
    }
  };
  titleFinder();

  return (
    <>
      <Link to={url ?? ''} className={cn(styles.card, styles.full_Height_Img_Left_Content_Right, extraClasses)}>
        <div className={styles.card_Img_Column}>
          {!!image && <Img className={styles.card_Img} src={image} alt={title} maxWidth={800} />}
        </div>
        <div
          className={styles.card_Content_Column}
          style={{
            backgroundColor: `${contentBackgroundColor}`,
          }}
        >
          {showVehicleCategory && <span className={styles.card_Category}>{vehicleCategory}</span>}
          <span className={cn(styles.card_Title, titleExtraClasses, 'card_Title')}>
            {title} <span>{showWithTitle && stock && `(${stock})`}</span>{' '}
          </span>
          {!!subTitle && <span className={cn(styles.card_Sub_Title)}> {subTitle} </span>}
          <div className={styles.card_Content_Bottom}>
            {!!displayPrice && !!startingPrice && (
              <p
                className={cn(styles.card_Price, styles.starting_Price, {
                  [styles.request_Now]: startingPrice === 'Request Now',
                })}
              >
                {startingPrice}
              </p>
            )}
            {typeof stock === 'number' ? (
              <>
                {showStock && !showWithTitle && (
                  <>
                    {hideDefaultStockLayout ? (
                      <p className={cn(styles.card_Stock, stockextraclasses)}>
                        {t?.(finalSiteTitle) ?? finalSiteTitle}: <strong>({stock})</strong>
                      </p>
                    ) : (
                      <p className={cn(styles.card_Stock, stockextraclasses)}>
                        <strong>{stock} In Stock!</strong>
                      </p>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                <p className={cn(styles.card_Stock, stockextraclasses)}>{stock}</p>
                {specialStock && <p className={cn(styles.card_Stock)}>{specialStock}</p>}
              </>
            )}
          </div>
          {showExtraBtn && <span className={extraBtnClassName}>{extraBtnTitle}</span>}
          {!!displayBtn && (
            <div className={cn(styles.btn_Section, 'btn_Section')}>
              <Button element='a' href={url ?? ''} className={styles.btn_Md}>
                {viewInventoryBtnText}
              </Button>
              <Button
                element='a'
                href={url ?? ''}
                className={cn(styles.btn_Md, styles.outline_Dark_Gray, 'btn-outline-gray')}
              >
                {exploreVehicleBtnText} {title}
              </Button>
            </div>
          )}
          {showProductLinks && (
            <Link to={productPageUrl ?? ''} className={styles.product_Info} target='_blank'>
              Product Information
            </Link>
          )}
        </div>
      </Link>
    </>
  );
};
