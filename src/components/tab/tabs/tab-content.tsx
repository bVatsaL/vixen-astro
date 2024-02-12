import React, { type ReactNode } from 'react';
import { getExtraClasses } from '@utils/common.util';
import cn from 'classnames';
import styles from './styles.module.scss';

interface ITabProps {
  id?: any;
  activeTab?: any;
  children?: ReactNode;
  className?: any;
  activeTabClassName?: string;
}

const TabContent: React.FC<ITabProps> = (props: any) => {
  const { id, activeTab, children, className, activeTabClassName } = props;
  const classNames = getExtraClasses(styles, className);
  const activeTabClassNames = getExtraClasses(styles, activeTabClassName);

  return (
    <div
      className={cn(classNames, styles.custom_Tab, {
        [activeTabClassNames || styles.open]: activeTab === id,
      })}
    >
      {children}
    </div>
  );
};

export default TabContent;
