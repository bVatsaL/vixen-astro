import { AggregationRecordWithSelected, SearchResponse } from '@typedefs/search';
import { addCustomFields, addNewFieldToVDP } from '@utils/search.util';
import { atom, selector, selectorFamily } from 'recoil-ssr';
import { cachedFetch } from './cache.atom';
import { currentLocationFeedIdAtom, vdpDomainByFeedIdAtom } from './location.atom';
import {
  defalutOrderingKeyAtom,
  searchDomainAtom,
  secondarySortingAtom,
  siteIdAtom,
  siteUniqueIdAtom,
  themeAtom,
} from './site.atom';
import { srpPromoMultipleImageAtom } from './global-settings.atom';
import { srpPromoPositionAtom } from './settings.atom';

const srpResultFields = [
  'imagelist',
  'stock',
  'vin',
  'type',
  'year',
  'make',
  'model',
  'drivetrain',
  'trim',
  'standardbody',
  'body',
  'dateinstock',
  'marketclass',
  'transdescription',
  'miles',
  'msrp',
  'display_price',
  'condition',
  'dealer_discount',
  'comment3',
  'comment5',
  'feed_id',
  'intcolor',
  'extcolor',
  'conditional_price',
  'dealer_offer',
  'isspecial',
  'available_incentives',
  'dealername',
  'fueltype',
  'engdescription',
  'specials',
  'description',
  'extcolorgeneric',
  'comment2',
  'epacity',
  'epahighway',
  'carfaxoneowner',
  'carfaxhistoryreporturl',
  'certified',
  'msrpMax',
  'installed_options',
  'total_savings',
  'priority_options',
  'trans',
  'priority_option',
  'carfaxlogo',
  'video_url',
  'id',
  'comment4',
  'bed',
  'cab',
  'sellingprice',
  'comment1',
  'in_transit',
  'reserve_flag',
  'intcolor',
  'friendlystyle',
  'extcolorhexcode',
  'intcolorhexcode',
  'comment20',
  'modelnumber',
  'series_code',
  'miscprice1',
  'permalink',
  'toyota',
  'status_disclaimer',
  'vehicle_status',
  'int_colorgeneric',
];

const vdpFields = [
  'dealername',
  'bed',
  'cab',
  'title',
  'stock',
  'certified',
  'vin',
  'type',
  'year',
  'make',
  'model',
  'drivetrain',
  'trim',
  'standardbody',
  'body',
  'dateinstock',
  'marketclass',
  'transdescription',
  'miles',
  'msrp',
  'standardequipment',
  'miscprice1',
  'display_price',
  'condition',
  'dealer_discount',
  'comment5',
  'comment3',
  'feed_id',
  'carTitle',
  'carDescription',
  'price',
  'on_order',
  'imagelist',
  'images',
  'description',
  'description2',
  'engdescription',
  'extcolor',
  'intcolor',
  'options',
  'epacity',
  'epahighway',
  'epacityev',
  'epahighwayev',
  'priority_options',
  'isspecial',
  'dealer_offer',
  'extcolorgeneric',
  'standardequipment',
  'fueltype',
  'trans',
  'total_incentives_value',
  'available_incentives',
  'installed_options',
  'specials',
  'comment2',
  'comment4',
  'comment20',
  'carfaxhistoryreporturl',
  'carfaxoneowner',
  'total_savings',
  'conditional_price',
  'standardtrim',
  'id',
  'sellingprice',
  'video_url',
  'carfaxlogo',
  'comment1',
  'in_transit',
  'status_disclaimer',
  'vehicle_status',
  'permalink',
  'engblock',
  'friendlystyle',
  'extcolorhexcode',
  'intcolorhexcode',
  'int_colorgeneric',
  'modelnumber',
  'toyota',
  'series_code',
  'reserve_flag',
];

const wolfSitesFeedId = ['gslgm', 'wolfecanmore', 'westgatechevrolet', 'westerngmc', 'wolfecadillac'];
const fallbackInventoryThemes = ['jaguar', 'landrover'];

export const perPageAtom = atom({
  key: 'perPage',
  default: 20,
});

export const offsetAtom = atom({
  key: 'offset',
  default: 0,
});

