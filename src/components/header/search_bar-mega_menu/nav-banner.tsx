import cn from 'classnames';
import styles from './styles.module.scss';
import { Link } from '@components/link';

interface INavBanner {
  navBannerClass?: string;
  navBannerText?: string;
  navBannerUrl?: any;
}

export const NavBanner: React.FC<INavBanner> = ({ navBannerClass, navBannerUrl, navBannerText }) => {
  return (
    <div className={cn(styles.nav_Banner, navBannerClass)}>
      <Link to={navBannerUrl} className={styles.nav_Banner_Link}>
        {navBannerText}
      </Link>
    </div>
  );
};
