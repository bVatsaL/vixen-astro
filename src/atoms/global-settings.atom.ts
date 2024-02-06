import { Vehicle, VehicleDetail } from '@typedefs/vehicle';
import { delay } from '@utils/common.util';
import jsonFetch from '@utils/json-api.util';
import { selector, selectorFamily } from 'recoil-ssr';
import { cachedFetch } from './cache.atom';
import { expectedSiteOriginAtom, siteConfigAtom, siteUrlAtom } from './site.atom';

export const globalAtom = selector({
  key: 'global-site-data',
  get: async ({ get }) => {
    const siteUrl = get(siteUrlAtom);
    const expectedSiteOrigin = get(expectedSiteOriginAtom);
    const globalSettingsApiEndPoint = new URL('/_api/global-data/', siteUrl);
    globalSettingsApiEndPoint.searchParams.set('origin', expectedSiteOrigin);

    const global = await cachedFetch(
      {
        id: `global-site-data-${globalSettingsApiEndPoint.searchParams.toString()}`,
        path: globalSettingsApiEndPoint.toString(),
      },
      get,
    );
    return global ?? [];
  },
});
export const wpStaticPageAtom = selectorFamily({
  key: 'wp-static-page',
  get:
    ({ page: pagename, search }: { page: string; search?: string }) =>
    async ({ get }) => {
      const siteUrl = get(siteUrlAtom);
      const expectedSiteOrigin = get(expectedSiteOriginAtom);
      const globalSettingsApiEndPoint = new URL('/_api/wp-static-page-data/', siteUrl);
      if (search) {
        globalSettingsApiEndPoint.searchParams.set('s', search);
      }
      globalSettingsApiEndPoint.searchParams.set('pathname', pagename);
      globalSettingsApiEndPoint.searchParams.set('origin', expectedSiteOrigin);

      const global: any = await cachedFetch(
        {
          id: `wp-static-page-${globalSettingsApiEndPoint.searchParams.toString()}`,
          path: globalSettingsApiEndPoint.toString(),
          options: { returnError: true },
        },
        get,
      );
      return global ?? [];
    },
});

export const podStaticPageAtom = selectorFamily({
  key: 'pod-static-page',
  get:
    ({ pathname }: { pathname: string }) =>
    async ({ get }) => {
      const siteConfig = get(siteConfigAtom);
      if (!siteConfig.podSlug) {
        return {
          error: 'Pod slug not found',
        };
      }
      const podEndpoint = `https://${siteConfig.podSlug}.${process.env.PODS_HOST}/`;
      const pageApiUrl = new URL('/api/pages  ', podEndpoint);
      pageApiUrl.searchParams.set('populate', 'deep');
      pageApiUrl.searchParams.set('filters[slug]', pathname);
      pageApiUrl.searchParams.set('pagination[perPage]', '1');

      const pageData: any = await cachedFetch(
        {
          id: `pod-static-page-${pageApiUrl.searchParams.toString()}`,
          path: pageApiUrl.toString(),
          options: { returnError: true },
        },
        get,
      );
      return pageData?.data?.[0] ?? {};
    },
});

export const vdpOptionsDataAtom = selectorFamily({
  key: 'vdp-options-data',
  get: (pageUrl: string) => async ({ get }) => {
    const siteUrl = get(siteUrlAtom);
    const expectedSiteOrigin = get(expectedSiteOriginAtom);
    const vdpOptionsDataEndPoint = new URL('/_api/vdp-otions-data/', siteUrl);
    vdpOptionsDataEndPoint.searchParams.set('pageUrl', pageUrl);
    vdpOptionsDataEndPoint.searchParams.set('origin', expectedSiteOrigin);

    const global = await cachedFetch(
      {
        id: `vdp-options-data-${vdpOptionsDataEndPoint.searchParams.toString()}`,
        path: vdpOptionsDataEndPoint.toString(),
        options: { returnError: true },
      },
      get,
    );
    return global ?? [];
  },
});

export const explorevehcilesDataAtom = selector({
  key: 'vehcile-data',
  get: async ({ get }) => {
    await delay(5000);
    return get(globalAtom).globals?.newVehicles2 ?? {};
  },
});

