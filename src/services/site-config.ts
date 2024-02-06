import { deepClone } from '@utils/common.util';
import jsonFetch from '@utils/json-api.util';
import { encode } from '@utils/base64.util';

const defaultSiteConfig: SiteConfig = {
  theme: 'default',
  podSlug: '',
  siteSlug: '',
  apiEndpoint: '',
  siteUrls: [],
  siteName: '',
  expectedSiteOrigin: '',
  siteLanguage: 'en',
  siteLanguages: [],
  dealer: {
    zipCode: '',
    city: '',
    state: '',
    name: '',
    address: '',
  },
  oem: {
    taggingScriptSrc: '',
    taggingScriptSrcStaging: '',
    retailerId: '',
    providerId: '',
    pageBrand: '',
    clientId: '',
    dealerMakes: [],
  },
  fonts: {},
  colors: {},
  secondarySorting: {},
  defalutOrderingKey: '',
  fdiCustomInventoryMeta: '',
  options: {
    siteTags: [],
    gaTracker: [],
    callrailCode: '',
    siteRedirects: {},
    fallbackInventoryUrl: '',
    fdiCustomInventoryUrls: '',
    fdiSiteTags: [],
    instagramSettings: {
      accessToken: '',
      userId: '',
    },
    ascbSettings: {
      isEnabled: false,
      ascbOptions: '{}',
    }
  },
  toyotaTdaNumber: '',
  addGa4GtmContainer: false,
  uniqueId: '',
};

const getExpectedSiteUrl = (url: URL) => {
  let expectedSiteUrl;
  if (url.host.includes('.foxdealersites.com')) {
    expectedSiteUrl = url.origin;
  } else if (url.host.indexOf('www') === -1) {
    expectedSiteUrl = `https://www.${url.host}`;
  } else {
    expectedSiteUrl = url.origin;
  }
  return expectedSiteUrl;
};

