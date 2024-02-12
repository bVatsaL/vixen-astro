import { Button } from '@components/button';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil-ssr';
import { favoriteVehiclesAtom, selectVehcileAtom } from 'src/stores/search.atom';
import { Link } from '@components/link';
import { type SearchResultItem } from '@typedefs/search';
import { useLocation } from 'react-router-dom';
import { useModals } from '@hooks/useModal';
import { ComapreVehiclesModal } from '@components/compare-vehcile-modal';
import cn from 'classnames';
import { getExtraClasses } from '@utils/common.util';
import InventoryVehicleData from './inventory-vehicle-details';
import styles from './styles.module.scss';

export const isValidVin = (vin: string) => /[A-Z0-9]{16,17}/.test(vin);
export const isSsr = typeof window === 'undefined';
interface ICompareVehicles {
  btnClassName?: string;
}
export const CompareVehicles: React.FC<ICompareVehicles> = (props) => {
  // const CompareVehicles = () => {
  const { btnClassName } = props;
  const [sidebar, setSidebar] = useState(false);
  const [selectVehicles, setSelectVehicles] = useRecoilState(selectVehcileAtom);
  const [favVeh, setFavVeh] = useRecoilState(favoriteVehiclesAtom);
  const [del, setdel] = useState(false);
  const btnClasses = getExtraClasses(styles, btnClassName);
  useEffect(() => {
    if (!isSsr) {
      const vehcileVinNumbe = Object?.keys?.(localStorage)?.filter((v) => isValidVin(v)) ?? [];
      setSelectVehicles(vehcileVinNumbe);
      setdel(false);
    }
  }, [isSsr, del, sidebar]);
  const removeItem = (id: string) => {
    localStorage.removeItem(id);
    setdel(true);
  };
  useEffect(() => {
    setFavVeh([]);
  }, [selectVehicles?.length]);

  const handleChange = (vinNum: string) => {
    const index = favVeh.indexOf(vinNum);
    if (index > -1) {
      const newFav = [...favVeh];
      newFav.splice(index, 1);
      setFavVeh(newFav);
    } else {
      setFavVeh([...favVeh, vinNum]);
    }
  };

  const vehicleData = selectVehicles.length
    ? selectVehicles?.map((f) => JSON.parse(localStorage?.getItem(f) ?? '{}'))
    : [];

  const location = useLocation();
  const closeSideBar = () => {
    setSidebar(false);
  };

  useEffect(() => {
    closeSideBar();
  }, [location]);

  const [openModal] = useModals();

  const openComapareModal = () => {
    openModal('Compare_Vehicle_Modal', {
      modalClass: 'compare_Modal',
    });
  };
  return (
    <>
      <Button onClick={() => setSidebar(!sidebar)} className={cn(styles.sidebar_Btn, btnClasses)}>
        <span>Compare your Favorites</span> <i className='foxicon foxicon-heart' /> <sup>{selectVehicles?.length}</sup>
      </Button>
      {sidebar && (
        <>
          <div className={styles.overlay} onClick={closeSideBar} />
          <div className={styles.sideBar_Wrapper}>
            <Button onClick={closeSideBar} className={cn(styles.close_Btn, 'btn_No_Style')}>
              <i className='foxicon foxicon-cross' />
              <span className='d_None'>close</span>
            </Button>
            <section className={styles.selectes_Vehicles_Section}>
              <p>
                <strong>{favVeh?.length}/4 Vehicles Selected</strong>
              </p>
              <Button
                disabled={favVeh.length < 2}
                onClick={openComapareModal}
                className={cn(
                  styles.compare_Btn,
                  { [styles.compare_Btn_Active]: favVeh.length >= 2 },
                  'btn-sm text_Uppercase',
                )}
              >
                Compare
              </Button>
            </section>
            {vehicleData?.length ? (
              <section className={styles.vehicle_Details_Section}>
                {vehicleData?.map((i: SearchResultItem, index: number) => (
                  <InventoryVehicleData
                    carTitle={i?.carTitle}
                    stock={i?.stock}
                    vin={i?.vin}
                    imagelist={i?.imagelist?.[0]?.url}
                    key={index}
                    handleChange={() => handleChange(i?.vin ?? '')}
                    removeItem={() => removeItem(i?.vin ?? '')}
                    disabled={!favVeh.includes(i?.vin ?? '') && favVeh.length > 3}
                    vehicleImage={i?.imagelist?.[0]?.url?.length ? true : undefined}
                    carDetails={i ?? ''}
                    price={i?.msrp}
                    KeyfeatureData={i?.priority_options}
                  />
                ))}
              </section>
            ) : (
              <div>
                <p>
                  No favorites found!
                  <br />
                  Add Items to get started
                </p>
                <Link to='inventory/?type=new&ref=%2Finventory%2Fnew' className={styles.view_Inventory}>
                  <Button>View Inventory</Button>
                </Link>
              </div>
            )}
          </div>
        </>
      )}
      <ComapreVehiclesModal />
    </>
  );
};

export default CompareVehicles;
