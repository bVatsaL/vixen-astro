import cn from 'classnames';
import { VehicleSlider } from '@components/slider/vehicle-slider';
import { type FC } from 'react';
import { SwiperSlide } from 'swiper/react';
import { CarTabs } from '@components/tabs/carstabs';
import styles from './styles.module.scss';
import { type Vehicle } from '@typedefs/vehicle';

interface IExploreAllVehicleSliderTabs {
  vehicles?: Vehicle[];
  sliderClassName?: string;
  paginationDots?: boolean;
}

export const ExploreAllVehicleSliderTabs: FC<IExploreAllVehicleSliderTabs> = ({
  vehicles,
  sliderClassName,
  paginationDots = false,
}) => {
  const title = vehicles?.map((v: any) => v.makesub);

  const pagination = {
    clickable: true,
    renderBullet(index: number, className: string) {
      return `<span class="${className}">${title?.[index]}</span>`;
    },
  };
  return (
    <>
      <section className={cn('container container-fluid', styles.new_vehicles_Section)}>
        <VehicleSlider
          pagination={pagination}
          className={cn('custom-paging', sliderClassName)}
          //@ts-ignore
          slides={(Slide: typeof SwiperSlide) =>
            vehicles?.map((value: any, i: number) => {
              if (!value?.details) return null;
              return (
                <Slide key={i}>
                  <CarTabs paginationDots={paginationDots} items={value.details} />
                </Slide>
              );
            })
          }
        />
      </section>
    </>
  );
};
