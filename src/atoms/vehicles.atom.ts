import { Vehicle } from '@typedefs/vehicle';
import { selector, selectorFamily } from 'recoil-ssr';
import { pick } from 'lodash';
import { cachedFetch } from './cache.atom';
import { vehicleTitleFormatAtom, vehicleDescriptionFormatAtom } from './settings.atom';

const vehicleFields = ['category', 'details', 'bg_img'];
const vehicleDetailsFields = ['inventory-url', 'image-src', 'title', 'inventory_count', 'lowest_price'];

export const vehiclesAtom = selector({
  key: 'vehicles',
  get: async ({ get }) => {
    const vehiclesData = await cachedFetch({
      id: 'vehicles',
      path: 'jellybeans',
      rootContext: 'vehicles',
    }, get);
    return (vehiclesData || [])
      .map((v: any) => pick(v, vehicleFields))
      .map((v: Vehicle) => {
        if (v.details) {
          return {
            ...v,
            details: v.details.map((vd) => pick(vd, vehicleDetailsFields)),
          };
        }
        return v;
      });
  },
});


export const generateVehicleTitleAndDescriptionAtom = selectorFamily({
  key: 'generateVehicleTitleAndDescription',
  get: (vehicleDetail: any) => ({ get }) => { // Here, type is given any as vehicle detail is coming from different component with different types.
    const vehicleTitleFormat = get(vehicleTitleFormatAtom);
    const vehicleDescriptionFormat = get(vehicleDescriptionFormatAtom);
    const carTitle: string = vehicleTitleFormat
      .map((key: string) => {
        switch (key) {
          case 'certified':
            return vehicleDetail?.isCertified ? vehicleDetail?.condition ?? '' : '';
          default:
            return vehicleDetail?.[key] || '';
        }
      })
      .filter(Boolean).join(' ');
    const carDescription: string = vehicleDescriptionFormat
      .map((key: string) => {
        switch (key) {
          case 'certified':
            return vehicleDetail?.isCertified ? vehicleDetail?.condition ?? '' : '';
          default:
            return vehicleDetail?.[key] || '';
        }
      })
      .filter(Boolean).join(' ');
    return { carTitle, carDescription }
  },
});