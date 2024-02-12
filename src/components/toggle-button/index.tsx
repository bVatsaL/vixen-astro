import cn from 'classnames';
import { getExtraClasses } from '@utils/common.util';
import styles from './style.module.scss';
import { useState } from 'react';
import { useCookies } from '@reactpwa/core';

interface IToggleSwitch {
  label1?: string;
  label2?: string;
  className?: string;
}

export const ToggleSwitch: React.FC<IToggleSwitch> = ({ label1, className, label2 }) => {
  const extraClasses = getExtraClasses(styles, className);
  const [cookies, setCookie, removeCookie] = useCookies(['googtrans']);
  const [label, setLabel] = useState(label2);
  const getDomain = (u: any, s?: any) => {
    let url = u;
    let subdomain = s;
    subdomain = subdomain || false;
    url = url?.replace(/(https?:\/\/)?(www.)?/i, '');
    if (!subdomain) {
      url = url.split('.');
      url = url.slice(url.length - 2).join('.');
    }
    if (url.indexOf('/') !== -1) {
      return url.split('/')[0];
    }
    return url;
  };
  const handleLangChange = () => {
    if (cookies?.googtrans === `/en/${label1?.toLowerCase()}`) {
      removeCookie('googtrans', { path: '/' });
      removeCookie('googtrans', { path: '/', domain: getDomain(window.location.hostname) });
      setLabel(label2);
      window.location.reload();
    } else {
      setCookie('googtrans', `/en/${label1?.toLowerCase()}`, { path: '/' });
      setLabel(label1);
    }
  };
  return (
    <label className={cn(styles.toggle, extraClasses)} htmlFor='lang-radio'>
      {label === label2 && <span className={cn(styles.toggle_Label, 'notranslate')}>{label1}</span>}
      <input
        className={styles.toggle_Checkbox}
        id='lang-radio'
        type='checkbox'
        checked={label === label1}
        onChange={handleLangChange}
      />
      <div className={styles.toggle_Switch} />
      {label === label1 && <span className={cn(styles.toggle_Label, 'notranslate')}>{label2}</span>}
    </label>
  );
};
