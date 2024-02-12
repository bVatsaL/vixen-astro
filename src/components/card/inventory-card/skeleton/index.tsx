import cn from 'classnames';
import { getExtraClasses } from '@utils/common.util';
import { type FC } from 'react';
import styles from './styles.module.scss';

export const InventoryCardSkeleton: FC<{ className?: string }> = ({ className }) => {
  const extraClasses = getExtraClasses(styles, className);
  return (
    <div className={cn(styles.inventory_Card, extraClasses)}>
      <div className={cn('skeleton_Box', styles.card_Img)} />
      <div className={cn('skeleton_Box', styles.card_Title)} />
      <div className={cn('skeleton_Box', styles.card_Text)} />
      <div className={cn('skeleton_Box', styles.card_Price)} />
    </div>
  );
};
