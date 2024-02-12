/* eslint-disable max-len */
import { Link } from '@components/link';
import { type SearchResultItem } from '@typedefs/search';
import { getVDPUrl } from '@utils/inventory.util';
import { type FC } from 'react';
import { KeyFeatures, type PriorityOptions } from '@components/key-features';
import { Button } from '@components/button';
import style from './style.module.scss';

interface VehicleResultItem {
  carTitle?: string;
  vin?: string;
  stock?: number;
  handleChange?: any;
  removeItem?: any;
  disabled?: any;
  imagelist?: string;
  vehicleImage?: boolean;
  carDetails?: SearchResultItem;
  price?: number;
  KeyfeatureData?: PriorityOptions[];
}

const InventoryVehicleData: FC<VehicleResultItem> = (props) => {
  const {
    carTitle,
    vin,
    stock,
    handleChange,
    removeItem,
    disabled,
    imagelist,
    vehicleImage,
    carDetails,
    KeyfeatureData,
    price,
  } = props;

  return (
    <div className={style.vehicles_Data_Wrapper}>
      <input type='checkbox' className={style.input_Wid} onClick={handleChange} disabled={disabled} />
      <div className={style.favorite_Items}>
        <div className={style.image_Wrapper}>
          <Link to={getVDPUrl(carDetails)} className={style.spr_Link}>
            {vehicleImage ? <img src={imagelist} alt='' /> : 'Image Coming Soon'}
          </Link>
        </div>
        <div className={style.vehicle_Details}>
          <h5 className={style.car_Title}>{carTitle}</h5>
          <div className={style.price_Section}>
            <span className={style.price_Title}>MSRP</span>
            <span className={style.cars_Price}>$ {price?.toLocaleString()}</span>
          </div>
          <div className={style.vin_Section}>
            <span>VIN: {vin}</span>
            <span>STOCK: {stock}</span>
          </div>
          <KeyFeatures hideTitle KeyfeatureData={KeyfeatureData} />
        </div>
      </div>
      <Button className='btn_No_Style' onClick={removeItem}>
        <svg fill='#000000' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24px' height='24px'>
          <path d='M 10.3125 -0.03125 C 8.589844 -0.03125 7.164063 1.316406 7 3 L 2 3 L 2 5 L 6.96875 5 L 6.96875 5.03125 L 17.03125 5.03125 L 17.03125 5 L 22 5 L 22 3 L 17 3 C 16.84375 1.316406 15.484375 -0.03125 13.8125 -0.03125 Z M 10.3125 2.03125 L 13.8125 2.03125 C 14.320313 2.03125 14.695313 2.429688 14.84375 2.96875 L 9.15625 2.96875 C 9.296875 2.429688 9.6875 2.03125 10.3125 2.03125 Z M 4 6 L 4 22.5 C 4 23.300781 4.699219 24 5.5 24 L 18.59375 24 C 19.394531 24 20.09375 23.300781 20.09375 22.5 L 20.09375 6 Z M 7 9 L 8 9 L 8 22 L 7 22 Z M 10 9 L 11 9 L 11 22 L 10 22 Z M 13 9 L 14 9 L 14 22 L 13 22 Z M 16 9 L 17 9 L 17 22 L 16 22 Z' />
        </svg>
      </Button>
    </div>
  );
};

export default InventoryVehicleData;
