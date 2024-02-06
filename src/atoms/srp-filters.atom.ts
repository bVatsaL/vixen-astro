import { selector, selectorFamily } from 'recoil-ssr';
import { siteUniqueIdAtom } from './site.atom';
import { AggregationRecordWithSelected } from '@typedefs/search';
import { uniqueId } from '@utils/constant';

export const showPreApprovedCtaAtom = selector({
  key: 'show-pre-approved-cta',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showPreApprovedCtaSites = [uniqueId.MLADYNISSAN];
    return showPreApprovedCtaSites?.includes?.(siteUniqueId) ?? false;
  },
});

export const showSrpFiltersReviewsAtom = selector({
  key: 'show-srp-filters-reviews',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showSrpFiltersReviewsSites = [uniqueId.MLADYNISSAN];
    return showSrpFiltersReviewsSites?.includes?.(siteUniqueId) ?? false;
  },
});

export const showSearchTotalAtom = selector({
  key: 'showSearchTotal',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showSearchTotal = [uniqueId.NORWALKTOYOTA];
    return showSearchTotal?.includes?.(siteUniqueId) ?? false;
  },
});

export const showFourKeyFeaturesAtom = selector({
  key: 'showFourKeyFeatures',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const sitesWithFourKeyFeatures = [uniqueId.SUBURBANTOYOTA, uniqueId.NORWALKTOYOTA];
    return sitesWithFourKeyFeatures.includes(siteUniqueId) ? 4 : 5;
  },
});

export const showBannersForToyotaLasVegasAtom = selector({
  key: 'showBannersForToyotaLasVegas',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const sitesWithBannersForToyotaLasVegas = [uniqueId.TOYOTAOFLASVEGAS];
    return sitesWithBannersForToyotaLasVegas.includes(siteUniqueId);
  },
});
export const showSrpFiltersAccordionViewAtom = selector({
  key: 'showSrpFiltersAccordionView',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const sitesSrpFiltersWithAccordionView = [uniqueId.HILLTOPNISSAN, uniqueId.JAGUARCERRITOS];
    return sitesSrpFiltersWithAccordionView.includes(siteUniqueId);
  },
});
export const showSrpFiltersCardViewAtom = selector({
  key: 'showSrpFiltersCardView',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.LANDROVERCERRITOS];
    return dealerSites.includes(siteUniqueId);
  },
});

export const showSrpFiltersTitleAtom = selector({
  key: 'showSrpFiltersTitle',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.JAGUARCERRITOS];
    return dealerSites.includes(siteUniqueId);
  },
});

export const calculateFilteredAggregationAtom = selectorFamily({
  key: 'calculateFilteredAggregation',
  get:
    ({ aggregations, vehicleType }: { aggregations: AggregationRecordWithSelected[]; vehicleType?: string }) =>
    ({ get }) => {
      const siteUniqueId = get(siteUniqueIdAtom);
      if (siteUniqueId === uniqueId.JAGUARCERRITOS) {
        const filterArray = ['type'];
        if (vehicleType === 'new') {
          filterArray.push('miles');
        }
        return aggregations.filter((aggregation) => !filterArray.includes(aggregation?.field_name));
      }
      return aggregations;
    },
});
