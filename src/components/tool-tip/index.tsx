import cn from 'classnames';
import { getExtraClasses } from '@utils/common.util';
import styles from './style.module.scss';

interface ITooltip {
  content?: string;
  position?: string;
  children?: any;
  className?: string;
  contentClassName?: string;
}

export const Tooltip: React.FC<ITooltip> = ({ content, position, children, className, contentClassName }) => {
  const extraClasses = getExtraClasses(styles, className);
  return (
    <span className={cn(styles.toolTip, { [extraClasses]: extraClasses })} data-position={position}>
      <span
        className={cn(styles.tooltip_Content, contentClassName)}
        dangerouslySetInnerHTML={{ __html: content ?? '' }}
      />
      {children}
    </span>
  );
};