export const fetchSiteConfig = async () => {
  let config: SiteConfig = deepClone(defaultSiteConfig);

  if (typeof window !== 'undefined' && window.siteConfig) {
    config = window.siteConfig;
  } else {
    let siteSlug = 'hudsonauto';
    if (siteSlug) {
      config.siteSlug = siteSlug;
      const endpointBase = `https://${siteSlug}.foxdealersites.com/`;
      config.apiEndpoint = new URL('/wp-json/api/v1/', endpointBase).toString();
      config.pagesApiEndpoint = new URL('/wp-json/wp/v2/', endpointBase).toString();
      config.siteUrls = [
        `https://${siteSlug}.com`,
        `https://www.${siteSlug}.com`,
        `https://${siteSlug}.foxdealer.com`,
        `https://${siteSlug}.foxdealersites.com`,
      ];
      const templateTagsUrl = new URL(endpointBase);
      templateTagsUrl.searchParams.append('api', import.meta.env.TEMPLATE_TAGS_API_KEY);
      templateTagsUrl.searchParams.append('raw_json', 'true');
      templateTagsUrl.searchParams.append('show_template_tags', 'true');
      templateTagsUrl.searchParams.append('options[]', 'fdi_secondary_sorting');
      templateTagsUrl.searchParams.append('options[]', 'fdi_default_ordering_key_direction');
      templateTagsUrl.searchParams.append('options[]', 'fdi_site_is_live');
      templateTagsUrl.searchParams.append('options[]', 'fdi_ga_tracker');
      templateTagsUrl.searchParams.append('options[]', 'fdi_callrail_code');
      templateTagsUrl.searchParams.append('options[]', 'fdi_custom_inventory_meta');
      templateTagsUrl.searchParams.append('options[]', '301_redirects');
      templateTagsUrl.searchParams.append('options[]', 'fallback_inventory_landing_page');
      templateTagsUrl.searchParams.append('options[]', 'fdi_custom_inventory_urls');
      templateTagsUrl.searchParams.append('options[]', 'fdi_site_tags');
      templateTagsUrl.searchParams.append('options[]', 'sb_instagram_settings');
      templateTagsUrl.searchParams.append('options[]', 'fdi_ada_options');
      templateTagsUrl.searchParams.append('options[]', 'fdi_add_ada_script');
      try {
        console.log(templateTagsUrl);
        let data = await jsonFetch(templateTagsUrl.toString());
        globalThis.siteConfig = data;
        if (!data.is_home) {
          data = null;
          config = deepClone(defaultSiteConfig);
        } else {
          const slugUrl = `https://www.${siteSlug}.com/`;
          const expectedUrl = new URL(data?.base_site_url || slugUrl);
          // If the expected url does not have www in the URL, then add it
          config.expectedSiteOrigin = getExpectedSiteUrl(expectedUrl);
          // config.expectedSiteOrigin = expectedUrl.host.includes('.foxdealersites.com')
          //   ? expectedUrl.origin
          //   : expectedUrl.host.indexOf('www') === -1
          //   ? `https://www.${expectedUrl.host}`
          //   : expectedUrl.origin;
          config.siteUrls = [
            `https://${expectedUrl.host}`,
            `http://${expectedUrl.host}`,
            `https://www.${expectedUrl.host}`,
            `https://${siteSlug}.foxdealer.com`,
            `https://${siteSlug}.foxdealersites.com`,
            `https://${siteSlug}.com`,
            `https://www.${siteSlug}.com`,
            `http://www.${siteSlug}.com`,
            `www.${siteSlug}.com`,
          ];
          config.siteLogo = data?.settings?.logo_primary?.src;
          config.siteName = data?.site_name ?? '';
          config.smartpathDisclaimers = data.smartpath_disclaimers ?? {};
          if (process.env.USE_HTTPS) {
            location.protocol = 'https';
          }
          config.siteId = data?.site_id ?? '';
          config.baseSiteUrl = data?.base_site_url ?? '';
          config.siteLanguage = data?.site_language ?? 'en';
          config.toyotaTdaNumber = data?.settings?.toyota_tda_number ?? '';
          config.siteLanguages?.push?.(data?.settings?.site_language ?? 'en');
          const locationData = data?.locations__ui?.locations?.[0] ?? {};
          config.dealer = {
            zipCode: data?.locations__ui?.locations?.[0]?.location__zip ?? '',
            city: data?.locations__ui?.locations?.[0]?.location__city ?? '',
            state: data?.locations__ui?.locations?.[0]?.location__state ?? '',
            bacId: data?.locations__ui?.locations?.[0]?.location__bac_id ?? '',
            address: `${locationData?.location__street_number} ${locationData?.location__street_name} ${locationData?.location__city} ${locationData?.location__state}`
          };
          config.secondarySorting = data?.options?.fdi_secondary_sorting ?? '';
          config.defalutOrderingKey = data?.options?.fdi_default_ordering_key_direction ?? '';
          config.fdiCustomInventoryMeta = data?.options?.fdi_custom_inventory_meta ?? '';
          config.addGa4GtmContainer = (data?.settings?.add_ga4_gtm_container ?? false) || false;
          //Temporary hardcoding for Toyota and Lexus Canada demo site shift tagging
          let shift_scriptStaging = '';
          let shift_clientId = '';
          let shift_retailerId = '';
          let shift_pagebrand = '';
          if(siteSlug === 'toyotacanadademo') {
            shift_scriptStaging = 'https://sdtagging-staging.azureedge.net/scripts/sd.js?containerId=TOYOTACA';
            shift_clientId = 'TOYOTACA';
            shift_retailerId = '99999';
          }
          if(siteSlug === 'lexuscanadademo') {
            shift_scriptStaging = 'https://sdtagging-staging.azureedge.net/scripts/sd.js?containerId=LEXUSCA';
            shift_clientId = 'LEXUSCA';
            shift_retailerId = '99999';
            shift_pagebrand = 'Lexus';
          }
          if(siteSlug === 'nissandemov3') {
            shift_scriptStaging = 'https://sdtagging-staging.azureedge.net/scripts/sd.js?containerId=NISSANUS';
            shift_clientId = 'NISSANUS';
            shift_retailerId = '99999';
            shift_pagebrand = 'Nissan';
          }
          config.oem = {
            taggingScriptSrc: data?.oem?.tagging_script_src ?? '',
            taggingScriptSrcStaging: shift_scriptStaging !== '' ? shift_scriptStaging : (data?.oem?.tagging_script_src_staging ?? ''),
            retailerId: shift_retailerId !== '' ? shift_retailerId : (data?.oem?.retailer_id ?? ''),
            providerId: data?.oem?.provider_id ?? '',
            pageBrand: shift_pagebrand !== '' ? shift_pagebrand : (data?.oem?.page_brand ?? ''),
            clientId: shift_clientId !== '' ? shift_clientId : (data?.oem?.client_id ?? ''),
            dealerMakes: data?.oem?.dealer_makes ?? [],
          };
          config.fonts = {
            primary: data?.settings?.font_primary,
          };
          config.colors = {
            primary: data?.settings?.color_primary,
            secondary: data?.settings?.color_secondary,
            header: data?.settings?.color_header_color,
            headerBg: data?.settings?.color_header_bg,
            navbarBg: data?.settings?.color_navbar_bg,
            secondaryNavbarBg: data?.settings?.color_secondary_navbar_bg,
            contactNavbarBg: data?.settings?.color_contact_navbar_bg,
            contactNavbar: data?.settings?.color_contact_navbar_color,
            navBannerBackground: data?.settings?.nav_banner_color_background,
            navBannerFont: data?.settings?.nav_banner_color_font,
            footerLogo: data?.settings?.footer_logo,
            footerLogoBg: data?.settings?.footer_logo_bg,
            frontpageAboutUsBg: data?.settings?.frontpage_about_us_bg_color,
            frontpageAboutUs: data?.settings?.frontpage_about_us_text_color,
            frontpageContactUs: data?.settings?.frontpage_contact_us_text_color,
            frontpageContactUsBgPrimary: data?.settings?.frontpage_contact_us_bg_color_primary,
            frontpageContactUsBgSecondary: data?.settings?.frontpage_contact_us_bg_color_secondary,
            findNextVehicleSearchBg: data?.settings?.find_next_vehicle_search_bg_color,
            findNextVehicleSearch: data?.settings?.find_next_vehicle_search_text_color,
            findNextVehicleSearchBtn: data?.settings?.find_next_vehicle_search_btn_txt_color,
            findNextVehicleSearchBtnBg: data?.settings?.find_next_vehicle_search_btn_bg_color,
            carboxSpecialsRibbonBg: data?.settings?.['carbox_specials_ribbon_default_background-color'],
            carboxSpecialsRibbon: data?.settings?.['carbox_specials_ribbon_default_text-color'],
          };
          const instaAccountDetails = (data?.options?.sb_instagram_settings ?? {}) || {};
          config.options = {
            siteTags: (data?.options?.fdi_site_tags ?? []) || [],
            gaTracker: (data?.options?.fdi_ga_tracker ?? '').toString().split(',').filter(Boolean),
            callrailCode: encode((data?.options?.fdi_callrail_code ?? '') || ''),
            siteRedirects: (data?.options?.['301_redirects'] ?? {}) || {},
            fallbackInventoryUrl: (data?.options?.fallback_inventory_landing_page ?? '') || '',
            fdiCustomInventoryUrls: (data?.options?.fdi_custom_inventory_urls ?? '') || '',
            fdiSiteTags: (data?.options?.fdi_site_tags ?? []) || [],
            instagramSettings: {
              userId: (instaAccountDetails?.sb_instagram_user_id ?? '') || '',
              accessToken: (instaAccountDetails?.connected_accounts?.[instaAccountDetails?.sb_instagram_user_id]?.access_token ?? '') || '',
            },
            ascbSettings : {
              isEnabled: (data?.options?.fdi_add_ada_script === 'on') || false,
              ascbOptions: (data?.options?.fdi_ada_options) || '{}',
            }
          };
        }
      } catch (ex) {
        console.error('Exception in fetchSiteConfig :::', ex);
        config = deepClone(defaultSiteConfig);
      }
    }
  }

  return config;
};

// export const getSiteConfig = async (location: URL): Promise<SiteConfig> => {
//   const cacheClient = await getCache();
//   const cacheKey = `${location.hostname}_siteConfig`;
//   const urlParams = new URLSearchParams(location.search);
//   const resetParam = urlParams.get('resetSiteConfigCache');
//   if (!resetParam && (await cacheClient.has(cacheKey))) {
//     fetchSiteConfig(location).then((siteConfig) => cacheClient.set(cacheKey, siteConfig));
//     return cacheClient.get(cacheKey) as Promise<SiteConfig>;
//   }
//   const config = await fetchSiteConfig(location);
//   await cacheClient.set(cacheKey, config);
//   return config;
// };