export const esSearchEndpoint = 'https://search.foxdealer.com/api/vehicle/search';

// export const searchDomainAtom = atom({
//   key: 'searchDomain',
//   default: 'www.southfortchev.com',
// });

const appendSrpPromoBanner = (
  promoBanners: any,
  searchResult: SearchResponse,
  srpPromoPosition: number,
  searchParams: URLSearchParams,
) => {
  const result = searchResult;
  const isSearchTypeNew = searchParams?.get?.('type')?.toLowerCase?.() === 'new';
  const isSearchTypeUsed = searchParams?.get?.('type')?.toLowerCase?.() === 'used';
  const model = searchParams?.get?.('model')?.split(',')?.[0]?.toLowerCase?.();
  if (promoBanners?.length) {
    promoBanners
      ?.filter((i: any) => i?.srp_promo_model_target?.toLowerCase?.() === model || !i?.srp_promo_model_target)
      .filter((i: any) =>
        isSearchTypeNew ? i?.srp_promo_type_target === 'New' : 
        isSearchTypeUsed ? i?.srp_promo_type_target === 'Used' :
        i?.srp_promo_type_target === 'CPO' ? i?.srp_promo_type_target === 'CPO' :
        i?.srp_promo_type_target === 'All',
      )
      ?.map((s: any, id: number) =>
        result?.data?.hits?.splice(!id ? srpPromoPosition - 1 : (id + 1) * 3 + (id - 1), 0, {
          ...result?.data?.hits?.[0],
          vehiclesearchimg: true,
          vin: `12345678${id}`,
          stockImageUrl: s?.srp_promo_graphic?.media_library?.src ?? '',
          stockImageLink: s?.srp_promo_target_url ?? '',
          srpPromoOpenForm: s?.srp_promo_open_form ?? false,
        }),
      );
  }
  return result;
};

/**
 * @todo filter data in hits to minimize the payload
 */
export const defaultSearchResultAtom = selector<SearchResponse>({
  key: 'defaultSearchResult',
  get: async ({ get }) => {
    const perPage = get(perPageAtom);
    const searchUrl = new URL(esSearchEndpoint);
    const domain = get(searchDomainAtom);
    const srpPromoImages = get(srpPromoMultipleImageAtom);
    const srpPromoPosition = get(srpPromoPositionAtom);
    searchUrl.searchParams.set('domain', domain);
    searchUrl.searchParams.set('per_page', `${perPage}`);
    searchUrl.searchParams.set('offset', '0');
    let result = await cachedFetch(
      {
        id: `defaultSearchResult-${searchUrl.searchParams.toString()}`,
        path: searchUrl.toString(),
        filterDataPaths: ['aggregations', 'data'],
        filterFields: {
          'data.hits': srpResultFields,
        },
        options: {
          credentials: 'omit',
          returnError: true,
        },
      },
      get,
    );
    result = appendSrpPromoBanner(
      srpPromoImages,
      result,
      srpPromoPosition,
      new URLSearchParams()
    );
    return result;
  },
});

