import { Button } from '@components/button';
import cn from 'classnames';
import { getVDPUrl } from '@utils/inventory.util';
import { useModals } from '@hooks/useModal';
// import { Img } from '@components/img';
import styles from './compare_vehicle_table_card.module.scss';

interface ICompareVehiclesTableCard {
  className?: string;
  vehicleImage?: string;
  carDesc?: string;
  carTitle?: string;
  vin?: string;
  stock?: string;
  carDetails?: string;
}
export const CompareVehiclesTableCard: React.FC<ICompareVehiclesTableCard> = (props) => {
  const { className, vehicleImage, carTitle, carDesc, vin, stock, carDetails } = props;

  const [, closeModal] = useModals();
  const closeCompareModal = () => {
    closeModal('Compare_Vehicle_Modal');
  };
  return (
    <>
      <div className={cn(styles.compareVehicle_Wrap, className)}>
        <div className={styles.compareVehicle_Img}>
          <img src={vehicleImage ?? ''} alt='' />
        </div>
        <div className={styles.compareVehicle_Titles_Wrap}>
          <p className={styles.compareVehicle_Title}>{carTitle}</p>
          <p className={styles.compareVehicle_Subtitle}>{carDesc}</p>
          <div className={styles.compareVehicle_Details}>
            <span className={styles.compareVehicle_Details_Vin}>VIN: {vin}</span>
            <span className={styles.compareVehicle_Details_Stock}>STOCK: {stock}</span>
          </div>
        </div>
        <div className={styles.compareVehicle_Btn_Wrap}>
          <Button
            className={cn(styles.compareVehicle_Btn, 'btn-sm')}
            element='a'
            href={getVDPUrl(carDetails)}
            onClick={closeCompareModal}
          >
            VIEW THIS VEHICLE
          </Button>
        </div>
      </div>
    </>
  );
};

export default CompareVehiclesTableCard;
