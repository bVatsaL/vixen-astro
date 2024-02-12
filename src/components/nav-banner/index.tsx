import {
  customNavBannerAtom,
  customNavBannerPosition,
  customNavBannerUrlAtom,
  navBannerBgColorAtom,
  navBannerFontColorAtom,
  navBannerTextAtom,
} from 'src/stores/settings.atom';
import { siteNameAtom } from 'src/stores/site.atom';
import { Img } from '@components/img';
import { Link } from '@components/link';
import cn from 'classnames';
import { type FC } from 'react';
import { useRecoilValue } from 'recoil-ssr';
import style from './styles.module.scss';
import { useLocation } from 'react-router-dom';

const NavBannerV1: FC = () => {
  const navBannerImg = useRecoilValue(customNavBannerAtom);
  const navBannerUrl = useRecoilValue(customNavBannerUrlAtom);
  const navBannerText = useRecoilValue(navBannerTextAtom);
  const navBannerBgColor = useRecoilValue(navBannerBgColorAtom);
  const navBannerFontColor = useRecoilValue(navBannerFontColorAtom);
  const navBannerPosition = useRecoilValue(customNavBannerPosition);
  const siteName = useRecoilValue(siteNameAtom);
  const { pathname } = useLocation();
  if (navBannerPosition?.toLowerCase() === 'none') {
    return null;
  }
  return (
    <>
      {!!navBannerText && (
        <Link to={navBannerUrl ?? pathname}>
          <div className={cn(style.nav_Text_Banner, 'w_100')} style={{ backgroundColor: navBannerBgColor }}>
            <span style={{ color: navBannerFontColor }}>{navBannerText}</span>
          </div>
        </Link>
      )}
      {!!navBannerImg && (
        <Link to={navBannerUrl ?? pathname}>
          <Img className='w_100' alt={siteName} src={navBannerImg} />
        </Link>
      )}
    </>
  );
};

export default NavBannerV1;