export const searchResultAtom = selectorFamily({
  key: 'searchResult',
  get:
    ({ searchStr }: { searchStr: string }) =>
    async ({ get }) => {
      const perPage = get(perPageAtom);
      const domain = get(searchDomainAtom);
      const secondarySorting = get(secondarySortingAtom);
      const defalutOrderingKey = get(defalutOrderingKeyAtom);
      const themeName = get(themeAtom);
      const srpPromoImages = get(srpPromoMultipleImageAtom);
      const srpPromoPosition = get(srpPromoPositionAtom);
      const searchParams = new URLSearchParams(searchStr);
      const searchUrl = new URL(esSearchEndpoint);
      const page = searchParams.get('page') ?? '1';
      searchParams.forEach((data, key) => {
        if (key === 'certified' && data === 'true') {
          searchUrl.searchParams.set(`filters[${key}]`, '1');
        } else {
          searchUrl.searchParams.set(`filters[${key}]`, data);
        }
      });
      if (!!secondarySorting || !!defalutOrderingKey) {
        const orderingMap = [
          ...(!secondarySorting || !!searchParams.get('ordering') ? [] : [secondarySorting]),
          ...(!searchParams.get('ordering') && !!defalutOrderingKey
            ? [defalutOrderingKey]
            : [searchParams.get('ordering')]),
        ];
        searchUrl.searchParams.set('filters[ordering]', `${orderingMap?.toString?.()}`);
      }
      searchUrl.searchParams.set('domain', domain);
      searchUrl.searchParams.set('per_page', `${perPage}`);
      searchUrl.searchParams.set('offset', ((parseInt(page, 10) - 1) * perPage).toString());
      let result = await cachedFetch(
        {
          id: `searchResult-${searchUrl.searchParams.toString()}`,
          path: searchUrl.toString(),
          filterDataPaths: ['aggregations', 'data', 'current_query_fields'],
          filterFields: {
            'data.hits': srpResultFields,
          },
          options: {
            credentials: 'omit',
            returnError: true,
          },
        },
        get,
      );
      if (
        result?.statusCode === 404 &&
        searchUrl.searchParams.has('filters[isspecial]') &&
        Array?.from?.(searchParams)?.length > 1 &&
        !fallbackInventoryThemes?.includes?.(themeName)
      ) {
        searchUrl.searchParams.delete('filters[isspecial]');
        result = await cachedFetch(
          {
            id: `searchResult-${searchUrl.searchParams.toString()}`,
            path: searchUrl.toString(),
            filterDataPaths: ['aggregations', 'data', 'current_query_fields'],
            filterFields: {
              'data.hits': srpResultFields,
            },
            options: {
              credentials: 'omit',
              returnError: true,
            },
          },
          get,
        );
      }
      result = appendSrpPromoBanner(
        srpPromoImages,
        result,
        srpPromoPosition,
        searchParams,
      );
      return result;
    },
});

export const searchAggregationsAtom = atom<AggregationRecordWithSelected[]>({
  key: 'searchAggregations',
  default: [],
});

export const searchTotalAtom = atom({
  key: 'searchTotal',
  default: -1,
});

export const vehiclesCountAtom = atom({
  key: 'vehicleCount',
  default: 0,
});

export const finalSearchResultAtom = selectorFamily({
  key: 'searchResult',
  get:
    ({ total, searchResult }: { total: number; searchResult: SearchResponse }) =>
    ({ get }) => {
      let finalSearchResult = {
        ...searchResult,
        status: 'OK',
        statusCode: 200,
      };
      if (!total) {
        const defaultSearchResult = get(defaultSearchResultAtom);
        finalSearchResult = {
          ...defaultSearchResult,
          status: 'NO_RESULT',
          statusCode: 404,
        };
      }
      return addCustomFields(finalSearchResult);
    },
});

const hideFiltersByDefaultAtom = selector({
  key: 'hideFiltersByDefault',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const hideFiltersByDefalutSites = [''];
    return hideFiltersByDefalutSites.includes(siteUniqueId) ? false : true;
  },
});

export const showFiltersAtom = atom({
  key: 'showSearchFilters',
  default: hideFiltersByDefaultAtom,
});

export const vehicleAtom = selectorFamily({
  key: 'vehicle',
  get: (vin: string | undefined) => async ({ get }) => {
    if (!vin) {
      return undefined;
    }
    const searchUrl = new URL(esSearchEndpoint);
    const domain = get(searchDomainAtom);
    searchUrl.searchParams.set('domain', domain);
    searchUrl.searchParams.set('per_page', '1');
    searchUrl.searchParams.set('offset', '0');
    searchUrl.searchParams.set('filters[vin]', vin);

    const vehicleDetails = await cachedFetch(
      {
        id: `vehicle-${vin}`,
        path: searchUrl.toString(),
        rootContext: 'data.hits.[0]',
        filterDataPaths: vdpFields,
        options: {
          credentials: 'omit',
          returnError: true,
        },
      },
      get,
    );
    if (vehicleDetails.vin !== vin) {
      return undefined;
    }
    return addNewFieldToVDP(vehicleDetails);
  },
});

/**
 * WolfSites have multiple feed id for vehicle, so this is a hard core requirement
 * if the feed id of the vehicle is different then change search domain and get
 * details of vehicle based on the domain mapped with feed id
 */
