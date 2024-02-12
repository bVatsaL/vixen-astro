import cn from 'classnames';
import { Link } from '@components/link';
import { type CSSProperties, forwardRef, type MouseEventHandler } from 'react';
import { getExtraClasses } from '@utils/common.util';
import styles from './styles.module.scss';

type ButtonClickEventType =
  | React.MouseEvent<HTMLAnchorElement, MouseEvent>
  | React.MouseEvent<HTMLButtonElement, MouseEvent>;
interface ICustomButtonProps extends React.HTMLProps<HTMLButtonElement> {
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  className?: string;
  element?: 'a' | 'button';
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  targetSelf?: boolean;
  removeHttps?: boolean;
  children?: React.ReactNode;
  ref?: any;
  style?: CSSProperties | undefined;
}

interface ICustomAnchorProps extends React.HTMLProps<HTMLAnchorElement> {
  onClick?: (e: ButtonClickEventType) => any;
  className?: string;
  element?: 'a' | 'button';
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  removeHttps?: boolean;
  btnId?: string;
  targetSelf?: boolean;
  children?: React.ReactNode;
  ref?: any;
  style?: CSSProperties | undefined;
}

const Button = forwardRef<ICustomAnchorProps, ICustomButtonProps>(
  (
    {
      children,
      onClick,
      className,
      element,
      href,
      type = 'button',
      disabled = false,
      targetSelf = true,
      removeHttps = true,
      style,
      ...otherProps
    },
    ref,
  ) => {
    const extraClasses = getExtraClasses(styles, className);
    const handleOnClick: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = (e) => {
      if (typeof onClick === 'function') {
        onClick(e);
      }
    };

    if (element === 'a') {
      return (
        // @ts-ignore
        <Link
          {...(otherProps as React.HTMLProps<HTMLAnchorElement>)}
          className={cn(styles.btn, extraClasses)}
          to={href ?? ''}
          onClick={handleOnClick}
          target={!targetSelf ? '_blank' : '_self'}
          removeHttps={removeHttps}
          style={style}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        // @ts-ignore
        ref={ref}
        {...(otherProps as React.HTMLProps<HTMLButtonElement>)}
        disabled={disabled}
        type={type}
        onClick={handleOnClick}
        className={cn(styles.btn, extraClasses)}
        style={style}
      >
        {children}
      </button>
    );
  },
);

export { Button };
