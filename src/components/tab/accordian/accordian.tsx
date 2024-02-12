import React, { type ReactNode, useState } from 'react';
import cn from 'classnames';
import { getExtraClasses } from '@utils/common.util';
import styles from './accordian.module.scss';

interface IAccordian {
  items?: any;
  children?: ReactNode;
  className?: any;
}

const AccordianStatic: React.FC<IAccordian> = (props) => {
  const { items, children, className } = props;
  const [toggle, setToggle] = useState(false);

  const handleData = () => {
    setToggle(!toggle);
  };

  const classNames = getExtraClasses(styles, className);

  return (
    <>
      <p className={cn(classNames, styles.listing_Items, !!toggle && styles.active)} onClick={handleData}>
        {items}
      </p>
      {toggle && <p>{children}</p>}
    </>
  );
};

export default AccordianStatic;