export const wolfeVehicleAtom = selectorFamily({
  key: 'wolfeVehicle',
  get: (vin: string | undefined) => async ({ get }) => {
    if (!vin) {
      return undefined;
    }
    let vehicleDetails = get(vehicleAtom(vin));
    const vehicleFeedId = vehicleDetails?.feed_id?.slice?.(2) ?? '';
    const currentLocationFeedId = get(currentLocationFeedIdAtom);
    if (currentLocationFeedId !== vehicleFeedId && wolfSitesFeedId.includes(vehicleFeedId)) {
      const vdpDomainName = get(vdpDomainByFeedIdAtom(vehicleFeedId));
      const searchUrl = new URL(esSearchEndpoint);
      searchUrl.searchParams.set('per_page', '1');
      searchUrl.searchParams.set('offset', '0');
      searchUrl.searchParams.set('filters[vin]', vin);
      searchUrl.searchParams.set('domain', vdpDomainName);
      vehicleDetails = await cachedFetch(
        {
          id: `wolfeVehicle-${vin}`,
          path: searchUrl.toString(),
          rootContext: 'data.hits.[0]',
          filterDataPaths: vdpFields,
          options: {
            credentials: 'omit',
            returnError: true,
          },
        },
        get,
      );
    }
    if (vehicleDetails?.vin !== vin) {
      return undefined;
    }
    return addNewFieldToVDP(vehicleDetails);
  },
});

const newSearchResultsAtom = selector({
  key: 'newSearchResults',
  get: async ({ get }) => {
    const searchUrl = new URL(esSearchEndpoint);
    const domain = get(searchDomainAtom);
    searchUrl.searchParams.set('domain', domain);
    searchUrl.searchParams.set('offset', '0');
    searchUrl.searchParams.set('filters[type]', 'new');
    const newSearchResult = await cachedFetch(
      {
        id: `newSearchResults-${searchUrl.searchParams.toString()}`,
        path: searchUrl.toString(),
        filterDataPaths: ['data', 'aggregations'],
        options: {
          credentials: 'omit',
          returnError: true,
        },
      },
      get,
    );
    return newSearchResult;
  },
});

const newInventoryResultsAtom = selector({
  key: 'newInventoryResults',
  get: async ({ get }) => {
    const searchUrl = new URL(esSearchEndpoint);
    const domain = get(searchDomainAtom);
    const secondarySorting = get(secondarySortingAtom);
    const defalutOrderingKey = get(defalutOrderingKeyAtom);
    searchUrl.searchParams.set('domain', domain);
    searchUrl.searchParams.set('offset', '0');
    searchUrl.searchParams.set('filters[type]', 'new');
    if (!!secondarySorting || !!defalutOrderingKey) {
      const orderingMap = [
        ...(!secondarySorting ? [] : [secondarySorting]),
        ...(!defalutOrderingKey ? [] : [defalutOrderingKey]),
      ];
      searchUrl.searchParams.set('filters[ordering]', `${orderingMap?.toString?.()}`);
    }
    const newInventoryResults = await cachedFetch(
      {
        id: `newInventoryResults-${searchUrl.searchParams.toString()}`,
        path: searchUrl.toString(),
        filterDataPaths: ['data', 'aggregations'],
        options: {
          credentials: 'omit',
          returnError: true,
        },
      },
      get,
    );
    return newInventoryResults;
  },
});

const newLandRoverDefenderInventoryResultsAtom = selector({
  key: 'newLandRoverDefenderInventoryResults',
  get: async ({ get }) => {
    const searchUrl = new URL(esSearchEndpoint);
    const domain = get(searchDomainAtom);
    searchUrl.searchParams.set('domain', domain);
    searchUrl.searchParams.set('offset', '0');
    searchUrl.searchParams.set('filters[type]', 'new');
    searchUrl.searchParams.set('filters[model]', 'defender');
    searchUrl.searchParams.set('filters[ordering]', 'fdi_misc_sorting1-asc');
    const newInventoryResults = await cachedFetch(
      {
        id: `newLandRoverDefenderInventoryResults-${searchUrl.searchParams.toString()}`,
        path: searchUrl.toString(),
        filterDataPaths: ['data', 'aggregations'],
        options: {
          credentials: 'omit',
          returnError: true,
        },
      },
      get,
    );
    return newInventoryResults;
  },
});

