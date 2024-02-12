import { selector } from 'recoil-ssr';
import { cachedFetch } from './cache.atom';

export const cpoOffersAtom = selector({
  key: 'jaguarCpoOffers',
  get: async ({ get }) => {
    const cpoOffers = await cachedFetch({
      id: 'jaguarCpoOffers',
      path: 'https://group-jaguar.foxdealersites.com/wp-json/api/v1/cpo_offers',
    }, get);
    return cpoOffers?.cpo_offers?.[0]?.data ?? [];
  },
});

export const filteredCPOOffersAtom = selector({
  key: 'jaguarFilteredCpoOffers',
  get: async ({ get }) => {
    const cpoOffers = get(cpoOffersAtom);
    return cpoOffers.map((cpoOffer: any) => {
      const tableData: any = [];
      let index = 1;
      Object.keys(cpoOffer).map((obj) => {
        if (
          obj !== 'offer__cpo_model_month_title' &&
          !obj.includes('offer__cpo_model_month_apr') &&
          obj.includes('offer__cpo_model_month_') &&
          cpoOffer[obj] !== ''
        ) {
          tableData.push({
            id: index,
            yearData: cpoOffer[obj],
            monthData: cpoOffer?.[`offer__cpo_model_month_apr_${index}`],
          });
          index++;
        }
      });
      return {
        offerTitle: cpoOffer?.offer__cpo_title ?? '',
        offerImg: cpoOffer?.offer__cpo_image?.media_library?.src ?? '',
        offerUrl: cpoOffer?.offer__cpo_url ?? '',
        modelYearTitle: cpoOffer?.offer__cpo_model_year_title ?? '',
        modelMonthTitle: cpoOffer?.offer__cpo_model_month_title ?? '',
        ...(Object.keys(tableData).length ? { tableData: tableData } : {}),
      };
    });
  },
});