export const landRovervehcilesDataAtom = selector({
  key: 'landrover-vehcile-data',
  get: async ({ get }) => {
    const siteUrl = get(siteUrlAtom);
    const expectedSiteOrigin = get(expectedSiteOriginAtom);
    const createInventoryCountUrl = (inventoryUrl?: string) => {
      const inventoryCountUrl = new URL('/_api/jellybeansCount/', siteUrl);
      inventoryCountUrl.searchParams.set('origin', expectedSiteOrigin);
      inventoryCountUrl.searchParams.set('currentQuery', inventoryUrl ?? '');
      return inventoryCountUrl?.toString?.() ?? '';
    };
    const vehicles = get(globalAtom).globals?.newVehicles ?? {};
    const vs = Array.isArray(vehicles) ? vehicles : [];

    const vehcileWithInventoryCount = await Promise.all(
      vs.map(async (v: Vehicle) => ({
        ...v,
        details: await (() => {
          const details = Array.isArray(v?.details) ? v.details : [];
          return Promise.all(
            details.map(async (i: VehicleDetail) => {
              try {
                const getInventoryData =
                  (await jsonFetch(createInventoryCountUrl(i?.['inventory-url']), { credentials: 'omit' })) ?? {};
                return {
                  ...i,
                  inventory_count: getInventoryData?.count ?? 0,
                  lowest_price: getInventoryData?.starting_price ?? null,
                };
              } catch {
                // Single fetch failed
              }
              return {
                ...i,
                inventory_count: 0,
                lowest_price: null,
              };
            }),
          );
        })(),
      })),
    );
    return vehcileWithInventoryCount ?? [];
  },
});
export const jaguarVehiclesDataAtom = selector({
  key: 'jaguar-vehicle-data',
  get: async ({ get }) => {
    const siteUrl = get(siteUrlAtom);
    const expectedSiteOrigin = get(expectedSiteOriginAtom);
    const createInventoryCountUrl = (inventoryUrl?: string) => {
      const inventoryCountUrl = new URL('/_api/jellybeansCount/', siteUrl);
      inventoryCountUrl.searchParams.set('origin', expectedSiteOrigin);
      inventoryCountUrl.searchParams.set('currentQuery', inventoryUrl ?? '');
      return inventoryCountUrl?.toString?.() ?? '';
    };
    const vehicles = get(globalAtom).globals?.newVehicles ?? {};
    const vs = Array.isArray(vehicles) ? vehicles : [];

    const vehcileWithInventoryCount = await Promise.all(
      vs.map(async (v: Vehicle) => ({
        ...v,
        details: await (() => {
          const details = Array.isArray(v?.details) ? v.details : [];
          return Promise.all(
            details.map(async (i: VehicleDetail) => {
              try {
                const getInventoryData =
                  (await jsonFetch(createInventoryCountUrl(i?.['inventory-url']), { credentials: 'omit' })) ?? {};
                return {
                  ...i,
                  inventory_count: getInventoryData?.count ?? 0,
                  lowest_price: getInventoryData?.starting_price ?? null,
                };
              } catch {
                // Single fetch failed
              }
              return {
                ...i,
                inventory_count: 0,
                lowest_price: null,
              };
            }),
          );
        })(),
      })),
    );
    return vehcileWithInventoryCount ?? [];
  },
});

type UsedJellybean = {
  mainnav_jellybean_name?: string;
  mainnav_jellybean_url?: string;
  mainnav_jellybean_image?: {
    media_library?: {
      src?: string;
    };
  };
};

type UsedJellybeanData = {
  title?: string;
  data: UsedJellybean[];
};

export const toyotaOfLasVegasvehcilesDataAtom = selector({
  key: 'toyotaoflasvegas-vehcile-data',
  get: async ({ get }) => {
    const siteUrl = get(siteUrlAtom);
    const expectedSiteOrigin = get(expectedSiteOriginAtom);
    const createInventoryCountUrl = (inventoryUrl?: string) => {
      const inventoryCountUrl = new URL('/_api/jellybeansCount/', siteUrl);
      inventoryCountUrl.searchParams.set('origin', expectedSiteOrigin);
      inventoryCountUrl.searchParams.set('currentQuery', inventoryUrl ?? '');
      return inventoryCountUrl?.toString?.() ?? '';
    };
    const vehicles = get(globalAtom).mainNav_jellybeans__ui ?? {};
    const vs = Array.isArray(vehicles) ? vehicles : [];

    const titleLinkMap: Record<string, string> = {
      'Pre-Owned': '/inventory/used',
      Certified: '/inventory/used/?certified=1',
    };

    const vehicleWithInventoryCount = await Promise.all(
      vs.map(async (v: UsedJellybeanData) => ({
        category: `${v?.title} ${v?.title === 'Certified' ? 'Pre-Owned' : ''} Inventory`,
        categoryLink: titleLinkMap?.[v?.title ?? ''] ?? '',
        details: await (() => {
          const details = Array.isArray(v?.data) ? v.data : [];
          return Promise.all(
            details.map(async (i: UsedJellybean) => {
              try {
                const getInventoryData =
                  (await jsonFetch(createInventoryCountUrl(i?.mainnav_jellybean_url), { credentials: 'omit' })) ?? {};
                return {
                  'image-src': i?.mainnav_jellybean_image?.media_library?.src ?? '',
                  'inventory-url': i?.mainnav_jellybean_url ?? '',
                  title: i?.mainnav_jellybean_name ?? '',
                  inventory_count: getInventoryData?.count ?? 0,
                  lowest_price: getInventoryData?.starting_price ?? null,
                };
              } catch {
                // Single fetch failed
              }
              return {
                'image-src': i?.mainnav_jellybean_image?.media_library?.src ?? '',
                'inventory-url': i?.mainnav_jellybean_url ?? '',
                title: i?.mainnav_jellybean_name ?? '',
                inventory_count: 0,
                lowest_price: null,
              };
            }),
          );
        })(),
      })),
    );
    return vehicleWithInventoryCount ?? [];
  },
});

