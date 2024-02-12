import { RegisterModal } from '@components/modal/register';
import { MenuVehicle } from '.';

const MenuVehiclesWithData = ({
  vehicles,
  custommodalImage,
  externalsitelink,
  showStock = true,
  showWithTitle = false,
  cardModalClasses,
  noPriceLabel,
  specialStock,
  className,
  displayPrice,
  twoColumnCard,
  showInventoryLink = false,
  startingPriceClassName
}: any) => (
  <MenuVehicle
    vehicles={vehicles}
    custommodalImage={custommodalImage}
    isModal={true}
    externalsitelink={externalsitelink}
    showStock={showStock}
    showWithTitle={showWithTitle}
    cardClassName={cardModalClasses}
    noPriceLabel={noPriceLabel}
    specialStock={specialStock}
    className={className}
    displayPrice={displayPrice}
    twoColumnCard={twoColumnCard}
    showInventoryLink={showInventoryLink}
    startingPriceClassName={startingPriceClassName}
  />
);

export const MenuVehicleModal = () => (
  <RegisterModal id='MENU_VEHICLE_MODAL'>
    <MenuVehiclesWithData />
  </RegisterModal>
);
