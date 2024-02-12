import cn from 'classnames';
import { getExtraClasses } from '@utils/common.util';
import { Img } from '@components/img';
import { Link } from '@components/link';
import { Button } from '@components/button';
import styles from './styles.module.scss';
import { siteNameAtom } from '@atoms/site.atom';
import { useRecoilValue } from 'recoil-ssr';

interface IInventoryCard {
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
  showInventoryLink?: boolean;
  startingPriceClassName?: string;
  t?: (key?: string) => string;
  showPriceLabel?: string;
}

export const InventoryCard: React.FC<IInventoryCard> = (props) => {
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
    showInventoryLink = false,
    startingPriceClassName,
    showPriceLabel,
    t,
  } = props;
  const extraClasses = getExtraClasses(styles, className);
  const titleExtraClasses = getExtraClasses(styles, titleClassName);
  const stockextraclasses = getExtraClasses(styles, stockClassName);
  const vehicleStockTitle: Record<string, string> = {
    'Wolfe Cadillac Calgary': 'View Inventory',
    'Wolfe Chevrolet GMC Buick Calgary': 'View Inventory',
  };
  const siteName = useRecoilValue(siteNameAtom);

  let finalSiteTitle = 'In Stock';
  const titleFinder = () => {
    finalSiteTitle = (vehicleStockTitle?.[siteName] ?? finalSiteTitle) || finalSiteTitle;
  };
  titleFinder();

  return (
    <>
      <Link to={url ?? ''} className={cn(styles.card, extraClasses)}>
        {!!image && <Img className={styles.card_Img} src={image} alt={title} maxWidth={1200} />}
        <p className={cn(styles.card_Title, titleExtraClasses, 'card_Title')}>
          {title} <span>{showWithTitle && stock && `(${stock})`}</span>{' '}
        </p>
        {!!subTitle && <p className={cn(styles.card_Sub_Title)}> {subTitle} </p>}
        {!!displayPrice && !!startingPrice && (
          <p
            className={cn(styles.card_Price, styles.starting_Price, {
              [styles.request_Now]: startingPrice === 'Request Now',
            },startingPriceClassName)}
          >
            {showPriceLabel && <span>{showPriceLabel}</span>}
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
        {showExtraBtn && <span className={extraBtnClassName}>{extraBtnTitle}</span>}
      </Link>
      {!!showInventoryLink && (
        <Button element='a' href={url ?? ''} className={cn(styles.link_Btn, 'btn-link')}>
          View Inventory{' >'}
        </Button>
      )}
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
    </>
  );
};