export const newLandroverDefenderSrpGalleryAtom = selector({
  key: 'newLandroverDefenderSrpGallery',
  get: ({ get }) => {
    const newSearchResults = get(newLandRoverDefenderInventoryResultsAtom);
    return newSearchResults?.data?.hits ?? [];
  },
});

export const newSrpGalleryAtom = selector({
  key: 'newSrpGallery',
  get: ({ get }) => {
    const newSearchResults = get(newSearchResultsAtom);
    return newSearchResults?.data?.hits ?? [];
  },
});

export const newSrpGalleryByModelAtom = selectorFamily({
  key: 'newSearchResultsByModel',
  get: (searchStr?: string) => async ({ get }) => {
    if (!searchStr) {
      return [];
    }
    const searchUrl = new URL(esSearchEndpoint);
    const searchParams = new URLSearchParams(searchStr);
    const domain = get(searchDomainAtom);
    const secondarySorting = get(secondarySortingAtom);
    const defalutOrderingKey = get(defalutOrderingKeyAtom);
    searchUrl.searchParams.set('domain', domain);
    searchUrl.searchParams.set('offset', '0');
    searchUrl.searchParams.set('filters[type]', 'new');
    if (searchStr) {
      searchParams.forEach((data, key) => {
        searchUrl.searchParams.set(`filters[${key}]`, data);
      });
    }
    if (!!secondarySorting || !!defalutOrderingKey) {
      const orderingMap = [
        ...(!secondarySorting ? [] : [secondarySorting]),
        ...(!defalutOrderingKey ? [] : [defalutOrderingKey]),
      ];
      searchUrl.searchParams.set('filters[ordering]', `${orderingMap?.toString?.()}`);
    }
    const newSearchResult = await cachedFetch(
      {
        id: `newSearchResultsByModel-${searchUrl.searchParams.toString()}`,
        path: searchUrl.toString(),
        filterDataPaths: ['data'],
        options: {
          credentials: 'omit',
          returnError: true,
        },
      },
      get,
    );
    return newSearchResult?.data?.hits ?? [];
  },
});

export const newInventoryGalleryAtom = selector({
  key: 'newInventoryGallery',
  get: ({ get }) => {
    const newInventoryResults = get(newInventoryResultsAtom);
    return newInventoryResults?.data?.hits ?? [];
  },
});

export const defaultCarModelsAtom = selector({
  key: 'defaultCarModels',
  get: async ({ get }) => {
    const searchUrl = new URL(esSearchEndpoint);
    const domain = get(searchDomainAtom);
    searchUrl.searchParams.set('domain', domain);
    searchUrl.searchParams.set('offset', '0');
    searchUrl.searchParams.set('filters[type]', 'new');
    const newSearchResults = await cachedFetch(
      {
        id: `defaultCarModels-${searchUrl.searchParams.toString()}`,
        path: searchUrl.toString(),
        filterDataPaths: ['aggregations.model.list'],
        options: {
          credentials: 'omit',
          returnError: true,
        },
      },
      get,
    );
    const models = newSearchResults?.aggregations?.model?.list ?? [];
    return models.map((m: { display_name: string; item: string }) => ({
      display_name: m.display_name,
      item: m.item,
    }));
  },
});

export const similarVehiclesAtom = selectorFamily({
  key: 'similarVehicles',
  get: (searchStr: string) => async ({ get }) => {
    const searchUrl = new URL(esSearchEndpoint);
    const searchParams = new URLSearchParams(searchStr);
    const domain = get(searchDomainAtom);
    searchUrl.searchParams.set('domain', domain);
    searchUrl.searchParams.set('offset', '0');
    searchUrl.searchParams.set('per_page', '0');
    searchParams.forEach((data, key) => {
      searchUrl.searchParams.set(`filters[${key}]`, data);
    });
    const newSearchResult = await cachedFetch(
      {
        id: `similarVehicles-${searchUrl.searchParams.toString()}`,
        path: searchUrl.toString(),
        filterDataPaths: ['data.total'],
        options: {
          credentials: 'omit',
          returnError: true,
        },
      },
      get,
    );
    return newSearchResult?.data?.total > 1 ? newSearchResult?.data?.total : null;
  },
});

