import cn from 'classnames';
import { getExtraClasses } from '@utils/common.util';
import { Img } from '@components/img';
import styles from './styles.module.scss';

interface IManufacturerInfo {
  className?: string;
  title?: string;
  image?: string;
  url?: string;
  titleClassName?: string;
}

export const ManufacturerInfo: React.FC<IManufacturerInfo> = (props) => {
  const { title = '', image = '', url = '', className, titleClassName } = props;
  const extraClasses = getExtraClasses(styles, className);
  const titleExtraClasses = getExtraClasses(styles, titleClassName);

  return (
    <div className={cn(styles.manufacturer_Info_Wrap, extraClasses)}>
      <a href={url} target='_blank' rel='noopener noreferrer' className={styles.manufacturer_Info_Url}>
        {!!image && <Img className={styles.manufacturer_Info_Img} src={image} alt={title} maxWidth={600} />}
        <span className={cn(styles.manufacturer_Info_Title, titleExtraClasses, 'card_Title')}>{title}</span>
      </a>
    </div>
  );
};
