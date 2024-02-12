import cn from 'classnames';
import { getExtraClasses } from '@utils/common.util';
import { useState } from 'react';
import styles from './styles.module.scss';

type ButtonClickEventType =
  | React.MouseEvent<HTMLAnchorElement, MouseEvent>
  | React.MouseEvent<HTMLButtonElement, MouseEvent>;
interface IData {
  title?: string;
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
  activeClassName?: string;
  iconClassName?: string;
  defaultOpenState?: boolean;
  onClick?: (e: ButtonClickEventType) => any;
  secondTitle?: string;
  isToggle?: boolean;
}

const Accordion: React.FC<IData> = (props) => {
  const {
    title,
    children,
    className,
    contentClassName,
    titleClassName,
    activeClassName,
    iconClassName,
    defaultOpenState = false,
    secondTitle = '',
    isToggle = true,
  } = props;
  const [isOpen, setisOpen] = useState(defaultOpenState);
  const handleOpen = () => {
    setisOpen(!isOpen);
  };
  const extraClasses = getExtraClasses(styles, className);
  const titleExtraClasses = getExtraClasses(styles, titleClassName);
  const contentExtraClasses = getExtraClasses(styles, contentClassName);
  const activeClassNames = getExtraClasses(styles, activeClassName);
  const iconExtraClasses = getExtraClasses(styles, iconClassName);
  return (
    <div
      className={cn(styles.accordion_Item, extraClasses, { [styles.active]: isOpen }, { [activeClassNames]: isOpen })}
    >
      <div
        className={cn(styles.accordion_Title, titleExtraClasses)}
        onClick={isToggle ? handleOpen : undefined}
        role='button'
      >
        <p className={styles.accordion_Title_Text}>{title}</p>
        {!!secondTitle && <p className={styles.accordion_Title_Text}>{secondTitle}</p>}
        <span className={cn(styles.accordion_Icon, iconExtraClasses)} />
      </div>
      {isOpen && (
        <div className={cn(styles.accordion_Content, contentExtraClasses)} aria-hidden='true'>
          {children}
        </div>
      )}
    </div>
  );
};

export { Accordion };