export const favoriteVehiclesAtom = atom<string[]>({
  key: 'favorite-vehicles',
  default: [],
});
export const selectVehcileAtom = atom<string[]>({
  key: 'select-vehicles',
  default: [],
});

export const getAllMakesAtom = selector({
  key: 'get-All-Makes',
  get: ({ get }) => get(defaultSearchResultAtom)?.aggregations?.make?.list || [],
});

export const preOwnedTotalAtom = selector({
  key: 'pre-owned-total',
  get: async ({ get }) => {
    const searchUrl = new URL(esSearchEndpoint);
    const domain = get(searchDomainAtom);
    searchUrl.searchParams.set('domain', domain);
    searchUrl.searchParams.set('per_page', '0');
    searchUrl.searchParams.set('filters[type]', 'used');
    searchUrl.searchParams.set('offset', '0');
    const result = await cachedFetch(
      {
        id: `pre-owned-total-${searchUrl.searchParams.toString()}`,
        path: searchUrl.toString(),
        filterDataPaths: ['data.total'],
        options: {
          credentials: 'omit',
          returnError: true,
        },
      },
      get,
    );
    return result?.data?.total || '';
  },
});

export const electricVehicleAtom = selector<SearchResponse>({
  key: 'electricVehicleResult',
  get: async ({ get }) => {
    const searchUrl = new URL(esSearchEndpoint);
    const domain = get(searchDomainAtom);
    searchUrl.searchParams.set('domain', domain);
    searchUrl.searchParams.set('offset', '0');
    searchUrl.searchParams.set('filters[fueltype]', 'electric');
    const result = await cachedFetch(
      {
        id: `electricVehicleResult-${searchUrl.searchParams.toString()}`,
        path: searchUrl.toString(),
        filterDataPaths: ['aggregations', 'data'],
        filterFields: {
          'data.hits': srpResultFields,
        },
        options: {
          credentials: 'omit',
          returnError: true,
        },
      },
      get,
    );
    return result;
  },
});
export const usedUnderTwenty = selector<SearchResponse>({
  key: 'under-twenty-total',
  get: async ({ get }) => {
    const searchUrl = new URL(esSearchEndpoint);
    const domain = get(searchDomainAtom);
    searchUrl.searchParams.set('domain', domain);
    searchUrl.searchParams.set('offset', '0');
    searchUrl.searchParams.set('filters[type]', 'used');
    searchUrl.searchParams.set('filters[sellingprice]', '0,20000');
    const result = await cachedFetch(
      {
        id: `under-twenty-total-${searchUrl.searchParams.toString()}`,
        path: searchUrl.toString(),
        filterDataPaths: ['aggregations', 'data'],
        filterFields: {
          'data.hits': srpResultFields,
        },
        options: {
          credentials: 'omit',
          returnError: true,
        },
      },
      get,
    );
    return result;
  },
});
export const smartPathDGDataHubLoadedAtom = atom<boolean>({
  key: 'dg-datahub-loaded',
  default: false,
});

export const inventoryCountAtom = selectorFamily({
  key: 'inventoryCount',
  get: (searchStr: string) => async ({ get }) => {
    const searchUrl = new URL(esSearchEndpoint);
    const searchParams = new URLSearchParams(searchStr);
    const domain = get(searchDomainAtom);
    const siteId = get(siteIdAtom).toString();
    searchUrl.searchParams.set('domain', domain);
    searchUrl.searchParams.set('offset', '0');
    searchUrl.searchParams.set('per_page', '0');
    searchUrl.searchParams.set('blog_id', siteId);
    searchParams.forEach((data, key) => {
      searchUrl.searchParams.set(`filters[${key}]`, data);
    });
    const newSearchResult = await cachedFetch(
      {
        id: `vehicleCount-${searchUrl.searchParams.toString()}`,
        path: searchUrl.toString(),
        filterDataPaths: ['data.total'],
        options: {
          credentials: 'omit',
          returnError: true,
        },
      },
      get,
    );
    return newSearchResult?.data?.total > 1 ? newSearchResult?.data?.total : null;
  },
});
