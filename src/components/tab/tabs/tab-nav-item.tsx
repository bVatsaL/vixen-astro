import { getExtraClasses } from '@utils/common.util';
import cn from 'classnames';
import { type ReactElement } from 'react';
import styles from './styles.module.scss';
import { useRecoilValue } from 'recoil-ssr';
import { siteConfigAtom } from '@atoms/site.atom';
import { t3SendEvent } from '@utils/analytics.util';

interface ITabprops {
  id?: any;
  title?: string | ReactElement;
  activeTab?: number;
  setActiveTab?: any;
  className?: string;
  activeClassName?: string;
  handleTabClick?: any;
  style?: any;
  eventValue?: string;
  eventType?: string;
  eventLabel?: string;
}

const TabNavItem: React.FC<ITabprops> = (props) => {
  const { id, title, activeTab, setActiveTab, className, activeClassName, style, handleTabClick, eventValue, eventType, eventLabel } = props;
  const classNames = getExtraClasses(styles, className);
  const activeClassNames = getExtraClasses(styles, activeClassName);
  const siteConfig = useRecoilValue(siteConfigAtom);

  const handleClick = () => {
    if (siteConfig?.options?.siteTags?.includes('te-nissan')) {
      if (eventType === 'colorPicker') {
        t3SendEvent('TrackColorPicker', {
          interactionLabel: 'exterior',
          interactionValue: eventValue,
        });
      } else if (eventType === 'trackToggle') {
        t3SendEvent('TrackToggle', {
          interactionLabel: eventLabel,
          interactionValue: eventValue,
        });
      }
    }
    if (handleTabClick) {
      handleTabClick(id);
    } else {
      setActiveTab(id);
    }
  };

  return (
    <p
      onClick={handleClick}
      className={cn(classNames, styles.tab_btn, activeTab === id && [activeClassNames || styles.active])}
      style={style}
    >
      {title}
    </p>
  );
};

export default TabNavItem;
