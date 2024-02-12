import cn from 'classnames';
import { getExtraClasses } from '@utils/common.util';
import { Img } from '@components/img';
import { Tooltip } from '@components/tool-tip';
import styles from './styles.module.scss';
import { useRecoilValue } from 'recoil-ssr';
import { showFourKeyFeaturesAtom } from 'src/stores/srp-filters.atom';

export type PriorityOptions = {
  description?: string;
  imageUrl?: string;
};

interface ISocialIconsProps {
  className?: string;
  containerClassName?: string;
  featurelable?: string;
  KeyfeatureData?: PriorityOptions[];
  hideTitle?: boolean;
  customImage?: boolean;
}
export const KeyFeatures: React.FC<ISocialIconsProps> = (props) => {
  const { className, KeyfeatureData, containerClassName, hideTitle = false, customImage = false } = props;
  const extraClasses = getExtraClasses(styles, className);
  const showFourKeyFeatures = useRecoilValue(showFourKeyFeaturesAtom);

  const parentClassExtraClasses = getExtraClasses(styles, containerClassName);

  if (!KeyfeatureData?.length) {
    return null;
  }

  return (
    <div className={cn(styles.keyfeature_container, parentClassExtraClasses)}>
      {!hideTitle && <span className={cn(styles.key_featurestitle, extraClasses)}>Key Features </span>}
      <ul className={cn(styles.keyfeature_Items_List, extraClasses)}>
        {KeyfeatureData?.slice(0, showFourKeyFeatures).map((s: PriorityOptions, index: number) => (
          <li key={index} className={cn(styles.keyfeature_Item, customImage && styles.gray_Img)}>
            <Tooltip position='top' content={s.description ?? ''} contentClassName={styles.content_Wid}>
              <Img src={s?.imageUrl ?? ''} alt='' />
            </Tooltip>
          </li>
        ))}
      </ul>
    </div>
  );
};

