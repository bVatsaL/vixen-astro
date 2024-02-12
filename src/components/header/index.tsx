// import HudsonHeader from '../header/header.tsx';
import { $settings } from '@atoms/settings';
import { $siteConfig } from '@atoms/site-config';
import { HeaderSkeleton } from '@components/skeletons/header.skeleton.tsx';
import { useStore } from '@nanostores/react';

const Header = () => {
  const siteConfig = useStore($siteConfig);
  const settings = useStore($settings);

  return (
    <>
      <HeaderSkeleton />
      {/* <HudsonHeader /> */}
    </>
  );
};

export default Header;
