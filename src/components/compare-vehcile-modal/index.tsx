import { RegisterModal } from '@components/modal/register';
import React from 'react';
import cn from 'classnames';
import { isValidVin } from '@components/compare-vehicles';
import { Img } from '@components/img';
import { useRecoilValue } from 'recoil-ssr';
import { favoriteVehiclesAtom } from 'src/stores/search.atom';
import { CompareVehiclesTableCard } from './compare_vehicle_table_card';
import check from './images/check.svg';

import style from './styles.module.scss';
import { HighlightsData } from './data';

export const CompareVehcileModalProps = () => {
  const favVehicles = useRecoilValue(favoriteVehiclesAtom);
  const vehcileVinNumbe = Object?.entries?.(localStorage)?.filter((v) => v) ?? [];
  const selectedVehicles =
    vehcileVinNumbe
      ?.filter((v) => isValidVin(v?.[0]) && favVehicles.includes(v?.[0]))
      .map((veh) => JSON.parse(veh?.[1])) ?? [];
  return (
    <>
      <h4 className='h3 text_Align_Center mb_1'>Compare</h4>
      <div className={cn(style.container_Wrap)}>
        <div className={cn(style.container)}>
          <div className={cn(style.compareVehicles_Items_Header, 'columns is_mobile is_tablet')}>
            <div className='column is_2 spacer' />
            {selectedVehicles?.map((i, index) => (
              <div className='column' key={index}>
                <CompareVehiclesTableCard
                  vehicleImage={i?.imagelist?.[0]?.url}
                  vin={i?.vin}
                  carTitle={i?.carTitle}
                  carDesc={i?.carDescription}
                  carDetails={i}
                  stock={i?.stock}
                />
              </div>
            ))}
          </div>

          <div className={style.compareVehicles_Content_Wrap}>
            <div className={style.compareVehicles_Items_Wrap}>
              <div className={cn(style.compareVehicle_Item, 'columns is_mobile is_tablet')}>
                <div className={cn(style.compareVehicle_Item_Title, 'column is_2')}>MSRP</div>
                <div className={cn(style.compareVehicle_Item_Values_Wrap, 'column')}>
                  <div className={cn(style.compareVehicle_Item_Values, 'columns is_mobile is_tablet')}>
                    {selectedVehicles?.map((i) => (
                      <div className={cn('column', style.compareVehicle_Item_Value, style.compareItem_Best)}>
                        <span className={style.currency}>$</span>
                        {i?.display_price?.toLocaleString?.()}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={cn(style.compareVehicle_Item, 'columns is_mobile is_tablet')}>
                <div className={cn(style.compareVehicle_Item_Title, 'column is_2')}>Sale Price</div>
                <div className={cn(style.compareVehicle_Item_Values_Wrap, 'column')}>
                  <div className={cn(style.compareVehicle_Item_Values, 'columns is_mobile is_tablet')}>
                    {selectedVehicles?.map((i, index) => (
                      <div
                        className={cn('column', style.compareVehicle_Item_Value, style.compareItem_Best)}
                        key={index}
                      >
                        <span className={style.currency}>$</span>
                        {i?.display_price.toLocaleString()}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={cn(style.compareVehicle_Item, 'columns is_mobile is_tablet')}>
                <div className={cn(style.compareVehicle_Item_Title, 'column is_2')}>City MPG</div>
                <div className={cn(style.compareVehicle_Item_Values_Wrap, 'column')}>
                  <div className={cn(style.compareVehicle_Item_Values, 'columns is_mobile is_tablet')}>
                    {selectedVehicles?.map((i, index) => (
                      <div
                        className={cn('column', style.compareVehicle_Item_Value, style.compareItem_Best)}
                        key={index}
                      >
                        {i?.epacity}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={cn(style.compareVehicle_Item, 'columns is_mobile is_tablet')}>
                <div className={cn(style.compareVehicle_Item_Title, 'column is_2')}>Highway MPG</div>
                <div className={cn(style.compareVehicle_Item_Values_Wrap, 'column')}>
                  <div className={cn(style.compareVehicle_Item_Values, 'columns is_mobile is_tablet')}>
                    {selectedVehicles?.map((i, index) => (
                      <div
                        className={cn('column', style.compareVehicle_Item_Value, style.compareItem_Best)}
                        key={index}
                      >
                        {i?.epahighway}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={cn(style.compareVehicle_Item, 'columns is_mobile is_tablet')}>
                <div className={cn(style.compareVehicle_Item_Title, 'column is_2')}>Engine</div>
                <div className={cn(style.compareVehicle_Item_Values_Wrap, 'column')}>
                  <div className={cn(style.compareVehicle_Item_Values, 'columns is_mobile is_tablet')}>
                    {selectedVehicles?.map((i, index) => (
                      <div
                        className={cn('column', style.compareVehicle_Item_Value, style.compareItem_Best)}
                        key={index}
                      >
                        {i?.engdescription}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={cn(style.compareVehicle_Item, 'columns is_mobile is_tablet')}>
                <div className={cn(style.compareVehicle_Item_Title, 'column is_2')}>Transmission</div>
                <div className={cn(style.compareVehicle_Item_Values_Wrap, 'column')}>
                  <div className={cn(style.compareVehicle_Item_Values, 'columns is_mobile is_tablet')}>
                    {selectedVehicles?.map((i, index) => (
                      <div
                        className={cn('column', style.compareVehicle_Item_Value, style.compareItem_Best)}
                        key={index}
                      >
                        {i?.trans}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={cn(style.compareVehicle_Item, 'columns is_mobile is_tablet')}>
                <div className={cn(style.compareVehicle_Item_Title, 'column is_2')}>Drivetrain</div>
                <div className={cn(style.compareVehicle_Item_Values_Wrap, 'column')}>
                  <div className={cn(style.compareVehicle_Item_Values, 'columns is_mobile is_tablet')}>
                    {selectedVehicles?.map((i, index) => (
                      <div
                        className={cn('column', style.compareVehicle_Item_Value, style.compareItem_Best)}
                        key={index}
                      >
                        {i?.drivetrain}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={cn(style.compareVehicle_Item, 'columns is_mobile is_tablet')}>
                <div className={cn(style.compareVehicle_Item_Title, 'column is_2')}>Exterior Color</div>
                <div className={cn(style.compareVehicle_Item_Values_Wrap, 'column')}>
                  <div className={cn(style.compareVehicle_Item_Values, 'columns is_mobile is_tablet')}>
                    {selectedVehicles?.map((i, index) => (
                      <div
                        className={cn('column', style.compareVehicle_Item_Value, style.compareItem_Best)}
                        key={index}
                      >
                        {i?.extcolor}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={cn(style.compareVehicle_Item, 'columns is_mobile is_tablet')}>
                <div className={cn(style.compareVehicle_Item_Title, 'column is_2')}>Interior Color</div>
                <div className={cn(style.compareVehicle_Item_Values_Wrap, 'column')}>
                  <div className={cn(style.compareVehicle_Item_Values, 'columns is_mobile is_tablet')}>
                    {selectedVehicles?.map((i, index) => (
                      <div
                        className={cn('column', style.compareVehicle_Item_Value, style.compareItem_Best)}
                        key={index}
                      >
                        {i?.intcolor?.length ? i?.intcolor : 'Not Available'}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={style.compareVehicles_Items_Priority_Options_Wrap}>
              <div className={style.compareVehicles_Items_Priority_Options_Title}>Highlights</div>
              <div className={style.compareVehicles_Items_Wrap}>
                {HighlightsData?.map((ix, id) => (
                  <div className={cn(style.compareVehicle_Item, 'columns is_mobile is_tablet')} key={id}>
                    <div className={cn(style.compareVehicle_Item_Title, 'column is_2')}>{ix?.label}</div>
                    <div className={cn(style.compareVehicle_Item_Values_Wrap, 'column')}>
                      <div className={cn(style.compareVehicle_Item_Values, 'columns is_mobile is_tablet')}>
                        {selectedVehicles?.map((i, idx) => {
                          const index = i?.priority_options?.map((o: any) => o?.description)?.indexOf?.(ix.key) ?? -1;
                          return (
                            <div key={idx} className={cn(style.compareVehicle_Item_Value, 'column')}>
                              {index > -1 ? <Img className={style.checkbox_Item} src={check} alt='' /> : ''}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const ComapreVehiclesModal = () => (
  <RegisterModal id='Compare_Vehicle_Modal'>
    <CompareVehcileModalProps />
  </RegisterModal>
);
