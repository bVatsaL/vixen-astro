import { useState } from 'react';
import cn from 'classnames';
import { useRecoilValue } from 'recoil-ssr';
import { explorevehcilesDataAtom } from 'src/stores/global-settings.atom';
import TabContent from './tab-content';
import TabNavItem from './tab-nav-item';
import { ExploreAllVehicleSliderTabs } from './exploreVehiclesTab';
import styles from './styles.module.scss';

export const ExploreVehcilesData = ({ sliderClassName, paginationDots = false }: any) => {
  const [activeTab, setActiveTab] = useState(0);
  const vehicles = useRecoilValue(explorevehcilesDataAtom);

  return (
    <div className={cn(styles.explore_Vehicles_Slider)}>
      <div className={cn(styles.vehicleTab)}>
        {vehicles?.map((i: any, index: number) => (
          <TabNavItem
            title={<img src={i['cat-logo']} /> ?? ''}
            key={index}
            id={index}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            className={cn(styles.chevImgWidth, 'tabTitle')}
          />
        ))}
      </div>
      <div className={cn(styles.tabContent)}>
        {vehicles?.map((vh: any, index: number) => (
          <TabContent id={index} key={index} activeTab={activeTab}>
            <ExploreAllVehicleSliderTabs
              vehicles={vh?.type ?? []}
              sliderClassName={sliderClassName}
              paginationDots={paginationDots}
            />
          </TabContent>
        ))}
      </div>
    </div>
  );
};