export const phonePrimaryTitleAtom = selector({
  key: 'primary-title',
  get: ({ get }) => get(globalAtom)?.locations__ui?.locations?.[0]?.location__phone_primary_title ?? [],
});
export const secondaryPrimaryTitleAtom = selector({
  key: 'secondary-title',
  get: ({ get }) => get(globalAtom)?.locations__ui?.locations?.[0]?.location__phone_secondary_title ?? [],
});
export const defaultDescriptionAtom = selector({
  key: 'default-description',
  get: ({ get }) => get(globalAtom)?.settings?.disclaimer_default ?? [],
});
export const ascMeasurementIdsAtom = selector({
  key: 'asc-measurement_ids',
  get: ({ get }) => get(globalAtom)?.settings?.asc_measurement_ids ?? [],
});
export const showCallPriceAtom = selector({
  key: 'call-price',
  get: ({ get }) => get(globalAtom)?.settings?.show_call_for_price === 'true',
});
export const showleasePriceAtom = selector({
  key: 'lease-price',
  get: ({ get }) => get(globalAtom)?.settings?.srp_lease_finance_boxes || 'None',
});
export const showVdpleasePriceAtom = selector({
  key: 'vdp-lease-price',
  get: ({ get }) => get(globalAtom)?.settings?.vdp_lease_finance_boxes || '',
});
export const showCompareandFavAtom = selector({
  key: 'compare-save',
  get: ({ get }) => get(globalAtom)?.settings?.site__show_favorites || '',
});
export const showQuickChooseButtonAtom = selector({
  key: 'show-quick-choose',
  get: ({ get }) => get(globalAtom)?.settings?.frontpage_quick_choose_buttons_show || '',
});
export const secondaryLogoAtom = selector({
  key: 'global-secondary-logo',
  get: ({ get }) => get(globalAtom)?.settings?.logo_secondary?.src || '',
});
export const specialBannerLocation = selector({
  key: 'carbox-banner-location',
  get: ({ get }) => get(globalAtom)?.settings?.carbox_specials_ribbon_location || '',
});
export const showScdButtonAtom = selector({
  key: 'scd-buttom',
  get: ({ get }) => get(globalAtom)?.settings?.show_scd_button,
});
export const secondaryWelcomeImageAtom = selector({
  key: 'secondary-image',
  get: ({ get }) => get(globalAtom)?.settings?.frontpage_about_us_section_img?.src || '',
});
export const locationBacIdAtom = selector({
  key: 'bac-id',
  get: ({ get }) => get(globalAtom)?.locations__ui?.locations?.[0]?.location__bac_id || '',
});

export const headerBgColorAtom = selector({
  key: 'header-bg',
  get: ({ get }) => get(globalAtom)?.settings?.color_header_bg || '',
});
export const paymentCalcBtnAtom = selector({
  key: 'payment-calc-btn',
  get: ({ get }) => get(globalAtom)?.settings?.show_payment_calculator || false,
});
export const fourthPhoneNumberAtom = selector({
  key: 'fourth-number',
  get: ({ get }) => get(globalAtom)?.locations__ui?.locations?.[0]?.location__phone_fourth ?? '',
});
export const fourthTitleAtom = selector({
  key: 'fourth-title',
  get: ({ get }) => get(globalAtom)?.locations__ui?.locations?.[0]?.location__phone_fourth_title ?? '',
});

export const vehicleShopByMakesAtom = selector({
  key: 'vehicle-shop-by-make',
  get: ({ get }) => get(globalAtom)?.vehicle_makes__ui?.[0]?.data || [],
});
export const srpPromoMultipleImageAtom = selector({
  key: 'srp-promo-card-multiple-img',
  get: ({ get }) => {
    const srpPromo = get(globalAtom)?.srp_promos?.[0]?.data ?? [];
    if (Array.isArray(srpPromo)) {
      return srpPromo;
    } else if (typeof srpPromo === 'object') {
      return Object.values(srpPromo ?? {});
    } else {
      return [];
    }
  },
});
export const carBoxesAtom = selector({
  key: 'car-boxes',
  get: ({ get }) => get(globalAtom)?.special_carboxes__ui ?? [],
});
export const frontPageCouponSliders = selector({
  key: 'fp-coupon-sliders',
  get: ({ get }) => get(globalAtom)?.fp_coupons_ui?.[0]?.data ?? [],
});
export const inTransitVehiclesDataAtom = selector({
  key: 'in-transit-vehicles-ui-data',
  get: ({ get }) => {
    const inTansitVehicleData = get(globalAtom)?.in_transit_vehicles__ui ?? [];
    const settingsData = get(globalAtom)?.settings ?? {};
    const filterInTransitVehicleData = inTansitVehicleData.map((c: any, index: number) => ({
      ...c,
      cardImg: settingsData?.[`settings_in_transit_vehicles_${index}`]?.src ?? '',
      data:
        typeof c.data === 'object'
          ? Object.keys(c.data).map((key) => {
              return c?.data?.[key];
            })
          : c.data,
    }));
    return filterInTransitVehicleData;
  },
});
