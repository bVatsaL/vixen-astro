import cn from 'classnames';
import { getExtraClasses } from '@utils/common.util';
import type { FC } from 'react';
import styles from './styles.module.scss';

export const SearchBarSkeleton: FC<{ className?: string }> = ({ className }) => {
  const extraClasses = getExtraClasses(styles, className);
  return (
    <div className={cn(styles.search_Contain, extraClasses)}>
      <span className={cn('skeleton_Box', styles.search_Input)} />
      <span className={cn('skeleton_Box', styles.search_Btn)} />
    </div>
  );
};
