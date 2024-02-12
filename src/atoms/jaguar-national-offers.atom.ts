import { selector } from 'recoil-ssr';
import { cachedFetch } from './cache.atom';

export const nationalOffersAtom = selector({
  key: 'nationalOffers',
  get: async ({ get }) => {
    const nationalOffers = await cachedFetch({
      id: 'nationalOffers',
      path: 'https://group-jaguar.foxdealersites.com/wp-json/api/v1/national_offers',
    }, get);
    return nationalOffers?.national_offers?.[0]?.data ?? [];
  },
});

export const filteredNationalOffersAtom = selector({
  key: 'filteredNationalOffers',
  get: async ({ get }) => {
    const nationalOffers = get(nationalOffersAtom);
    return nationalOffers.map((nationalOffer: any) => {
      const value: any = {};
      const financialOffers: any = [];
      if (nationalOffer.offer__national_lease_price) {
        value.title = '';
        value.price = '';
        value.body = nationalOffer?.offer__national_body_text ?? '';
        financialOffers.push(
          {
            type: 'Lease',
            title: nationalOffer?.offer__national_lease_title ?? '',
            price: nationalOffer?.offer__national_lease_price ?? '',
            condition: nationalOffer?.offer__national_lease_duration
              ? `PER MONTH FOR ${nationalOffer?.offer__national_lease_duration} MONTHS*`
              : '',
            body: nationalOffer?.offer__national_disclaimer ?? '',
            firstMonthPayment: nationalOffer?.offer__national_lease_fmp_amount ?? '',
            downPayment: nationalOffer?.offer__national_lease_down_payment ?? '',
            securityDeposite: nationalOffer?.offer__national_lease_security_deposite ?? '',
            acqisitionFee: nationalOffer?.offer__national_lease_acqisition_fee ?? '',
            dueAtSigning: nationalOffer?.offer__national_lease_due_at_signing
              ? `${nationalOffer?.offer__national_lease_due_at_signing} CASH DUE AT SIGNING`
              : '',
          },
          {
            type: 'Finance',
            title: nationalOffer?.offer__national_finance_title ?? '',
            price: nationalOffer?.offer__national_finance_apr ?? '',
            condition: nationalOffer?.offer__national_finance_duration ?? '',
            body: nationalOffer?.offer__national_finance_disclaimer ?? '',
          },
        );
        value.financialOffers = financialOffers;
      }
      return {
        Img: nationalOffer?.offer__national_image?.media_library?.src ?? '',
        offerImage: nationalOffer?.offer__national__detail_image?.media_library?.src ?? '',
        header: nationalOffer?.offer__national_title ?? '',
        body: nationalOffer?.offer__national_sub_header ?? '',
        price: '',
        showInventoryUrl: nationalOffer?.offer__national_inventory_url ?? '',
        ...(Object.keys(value).length ? { value: value } : {}),
      };
    });
  },
});
