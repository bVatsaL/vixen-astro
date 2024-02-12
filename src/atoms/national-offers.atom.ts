import { selector, selectorFamily } from 'recoil-ssr';
import { cachedFetch } from './cache.atom';

export const nationalOffersAtom = selectorFamily({
  key: 'nationalOffers',
  get: (offerOem: string) => async ({ get }) => {
    const nationalOffers = await cachedFetch(
      {
        id: `nationalOffers-${offerOem}`,
        path: `oem_offers?offer_oem=${offerOem}&offer_type=national`,
      },
      get,
    );
    return nationalOffers?.oem_offers?.offers ?? [];
  },
});

export const mbNationalOffersAtom = selectorFamily({
  key: 'mbNationalOffers',
  get: (offerOem: string) => async ({ get }) => {
    const nationalOffers = await cachedFetch(
      {
        id: `mbNationalOffers-${offerOem}`,
        path: `oem_offers?offer_oem=${offerOem}&offer_type=national`,
      },
      get,
    );
    return nationalOffers?.oem_offers ?? [];
  },
});

export const mbCpoOffersAtom = selectorFamily({
  key: 'mbCpoOffers',
  get: (offerOem: string) => async ({ get }) => {
    const nationalOffers = await cachedFetch(
      {
        id: `mbCpoOffers-${offerOem}`,
        path: `oem_offers?offer_oem=${offerOem}&offer_type=cpo`,
      },
      get,
    );
    return nationalOffers?.oem_offers ?? [];
  },
});

export const mbVanOffersAtom = selector({
  key: 'mbVanOffers',
  get: async ({ get }) => {
    const vanOffers = await cachedFetch(
      {
        id: 'mbOffers-van-offers',
        path: 'van_offers',
      },
      get,
    );
    return vanOffers?.van_offers ?? [];
  },
});

export const mbLeaseOffersAtom = selector({
  key: 'mb-lease-offers',
  get: async ({ get }) => {
    const leaseOffers = await cachedFetch(
      {
        id: 'mb-lease-offers',
        path: 'offers',
      },
      get,
    );
    return leaseOffers?.offers ?? [];
  },
});

export const mbFinanceoffersAtom = selector({
  key: 'mb-finance-offers',
  get: async ({ get }) => {
    const financeOffers = await cachedFetch(
      {
        id: 'mb-finance-offers',
        path: 'finance_offers',
      },
      get,
    );
    return financeOffers?.finance_offers?.[0] ?? [];
  },
});

export const mbNewVehicleFinanceOffersAtom = selector({
  key: 'mb-new-vehicle-finance-offers',
  get: async ({ get }) => {
    const financeOffers = await cachedFetch(
      {
        id: 'mb-new-vehicle-finance-offers',
        path: 'new_vehicle_finance_offers',
      },
      get,
    );
    return financeOffers?.new_vehicle_finance_offers?.[0] ?? [];
  },
});

export const mbVansOffersAtom = selector({
  key: 'mb-vans-offers',
  get: async ({ get }) => {
    const vansOffers = await cachedFetch(
      {
        id: 'mb-vans-offers',
        path: 'van_offers',
      },
      get,
    );
    return vansOffers?.van_offers?.[0] ?? [];
  },
});
