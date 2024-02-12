import cn from 'classnames';
import { getExtraClasses } from '@utils/common.util';
import { Img } from '@components/img';
import { Link } from '@components/link';
import { Button } from '@components/button';
import styles from './styles.module.scss';

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
  startingPriceClassName?: string;
}

export const TwoColumnInventoryCard: React.FC<IInventoryCard> = (props) => {
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
    startingPriceClassName
  } = props;
  const extraClasses = getExtraClasses(styles, className);
  const titleExtraClasses = getExtraClasses(styles, titleClassName);
  const stockextraclasses = getExtraClasses(styles, stockClassName);
  return (
    <>
      <Link to={url ?? ''} className={cn(styles.card, styles.card_Two_Column, extraClasses)}>
        {!!image && <Img className={styles.card_Img} src={image} alt={title} maxWidth={800} />}
        <div className={styles.card_Info_Wrap}>
          <p className={cn(styles.card_Title, titleExtraClasses, 'card_Title')}>
            {title} {showWithTitle && stock && <span>({stock})</span>}{' '}
          </p>
          {!!subTitle && <p className={cn(styles.card_Sub_Title)}> {subTitle} </p>}
          {!!displayPrice && !!startingPrice && <p className={cn(styles.card_Price,startingPriceClassName)}>{startingPrice}</p>}
          {typeof stock === 'number' ? (
            <>{showStock && !showWithTitle && <p className={cn(styles.card_Stock, stockextraclasses)}> ({stock})</p>}</>
          ) : (
            <>
              <p className={cn(styles.card_Stock, stockextraclasses)}>{stock}</p>
              {specialStock && <p className={cn(styles.card_Stock)}>{specialStock}</p>}
            </>
          )}
        </div>
      </Link>
      {!!displayBtn && (
        <div className={cn(styles.btn_Section, 'btn_Section')}>
          <Button element='a' href={url ?? ''} className={styles.btn_Md}>
            View Inventory
          </Button>
          <Button
            element='a'
            href={url ?? ''}
            className={cn(styles.btn_Md, styles.outline_Dark_Gray, 'btn-outline-gray')}
          >
            Explore {title}
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
