import type { Vehicle } from '@typedefs/vehicle';
import { apiFetch } from './api-fetch';
import lodashPick from 'lodash/pick';
import { $vehicles } from '@atoms/vehicles';

const vehicleFields = ['category', 'details', 'bg_img'];
const vehicleDetailsFields = ['inventory-url', 'image-src', 'title', 'inventory_count', 'lowest_price'];

export const fetchVehicles = async () => {
  const vehiclesData = await apiFetch({
    path: 'jellybeans',
    rootContext: 'vehicles',
  });
  $vehicles.set((vehiclesData || [])
    .map((v: any) => lodashPick(v, vehicleFields))
    .map((v: Vehicle) => {
      if (v.details) {
        return {
          ...v,
          details: v.details.map((vd) => lodashPick(vd, vehicleDetailsFields)),
        };
      }
      return v;
    }));
};
