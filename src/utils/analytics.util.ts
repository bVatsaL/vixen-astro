import { VehicleResponse } from '@typedefs/search';
import { deepClone, removeUndefined } from './common.util';
import { getSessionId } from './session.util';
import { parseInventoryUrlParams } from './inventory.util';

const eventQueue = {
  eq: [] as { cb: () => void; type: string }[],
  pageViewTracked: false,
};
const _t = {};
export const resetEventQueue = () => {
  eventQueue.pageViewTracked = false;
};

const eventSequence = [
  'filterSearch',
  'typedSearch',
  'formShown',
  'ascPageView',
  'ascEvent',
  'trackVehicle',
  'clickEventHandler',
  'formInitiation',
  'getDirections',
];

const ascItemSet = new Set();
const ascEventSet = new Set();
let lastPathname = '';

let timeoutRef: ReturnType<typeof setTimeout>;

const executeEventQueue = () => {
  eventQueue.eq.sort((a, b) => {
    const index1 = eventSequence?.indexOf(a?.type);
    const index2 = eventSequence?.indexOf(b?.type);
    return index1 - index2;
  });
  eventQueue.eq.forEach((e) => {
    e?.cb();
  });
  eventQueue.eq = [];
};

const trackPageViewAndScheduleExecuteEventQueue = () => {
  eventQueue.pageViewTracked = true;
  scheduleExecuteEventQueue();
};

const scheduleExecuteEventQueue = () => {
  if (timeoutRef) {
    clearTimeout(timeoutRef);
  }
  timeoutRef = setTimeout(() => {
    executeEventQueue();
  }, 400);
};

const addToEventQueue = (cb: () => void, type: string) => {
  eventQueue.eq.push({ cb, type });
  if (eventQueue.pageViewTracked) {
    scheduleExecuteEventQueue();
  }
};

/**
 * We store the state of various analytics library loaded
 * in the WeakMap mapped with window object, thus no
 * libraries are loaded twice and we use single loading
 * promise to check status everytime.
 */
// @ts-ignore
const loadingPromiseMap = globalThis?.loadingPromiseMap ?? new WeakMap();
// @ts-ignore
globalThis.loadingPromiseMap = loadingPromiseMap;

const hasLoadingPromise = (lib: string) => loadingPromiseMap.get(window)?.[lib] instanceof Promise;
const setLoadingPromise = (lib: string, promise: Promise<any>) => {
  const vars = loadingPromiseMap.get(window) ?? {};
  vars[lib] = promise;
  loadingPromiseMap.set(window, vars);
};
const getLoadingPromise = (lib: string) => loadingPromiseMap.get(window)?.[lib];

// @ts-ignore
const siteConfigMap = globalThis?.siteConfigMap ?? new WeakMap();
// @ts-ignore
globalThis.siteConfigMap = siteConfigMap;

export const setSiteConfig = (siteConfig: SiteConfig) => {
  siteConfigMap.set(window, siteConfig);
};

export const getSiteConfig = (): SiteConfig => siteConfigMap.get(window) ?? {};

const handleRetailerId = (siteConfig: any) => {
  if (siteConfig?.oem?.clientId === 'GMCA') {
    const suffix = siteConfig?.oem?.pageBrand?.toLowerCase() === 'cadillac' ? '-02' : '-01';
    return siteConfig?.oem?.retailerId + suffix;
  } else {
    return siteConfig?.oem?.retailerId;
  }
};

/**
 * Load shift tracking only once and save the instance in Weakmap
 * for future loading.
 * @param siteConfig SiteConfig
 * @returns loadingPromise
 */
const loadShiftTracking = () => {
  const siteConfig = getSiteConfig();
  if (hasLoadingPromise('shift')) {
    return getLoadingPromise('shift');
  }
  const shiftLoadingPromise = new Promise((resolve) => {
    let taggingScriptSrc = siteConfig?.oem?.taggingScriptSrc;
    if (
      process.env.APP_ENV !== 'production' ||
      siteConfig.siteSlug === 'toyotacanadademo' ||
      siteConfig.siteSlug === 'lexuscanadademo' ||
      siteConfig.siteSlug === 'nissandemov3'
    ) {
      taggingScriptSrc = siteConfig?.oem?.taggingScriptSrcStaging;
    }
    if (!taggingScriptSrc) {
      console.warn(`Cannot load analytics. Improper Tagging script src: ${taggingScriptSrc}`);
      resolve(null);
      return;
    }
    (function (i, s, o, g, r: 'sd', a, m) {
      i.ShiftAnalyticsObject = r;
      i[r] =
        i[r] ||
        function sd() {
          // @ts-ignore
          // rome-ignore lint/suspicious/noAssignInExpressions: <explanation>
          (i[r].q = i[r].q || []).push(arguments);
        };
      // @ts-ignore
      i[r].l = 1 * new Date();
      // @ts-ignore
      // rome-ignore lint:
      (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
      // @ts-ignore
      a.async = 1;
      // @ts-ignore
      a.src = g;
      // @ts-ignore
      a.onload = () => {
        if (
          typeof window?.sd !== 'undefined' &&
          siteConfig?.oem?.clientId &&
          siteConfig?.oem?.retailerId &&
          siteConfig?.oem?.providerId
        ) {
          const formattedRetailerId = handleRetailerId(siteConfig);
          window.sd('create', siteConfig.oem.clientId, formattedRetailerId, siteConfig.oem.providerId);
        }
        resolve(null);
      };
      // @ts-ignore
      m.parentNode.insertBefore(a, m);
    })(window, document, 'script', taggingScriptSrc, 'sd');
  });
  setLoadingPromise('shift', shiftLoadingPromise);
  return shiftLoadingPromise;
};

/**
 * Load sourcebuster. Required for setting cookies to track
 * from which campaign the user has landed on the page.
 * @returns Promise
 */
const loadSourcebuster = () => {
  if (hasLoadingPromise('sourcebuster')) {
    return getLoadingPromise('sourcebuster');
  }
  const sourcebusterLoadingPromise = new Promise((resolve) => {
    (async () => {
      const sbjs = await (() => import('sourcebuster'))();
      sbjs?.default?.init?.({
        lifetime: 0,
        session_length: 1,
        typein_attributes: {
          source: 'Typed/Bookmarked',
          medium: '(none)',
        },
        callback: () => {
          window.sbjs = sbjs.default;
          resolve(null);
        },
      });
    })();
  });
  setLoadingPromise('sourcebuster', sourcebusterLoadingPromise);
  return sourcebusterLoadingPromise;
};

/**
 * Load GTM once and save the instance in Weakmap
 * for future loading.
 * @returns loadingPromise
 */
const loadGlobalGTM = () => {
  if (hasLoadingPromise('globalGtm')) {
    return getLoadingPromise('globalGtm');
  }

  const globalGtmLoadingPromise = new Promise((resolve) => {
    (function (w, d, s, l, i) {
      // @ts-ignore
      w[l] = w?.[l] || [];
      // @ts-ignore
      w[l]?.push?.({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js',
      });
      // @ts-ignore
      const f = d.getElementsByTagName(s)[0];
      const j = d.createElement(s);
      const dl = l !== 'dataLayer' ? `&l=${l}` : '';
      j.onload = resolve;
      // @ts-ignore
      j.async = true;
      // @ts-ignore
      j.src = `https://www.googletagmanager.com/gtm.js?id=${i}${dl}`;
      // @ts-ignore
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-N3TKB8M');
  });
  setLoadingPromise('globalGtm', globalGtmLoadingPromise);
  return globalGtmLoadingPromise;
};

export const loadAnalytics = async () => {
  const disableThirdParty = window?.location?.search.indexOf('disableThirdParty') !== -1;
  const siteConfig = getSiteConfig();
  if (disableThirdParty) {
    return;
  }
  if (siteConfig.addGa4GtmContainer) {
    await loadGlobalGTM();
  }
  await loadShiftTracking();
  await loadSourcebuster();
};

const acceptedPageTypes: Record<string, string[]> = {
  toyota: [
    'Home',
    'Showroom',
    'Model Showroom',
    'Brochure',
    'Trade In',
    'Vehicle Listing',
    'Vehicle Details',
    'Test Drive',
    'Dealer Specials',
    'OEM Incentives',
    'Service Specials',
    'CPOV Program',
    'Finance',
    'Service',
    'Schedule Service',
    'Tire Store',
    'Parts',
    'Accessories',
    'About Us',
    'Hours & Directions',
    'Contact Us',
    'Custom Dealer Content',
    'Other',
    'Page Not Found',
    'Blog',
  ],
  gmca: [
    'Home',
    'Showroom',
    'Model Showroom',
    'Brochure',
    'Trade In',
    'Vehicle Listing',
    'Vehicle Details',
    'Test Drive',
    'Dealer Specials',
    'OEM Incentives',
    'Service Specials',
    'Finance',
    'Finance Prequalification',
    'Service',
    'Schedule Service',
    'Tire Store',
    'Parts',
    'Accessories',
    'About Us',
    'Hours & Directions',
    'Contact Us',
    'Custom Dealer Content',
    'Other',
    'Page Not Found',
    'Blog',
    'Business Elite',
    'OnStar',
    'EVLive',
  ],
};

const overridePageTypeMap: Record<string, Record<string, string>> = {
  toyota: { company: 'About Us' },
  gmca: { oilchange: 'Service' },
};

const pageTypeMap: Record<string, string> = {
  home: 'Home',
  srp: 'Vehicle Listing',
  vdp: 'Vehicle Details',
  404: 'Page Not Found',
  scheduleservice: 'Schedule Service',
  serviceoffers: 'Service Offers',
  hoursdirections: 'Hours & Directions',
};

const gmFormTypes = [
  'Get a Quote',
  'Test Drive',
  'Request More Info',
  'email a Friend',
  'General Contact',
  'Service',
  'Parts',
  'Schedule Service',
  'Employment',
  'Trade In',
  'Finance',
  'Payment Estimator',
  'Specials',
  'Vehicle Finder',
  'Dealer Custom',
  'Make an Offer',
  'Send to Mobile',
  'Other',
];

const getPageType = (type: string) => {
  const siteConfig = getSiteConfig();
  const clientId = (siteConfig?.oem?.clientId ?? '').toLowerCase();
  const currentUrl = new URL(window.location.href);
  const ref = currentUrl.searchParams.get('ref') || '';
  const path = ref || currentUrl.pathname;
  let pageType = '';
  if (
    path.toLowerCase().indexOf('/inventory/new-specials') !== -1 ||
    path.toLowerCase().indexOf('/inventory/used-specials') !== -1
  ) {
    pageType = 'Dealer Specials';
  }
  if (path.toLowerCase().indexOf('/ev-live') !== -1) {
    pageType = 'EVLive';
  }
  // if body has class model-showroom then pageType = 'Model Showroom'
  // if body has class showroom then pageType = 'Showroom'

  const acceptedPageTypeLC = deepClone(acceptedPageTypes);
  Object.keys(acceptedPageTypeLC).forEach((key) => {
    acceptedPageTypeLC[key.toLowerCase()] = acceptedPageTypeLC[key].map((t: string) => t.toLowerCase());
  });

  const fallbackPageType: Record<string, string> = {
    toyota: 'other',
    gmca: 'Custom Dealer Content',
  };
  // Check if client id exists.
  // check if overridePageTypeMap[clientId][page_type] exists and return if so.
  // Then check in pageTypeMap, if exists then set that value to that page type map
  // No check if the page_value is accepted in the clientID, if not accepted then
  // send the fallback page type, if accepted then only send the page type
  const overridePageType = overridePageTypeMap?.[clientId]?.[type] ?? '';
  if (overridePageType) {
    return overridePageType;
  }
  pageType = pageTypeMap?.[type] ?? type;
  if (
    Array.isArray(acceptedPageTypeLC?.[clientId]) &&
    acceptedPageTypeLC[clientId].indexOf(pageType.toLowerCase()) !== -1
  ) {
    const index = acceptedPageTypeLC[clientId].indexOf(pageType.toLowerCase());
    return acceptedPageTypes?.[clientId]?.[index] ?? pageType;
  }

  return (fallbackPageType?.[clientId] ?? type) || '';
};

const getPageBrand = () => {
  const siteConfig = getSiteConfig();
  return siteConfig.oem?.pageBrand ?? '';
};

const getDealerBac = () => {
  const siteConfig = getSiteConfig();
  return siteConfig.dealer?.bacId || false;
};

const getDealerTda = () => {
  const siteConfig = getSiteConfig();
  return siteConfig?.toyotaTdaNumber || false;
};

const getTrafficSource = async () => {
  await loadSourcebuster();
  const { sbjs }: any = window;
  if (sbjs?.get?.current?.src === 'Typed/Bookmarked') return 'Typed/Bookmarked';
  if (sbjs?.get?.current?.mdm === 'cpc') return 'Paid Search';
  if (sbjs?.get?.current?.mdm === 'organic') return 'Organic Search';
  return sbjs?.get?.current?.src ?? '';
};

const getFuelType = (fueltype?: string) => (fueltype?.toLowerCase?.() === 'gasoline fuel' ? 'Gasoline' : fueltype);

const getVehicleStatus = (
  query?: URLSearchParams,
  vehicleDetails?: VehicleResponse,
  isToyotaCanada?: boolean,
  searchResultHasCertified?: boolean,
) => {
  const searchParams = query ?? new URLSearchParams(window.location.search);
  let type = '';
  if (query) {
    // we're probably on srp
    if (searchParams.has('condition') && searchParams.get('condition') === 'certified') {
      type = 'CPO';
    }

    // add exisiting type to list if it exists
    if (searchParams.has('type')) {
      type = type
        ? isToyotaCanada
          ? type
          : `${type},${searchParams.get('type')}`
        : searchParams.get('type') || 'Mixed';
    }
    const typeArr = (searchParams?.get('type')?.split(',') ?? [])?.filter(
      (t: string) => isToyotaCanada && t?.toLowerCase() !== 'demo',
    );
    if (searchParams.has('type') && typeArr?.length > 1) {
      type = 'Mixed';
    }
    if (searchParams.has('type') && typeArr?.length === 1) {
      type = typeArr?.[0];
    }
    if (
      !searchParams.has('condition') &&
      searchParams.has('type') &&
      searchParams.get('type')?.toLowerCase() === 'used' &&
      searchResultHasCertified &&
      isToyotaCanada
    ) {
      type = 'Mixed';
    }
    if (!searchParams.has('type') && !searchParams.has('condition')) {
      type = 'Mixed';
    }
  } else if (vehicleDetails) {
    // we're probably on vdp or Quickview
    type = (vehicleDetails?.isCertified || !!Number(vehicleDetails?.certified) ? 'CPO' : vehicleDetails.type) || '';
  }
  return type;
};

const getVehicleDetails = (pageType: string, vehicle: VehicleResponse) => {
  let vehicleDetails = {
    type: getVehicleStatus(undefined, vehicle),
    status: getVehicleStatus(undefined, vehicle),
    year: vehicle.year,
    make: vehicle.make ?? '',
    model: vehicle.model ?? '',
    trim: vehicle.trim ?? '',
    stockNumber: vehicle.stock,
    fuelType: getFuelType(vehicle.fueltype) ?? '',
    bodyStyle: vehicle.standardbody ?? '',
    driveTrain: vehicle.drivetrain ?? '',
    exteriorColor: vehicle.extcolorgeneric ?? '',
    engine: vehicle.engdescription ?? '',
    transmission: vehicle.trans ?? '',
    interiorColor: vehicle.intcolor ?? '',
    vin: vehicle.vin ?? '',
    msrp: vehicle.msrp,
    displayedPrice: vehicle.display_price ?? '',
  };

  /**
   * @todo check why this patch was applied!
   */
  if (getPageType(pageType).toLowerCase() === 'all new qx55') {
    vehicleDetails = {
      type: 'new',
      status: 'new',
      year: 2022,
      make: 'Infiniti',
      model: 'QX55',
    } as typeof vehicleDetails;
  }
  return removeUndefined(vehicleDetails);
};

const getDataLayerVariables = async (pageType: string, vehicle?: VehicleResponse) => {
  const siteConfig = getSiteConfig();
  const type = getPageType(pageType);
  return {
    pageType: type,
    websiteTier: 'Tier 3',
    pageBrand: getPageBrand(),
    sessionId: getSessionId(),
    trafficType: await getTrafficSource(),
    language: siteConfig?.siteLanguage ?? 'en',
    ...(getDealerBac() ? { dealerBac: getDealerBac() } : {}),
    ...(getDealerTda() ? { dealertda: getDealerTda() } : {}),
    dealerZipCode: siteConfig?.dealer?.zipCode ?? '',
    dealerCity: siteConfig?.dealer?.city ?? '',
    dealerState: siteConfig?.dealer?.state ?? '',
    dealerName: siteConfig?.siteName ?? '',
    siteTechnologyVersion: '1',
    ...(vehicle
      ? {
          vehicleDetails: getVehicleDetails(pageType, vehicle),
        }
      : {}),
  };
};

const ascDataLayerMap: any = {
  home: 'home',
  'contact us': 'contact',
  srp: 'itemlist',
  vdp: 'item',
  specials: 'Dealer Specials',
};

const initiateAscDataLayer = async (pageType: string, displayedRecords = 0) => {
  // asc_datalayer code
  const siteConfig = getSiteConfig();
  const ascPageType = ascDataLayerMap[pageType?.toLowerCase()] ?? 'custom';

  window.asc_datalayer = {
    affiliation: (siteConfig.oem?.providerId ?? 'FOXDEALER').toLowerCase(),
    currency: 'usd',
    events: [],
    items: [],
    language: siteConfig.siteLanguage ?? 'en',
    // measurement_ids: selectedMeasurementIds,
    oem_brand: siteConfig?.oem?.pageBrand?.toLowerCase(),
    oem_code: siteConfig?.oem?.retailerId,
    page_type: ascPageType,
    platform_custom: {},
    measurement_ids: [],
    store_name: siteConfig?.siteName?.toLowerCase() ?? '',
  };

  ascItemSet.clear();
  ascEventSet.clear();

  trackAscEvent(
    'asc_pageview',
    {
      page_type: ascPageType,
      event: 'asc_pageview',
      item_results: displayedRecords === 0 ? null : displayedRecords.toString(),
      error_code: null,
    },
    'ascPageView',
  );
};

const getT3Object = (pageType?: string, vehicle?: VehicleResponse) => {
  const siteConfig = getSiteConfig();
  const path = window?.location?.pathname ?? '';
  const evPages = [
    'ev-benefits',
    'ev-carefree-plus',
    'ev-vs-ice',
    'leaf-vs-ariya',
    'ev-faq',
    'how-do-evs-work',
    'charge-range-battery',
    'ev-home-charging',
  ];
  const evPageIndex = evPages.findIndex((p) => path?.indexOf(p) > -1);
  const getT3PageType = () => {
    let type = pageType ?? '';
    const dic: Record<string, string> = {
      srp: 'Search Results',
      vdp: 'Vehicle Details',
      testdrive: 'ScheduleTestDriveForm_D',
    };
    if (path.indexOf('evcenter') > -1) {
      type = 'ev center';
    } else if (evPageIndex > -1) {
      type = 'ev-education';
    }
    return dic?.[type] || type;
  };
  const getPageTool = () => {
    // key is the pagetype
    let type = pageType ?? '';
    const vals: Record<string, string> = {
      srp: 'Search Inventory',
      payment_calc: 'payment estimator',
    };
    if (path.indexOf('evcenter') > -1) {
      type = 'ev center';
    } else if (evPageIndex > -1) {
      type = 'ev education';
    }
    return vals?.[getT3PageType()] || type;
  };
  if (
    window.location.pathname?.indexOf('2024-nissan-leaf') > -1 ||
    window.location.pathname?.indexOf('2024-nissan-gtr') > -1
  ) {
    return {
      siteProvider: 'FoxDealer',
      siteDomain: window?.location?.host ?? '',
      siteEnvironment: process.env.APP_ENV === 'production' ? 'prod' : 'stage',
      siteTheme: 'default_theme',
      siteLanguageCode: siteConfig?.siteLanguage,
      pageHier1: 't3',
      pageHier2: 'VLP',
      pageHier3: window?.location?.pathname ?? '',
      pageHier4: document.title ?? '',
      pageTool: 'showroom',
      dealerId: siteConfig?.oem?.retailerId ?? '',
      dealerName: siteConfig.siteName ?? '',
      dealerAddress: siteConfig?.dealer?.address ?? '',
      dealerZipCode: siteConfig?.dealer?.zipCode ?? '',
      userZipCode: '',
      vehicleModel:
        window?.location?.pathname?.indexOf('2024-nissan-leaf') > -1
          ? 'LEAF'
          : window?.location?.pathname?.indexOf('2024-nissan-gtr') > -1
          ? 'GTR'
          : '',
      vehicleYear: '2024',
      vehicleVersion: vehicle?.trim ?? '',
      vehiclePrice: vehicle?.display_price ?? '',
    };
  } else {
    return {
      siteProvider: 'FoxDealer',
      siteDomain: window?.location?.host ?? '',
      siteEnvironment: process.env.APP_ENV === 'production' ? 'prod' : 'stage',
      siteTheme: 'default_theme',
      siteLanguageCode: siteConfig?.siteLanguage,
      pageHier1: 't3',
      pageHier2: getT3PageType() ?? '',
      pageHier3: window?.location?.pathname ?? '',
      pageHier4: document?.title ?? '',
      pageTool: getPageTool(),
      dealerId: siteConfig?.oem?.retailerId ?? '',
      dealerName: siteConfig?.siteName ?? '',
      dealerAddress: siteConfig?.dealer?.address ?? '',
      dealerZipCode: siteConfig?.dealer?.zipCode ?? '',
      userZipCode: '',
      vehicleModel: vehicle?.model ?? '',
      vehicleYear: vehicle?.year ?? '',
      vehicleVersion: vehicle?.trim ?? '',
      vehiclePrice: vehicle?.display_price ?? '',
    };
  }
};

const loadAdobeTracker = () => {
  // load t3 adobe tracker
  typeof window?._satellite !== 'undefined'
    ? window?._satellite?.pageBottom()
    : console.log("TRACKING ERROR: satellite.js isn't on the page!");
};

const loadT3Gtm = () => {
  if (hasLoadingPromise('t3GtmScript')) {
    return getLoadingPromise('t3GtmScript');
  }
  const t3GtmScriptPromise = new Promise((resolve) => {
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    const f = document.getElementsByTagName('script')[0];
    const t3GtmScript = document.createElement('script');
    t3GtmScript.async = true;
    t3GtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-M8LD4PJ&l=dataLayer';
    t3GtmScript.onload = resolve;
    f?.parentNode?.insertBefore(t3GtmScript, f);
  });
  setLoadingPromise('t3GtmScript', t3GtmScriptPromise);
  return t3GtmScriptPromise;
};

export const t3SendEvent = (name: string, values: Record<string, any>) => {
  window?._satellite?.track(`t3${name}`, values);
  window.dataLayer.push({
    event: `nissan-t3-tagging-${name}`,
    'nissan-t3-tagging': values,
  });
};

const sendFilterProps = () => {
  const query = new URLSearchParams(window.location.search);
  const slugParams = parseInventoryUrlParams(window?.location?.pathname);
  if (slugParams) {
    slugParams.forEach((data, key) => {
      query.append(key, data);
    });
  }
  const priceArr = (query.get('display_price') || '').split('|');
  const firstPrice = (priceArr?.[0] ?? '').split(',');
  const filterProps = {
    searchQuery: query?.toString() ?? '',
    status: getVehicleStatus(query),
    year: query.get('year') || 'all',
    make: query.get('make') || 'all',
    model: query.get('model') || 'all',
    minPrice: firstPrice?.[0].trim() ? firstPrice?.[0].trim() : 'all',
    maxPrice: firstPrice?.[1] ?? 'all',
    trim: query.get('trim') || 'all',
    driveTrain: query.get('drivetrain') || 'all',
    color: query.get('extcolorgeneric') || 'all',
    bodyStyle: query.get('standardbody') || 'all',
    features: query.get('priority_option') || 'all',
    category: 'all',
  };
  const evtName = 'TrackInventoryResultsKvp';
  t3SendEvent(evtName, filterProps);
};

const adobeLoaded = async (pagetype?: string) => {
  await loadAdobeTracker();
  await loadT3Gtm();
  // listeners
  // $doc.on('click', '[data-fda-category="clickToCall"]', t3_clickToCall);
  //$doc.on('click','nav', t3_navClicks);
  // $doc.on('click', t3_allClicks); // track all clicks
  // srp load / filter
  //document.addEventListener('fde__page_object_loaded', send_filter_props);
  if (pagetype === 'srp') {
    sendFilterProps();
  }
};

const loadT3GtmAdobeAnalytics = (pageType: string, vehicle?: VehicleResponse) => {
  const adobeJsFile = {
    staging: '//assets.adobedtm.com/de7bac0b5081/8b264761c8aa/launch-b93a306fab9e-staging.min.js',
    prod: '//assets.adobedtm.com/de7bac0b5081/8b264761c8aa/launch-40ec421876b8.min.js',
  };
  const t3Object = getT3Object(pageType, vehicle);
  window.t3 = { adobe: { tagging: t3Object } };
  const t3TrackPageLoadIndex = window.dataLayer.findIndex((i: any) => i?.event === 'nissan-t3-tagging-TrackPageLoad');
  if (t3TrackPageLoadIndex > -1) {
    window.dataLayer.splice(t3TrackPageLoadIndex, 1);
    window.dataLayer.push({
      event: 'nissan-t3-tagging-TrackPageLoad',
      'nissan-t3-tagging': t3Object,
    });
  } else {
    window.dataLayer.push({
      event: 'nissan-t3-tagging-TrackPageLoad',
      'nissan-t3-tagging': t3Object,
    });
  }
  const adobeScriptUrl = process.env.APP_ENV !== 'production' ? adobeJsFile?.staging : adobeJsFile?.prod;
  const scriptTag = document.createElement('script');
  scriptTag.src = adobeScriptUrl;
  scriptTag.onload = () => adobeLoaded(pageType);
  document.body.appendChild(scriptTag);
};

export const trackPageView = async (pageType: string, vehicle?: VehicleResponse, displayedRecords = 0) => {
  const siteConfig = getSiteConfig();
  await loadAnalytics();
  if (typeof window?.sd !== 'undefined') {
    const dataLayer = await getDataLayerVariables(pageType, vehicle);
    window.sd('dataLayer', dataLayer);
    window.sd('send', 'pageview');
    console.info('Shift Track:: pageview', dataLayer);
    trackPageViewAndScheduleExecuteEventQueue();
  }
  if (lastPathname !== window.location.pathname) {
    lastPathname = window.location.pathname;
    initiateAscDataLayer(pageType, displayedRecords);
    if (!eventQueue.pageViewTracked) {
      trackPageViewAndScheduleExecuteEventQueue();
    }
  }
  if (siteConfig?.options?.siteTags?.includes('te-nissan')) {
    await loadT3GtmAdobeAnalytics(pageType, vehicle);
  }
  // ga('send', 'pageview');
  // dataLayer.push({
  //   event: 'pageview',
  // });
};

export const trackGetDirections = async () => {
  await loadAnalytics();
  addToEventQueue(() => {
    if (typeof window.sd !== 'undefined') {
      window.sd('dataLayer', {
        events: 'getDirections',
      });
      window.sd('send');
      console.info('Shift Track:: getDirections');
    }
  }, 'getDirections');
};

const clickEventHandler: EventListener = async (e) => {
  const { target } = e;
  const siteConfig = getSiteConfig();
  let eventData: Record<string, any> = {};
  // Only proceed if target is instance of HTMLElement
  if (target instanceof HTMLElement) {
    const getDirectionsElement = target?.closest('[data-events="getDirections"]');
    if (getDirectionsElement instanceof HTMLElement) {
      await trackGetDirections();
      return;
    }

    // FDA - Click Touch
    const fdaClickElement = target?.closest('[data-fda-action="click/touch"]');
    if (fdaClickElement instanceof HTMLElement) {
      const { fdaAction: _fdaAction, events, ...properties } = fdaClickElement.dataset;
      if (typeof events === 'string' && events) {
        eventData = {
          ...(Object.keys(properties).length
            ? {
                [events]: properties,
              }
            : {}),
          events,
        };
        const pageViewEvent =
          window.asc_datalayer.events.find((e: any) => e.event === 'asc_item_pageview') ??
          window.asc_datalayer.events.find((e: any) => e.event === 'asc_pageview');
        const itemDetails: Record<string, string> = {};
        const itemDetailsKeys = Object.keys(pageViewEvent).filter((k) => {
          return k.indexOf('item_') !== -1;
        });
        itemDetailsKeys.forEach((k) => {
          itemDetails[k] = pageViewEvent[k];
        });
        if (events === 'clickToCall') {
          trackAscEvent(`clickToCall_${Date.now()}`, {
            event: 'asc_click_to_call',
            page_type: pageViewEvent?.page_type ?? 'home',
            comm_type: 'voice',
            affiliation: 'native',
            // @ts-ignore
            comm_phone_number: (fdaClickElement.href ?? '').replace('tel:', '').replace(/[\(\)\- ]/gi, ''),
            department: properties?.clickToCallDepartment ?? null,
            ...itemDetails,
            // page_type: pageViewEvent?.page_type ?? 'home',
          });
          if (siteConfig?.options?.siteTags?.includes('te-nissan')) {
            t3SendEvent('TrackClickToCall', {
              clickToCallDepartment: properties?.clickToCallDepartment,
              // @ts-ignore
              clickToCallPhone: (fdaClickElement?.href ?? '').replace('tel:', '').replace(/[\(\)\- ]/gi, ''),
            });
          }
        }

        if (events === 'carouselClick') {
          const linkUrl = new URL(properties?.linkUrl ?? window.location.href, window.location.host).toString();
          trackAscEvent(`carouselClick_${Date.now()}`, {
            creative_name: properties?.title ?? '',
            event: 'asc_media_interaction',
            event_action_result: 'click/touch',
            link_url: linkUrl,
            media_type: properties?.mediaType,
            page_type: window?.asc_datalayer?.page_type ?? 'custom',
            ...itemDetails,
            // page_type: pageViewEvent?.page_type ?? 'home',
          });
          if (siteConfig?.options?.siteTags?.includes('te-nissan')) {
            const activeSlideIndex = properties?.assetPosition;
            const interactionLabel = `${properties?.title} slide`;
            const interactionValue = `${activeSlideIndex}/${properties?.totalAsset}`;
            t3SendEvent('TrackCarousel', {
              interactionLabel: interactionLabel,
              interactionValue: interactionValue,
            });
          }
        }
      }
    }

    const linkClickElement = target?.closest(
      '[data-fda-category="serviceOfferClick"], [href*="/service/schedule-service"],[href*="/schedule-service"]',
    );
    if (linkClickElement instanceof HTMLElement) {
      const { offername } = linkClickElement.dataset;
      if (offername) {
        eventData = {
          serviceOfferClick: {
            offername,
          },
          events: 'serviceOfferClick',
        };
      } else if (siteConfig?.oem?.pageBrand) {
        eventData = {
          events: 'scheduleServiceClick',
        };
      }
    }
  }
  if (
    siteConfig?.options?.siteTags?.includes('te-nissan') &&
    // @ts-ignore
    ((target?.localName === 'cs-buy-widget-v2' && target?.nodeName === 'CS-BUY-WIDGET-V2') ||
      // @ts-ignore
      (target?.localName === 'cs-buy-widget' && target?.nodeName === 'CS-BUY-WIDGET'))
  ) {
    const evtName = 'TrackLinkClick';
    const value = {
      linkUrl: 'https://shopathome.carsaver.com/',
      // @ts-ignore
      linkText: target?.innerHTML ?? 'Buy Now',
    };
    t3SendEvent(evtName, value);
  }

  if (Object.keys(eventData).length) {
    await loadAnalytics();
    addToEventQueue(() => {
      if (typeof window.sd !== 'undefined') {
        const dataLayer = eventData;
        window.sd('dataLayer', dataLayer);
        window.sd('send');
        console.info('Shift Track:: clickEventHandler', dataLayer);
      }
    }, 'clickEventHandler');
  }
};

export const monitorEvents = () => {
  document.addEventListener('click', clickEventHandler, { passive: true });
  return () => {
    document.removeEventListener('click', clickEventHandler);
  };
};

const getGMFormType = (title: string) => {
  // replace null value with "other"
  let formType = !title ? 'Other' : title;

  // remove Fox - identifier from form titles
  formType = formType.replace(/FOX - /gim, '');

  // Forms with "Parts" in their title will return only Parts
  if (/Parts/gim.test(formType)) {
    formType = 'Parts';
  } else if (/Service/gim.test(formType)) {
    formType = 'Service';
  } else if (/Trade/gim.test(formType)) {
    formType = 'Trade In';
  } else if (/Contact/gim.test(formType)) {
    formType = 'General Contact';
  } else if (/sms|phone|mobile/gim.test(formType)) {
    formType = 'Send to Mobile';
  } else if (/Test Drive/gim.test(formType)) {
    formType = 'Test Drive';
  } else if (/Get Best Price/gim.test(formType)) {
    formType = 'Get a Quote';
  }

  // if no match valid form types - set to fallback
  if (!gmFormTypes.some((gft) => gft.toLowerCase() === formType.toLowerCase())) {
    formType = 'Dealer Custom';
  }

  return formType;
};

const getLexusCanadaFormType = (title: string) => {
  let formType = !title ? 'Other' : title;
  formType = formType.replace(/FOX - /gim, '');

  if (/Parts/gim.test(formType)) {
    formType = 'Parts';
  } else if (/Service/gim.test(formType)) {
    formType = 'Schedule Service';
  } else if (/Trade/gim.test(formType)) {
    formType = 'Trade In';
  } else if (/Contact/gim.test(formType)) {
    formType = 'Contact Us';
  } else if (/sms|phone|mobile/gim.test(formType)) {
    formType = 'Send to Mobile';
  } else if (/Test Drive/gim.test(formType)) {
    formType = 'Test Drive';
  } else if (/Get Best Price/gim.test(formType)) {
    formType = 'Get a Quote';
  } else if (/Finance/gim.test(formType)) {
    formType = 'Finance';
  } else {
    formType = 'Dealer Custom'; // if there is no match to valid shift form types - set to shift fallback
  }

  return formType;
}

export const trackFormShown = async ({
  displayType,
  title,
  vehicle,
}: {
  displayType: 'in-page' | 'modal';
  title: string;
  vehicle?: VehicleResponse;
}) => {
  const siteConfig = getSiteConfig();
  let formType = title;

  if (siteConfig.oem?.clientId === 'LEXUSCA') {
    formType = getLexusCanadaFormType(title)
  }

  // If Bac ID exists, it means it is a GMCA site
  if (siteConfig.dealer?.bacId) {
    formType = getGMFormType(title);
  }
  const eventData = {
    formType,
    displayType,
    events: 'formShown',
    ...(vehicle ? { formVehicle: getVehicleDetails('', vehicle) } : {}),
  };
  await loadAnalytics();
  addToEventQueue(() => {
    if (typeof window.sd !== 'undefined') {
      const dataLayer = eventData;
      window.sd('dataLayer', dataLayer);
      window.sd('send');
      console.info('Shift Track:: formShown', dataLayer);
    }
  }, 'formShown');
};

export const trackFormInitiated = async ({
  displayType,
  title,
  vehicle,
  ascFormData,
}: {
  displayType: 'in-page' | 'modal';
  title: string;
  vehicle?: VehicleResponse;
  ascFormData: Record<string, string>;
}) => {
  const siteConfig = getSiteConfig();
  let formType = title;

  if (siteConfig.oem?.clientId === 'LEXUSCA') {
    formType = getLexusCanadaFormType(title)
  }

  // If Bac ID exists, it means it is a GMCA site
  if (siteConfig.dealer?.bacId) {
    formType = getGMFormType(title);
  }
  const eventData = {
    formType,
    displayType,
    events: 'formInitiation',
    ...(vehicle ? { formVehicle: getVehicleDetails('', vehicle) } : {}),
  };
  await loadAnalytics();
  addToEventQueue(() => {
    if (typeof window.sd !== 'undefined') {
      const dataLayer = eventData;
      window.sd('dataLayer', dataLayer);
      window.sd('send');
      console.info('Shift Track:: formInitiation', dataLayer);
    }
  }, 'formInitiation');

  trackAscEvent(`asc_form_submission_${Date.now()}`, {
    ...(ascFormData ?? {}),
    comm_type: 'form',
    status: 'start',
    department: title,
    form_name: title,
    page_type: window?.asc_datalayer?.page_type ?? 'custom',
  });
};

export const trackFormSubmit = async ({
  displayType,
  title,
  vehicle,
  leadId,
  data,
  ascFormData,
}: {
  displayType: 'in-page' | 'modal';
  title: string;
  vehicle?: VehicleResponse;
  leadId: string;
  data?: Record<string, any>;
  ascFormData: Record<string, string>;
}) => {
  const siteConfig = getSiteConfig();
  let formType = title;

  if (siteConfig.oem?.clientId === 'LEXUSCA') {
    formType = getLexusCanadaFormType(title)
  }

  // If Bac ID exists, it means it is a GMCA site
  if (siteConfig.dealer?.bacId) {
    formType = getGMFormType(title);
  }
  const eventData = {
    formType,
    displayType,
    leadId,
    ...(vehicle ? { formVehicle: getVehicleDetails('', vehicle) } : {}),
    leadType: 'lead',
    prefContact: '',
    events: 'formSubmission',
    formOptIn: 'in-implicit',
    ...(data && Object.keys(data).length ? data : {}),
  };
  await loadAnalytics();
  if (window?.myo_pigv) {
    window.dispatchEvent(new CustomEvent('_pi_rts_natively_converted'));
  }
  await addToEventQueue(() => {
    if (typeof window.sd !== 'undefined') {
      const dataLayer = eventData;
      window.sd('dataLayer', dataLayer);
      window.sd('send');
      console.info('Shift Track:: formSubmission', dataLayer);
    }
  }, 'formSubmission');

  trackAscEvent(`asc_form_submission_${Date.now()}`, {
    ...(ascFormData ?? {}),
    department: title,
    comm_type: 'form',
    page_type: window?.asc_datalayer?.page_type ?? 'custom',
    form_name: title,
    form_type: 'consumer_contact',
    comm_outcome: 'crm_update',
    lead_id: leadId,
  });

  if (siteConfig?.options?.siteTags?.includes('te-nissan')) {
    t3SendEvent('TrackLeadFormSuccess', {
      formCategory: 'lead',
      formLeadId: leadId,
      formName: title,
      formType: 'Contact Dealer',
    });
  }
};

export const trackTypedSearch = async ({ searchValue }: { searchValue: string }) => {
  await loadAnalytics();
  addToEventQueue(() => {
    if (typeof window.sd !== 'undefined') {
      const dataLayer = {
        typedSearchContent: searchValue,
        events: 'typedSearch',
      };
      window.sd('dataLayer', dataLayer);
      window.sd('send');
      console.info('Shift Track:: typedSearch', dataLayer);
    }
  }, 'typedSearch');
};

export const getAscItemDetails = (vehicle: VehicleResponse) => {
  const dateInStock = new Date((vehicle.dateinstock ?? 1) * 1000);
  return {
    item_id: (vehicle.vin ?? '').toString(),
    item_number: (vehicle.stock ?? '').toString(),
    item_price: (vehicle.msrp ?? '').toString(),
    item_condition: (vehicle.condition ?? '').toString(),
    item_year: (vehicle.year ?? '').toString(),
    item_make: (vehicle.make ?? '').toString(),
    item_model: (vehicle.model ?? '').toString(),
    item_variant: (vehicle.trim ?? '').toString(),
    item_color: (vehicle.extcolorgeneric ?? '').toString(),
    item_type: (vehicle.condition ?? '').toString(),
    item_category: (vehicle.marketclass ?? '').toString(),
    item_fuel_type: (vehicle.fueltype ?? '').toString(),
    item_inventory_date: `${dateInStock.getFullYear()}-${dateInStock.getMonth()}-${dateInStock.getDate()}`,
    item_results: null,
  };
};

export const trackAscItem = (vehicle: VehicleResponse) => {
  addToEventQueue(() => {
    if (ascItemSet.has(vehicle.vin)) {
      return;
    }
    ascItemSet.add(vehicle.vin);

    window.asc_datalayer.items.push(getAscItemDetails(vehicle));
  }, 'trackVehicle');
};

export const trackAscEvent = (id: string, eventDetails: any = {}, priority = 'ascEvent') => {
  addToEventQueue(() => {
    if (ascEventSet.has(id)) {
      return;
    }
    ascEventSet.add(id);
    if (Object.keys(eventDetails).length) {
      const eventData = {
        ...eventDetails,
        event_owner: eventDetails.event_owner ?? 'Fox Dealer',
        ...(window?.asc_datalayer?.items.length &&
          eventDetails?.media_type !== 'QuickView' && {
            item_id: window?.asc_datalayer.items[0].item_id,
            item_number: window?.asc_datalayer.items[0].item_number,
            item_price: window?.asc_datalayer.items[0].item_price,
            item_condition: window?.asc_datalayer.items[0].item_condition,
            item_year: window?.asc_datalayer.items[0].item_year,
            item_make: window?.asc_datalayer.items[0].item_make,
            item_model: window?.asc_datalayer.items[0].item_model,
            item_variant: window?.asc_datalayer.items[0].item_variant,
            item_color: window?.asc_datalayer.items[0].item_color,
            item_type: window?.asc_datalayer.items[0].item_type,
            item_category: window?.asc_datalayer.items[0].item_category,
            item_fuel_type: window?.asc_datalayer.items[0].item_fuel_type,
            item_inventory_date: window?.asc_datalayer.items[0].item_inventory_date,
          }),
      };

      const siteConfig = getSiteConfig();
      const excludeAscTaggingSites = ['Fox Dealer'];

      // @ts-ignore
      if (!excludeAscTaggingSites.includes(siteConfig.siteName)) {
        window.asc_datalayer.events.push({
          ...eventData,
          sendTo: Array.from(
            new Set([
              // ...Other Measurement Its
              // .. global measurement id
              ...(eventDetails?.sendTo ?? []),
            ]),
          ),
        });

        if (window?.dataLayer && eventData.event) {
          window.dataLayer.push({
            event: eventData.event,
            asc_tagging: eventData,
          });
        }
      }
    }
  }, priority);
};

export const trackVehicleList = async (vehicleList: VehicleResponse[]) => {
  vehicleList.forEach((v) => trackAscItem(v));
};

export const trackSRPFilterEvent = (fieldName: string, displayName: string, checked = false) => {
  trackAscEvent(`asc_element_configuration_${Date.now()}`, {
    element_type: 'srpFilter',
    element_value: `${window.location.pathname}${window.location.search}`,
    element_text: displayName ?? '',
    page_type: 'itemlist',
    event_action_result: 'filter',
    event: 'asc_element_configuration',
    event_action: 'select',
    product_name: 'Fox Dealer',
    element_subtype: 'toggle',
    element_title: `SRP Filter ${fieldName}`,
    element_state: checked ? 'active' : 'not active',
  });
};

export const trackSearchFilterProps = async ({
  total,
  isToyotaCanada = false,
  searchResultHasCertified = false,
}: { total: number; isToyotaCanada?: boolean; searchResultHasCertified?: boolean }) => {
  const query = new URLSearchParams(window.location.search);
  const slugParams = parseInventoryUrlParams(window?.location?.pathname);
  if (slugParams) {
    slugParams.forEach((data, key) => {
      query.append(key, data);
    });
  }
  const priceArr = (query.get('display_price') || '').split('|');
  const firstPrice = (priceArr?.[0] ?? '').split(',');
  const filterProps = {
    status: getVehicleStatus(query, undefined, isToyotaCanada, searchResultHasCertified),
    year: query.get('year') || 'all',
    make: query.get('make') || 'all',
    model: query.get('model') || 'all',
    minPrice: firstPrice?.[0].trim() ? firstPrice?.[0].trim() : 'all',
    maxPrice: firstPrice?.[1] ?? 'all',
    trim: query.get('trim') || 'all',
    driveTrain: query.get('drivetrain') || 'all',
    color: query.get('extcolorgeneric') || 'all',
    bodyStyle: query.get('standardbody') || 'all',
    features: query.get('priority_option') || 'all',
    category: 'all',
  };
  await loadAnalytics();
  addToEventQueue(() => {
    if (typeof window.sd !== 'undefined') {
      const dataLayer = {
        countSearchResults: total,
        filterSearch: filterProps,
        events: 'filterSearch',
      };
      window.sd('dataLayer', dataLayer);
      window.sd('send');
      console.info('Shift Track (SRP):: filterSearch', dataLayer);
    }
  }, 'filterSearch');
};

export const trackVDPFilterSearch = async (vehicleDetails: VehicleResponse) => {
  const vd = getVehicleDetails('vdp', vehicleDetails);
  const priceArr = `${vd.displayedPrice}`.split('|');
  const firstPrice = (priceArr?.[0] ?? '').split(',');
  const filterProps = {
    status: vd.status,
    year: vd.year ?? '',
    make: vd.make,
    model: vd.model,
    minPrice: firstPrice?.[0] ?? 'all',
    maxPrice: firstPrice?.[1] ?? 'all',
    trim: vd.trim,
    driveTrain: vd.driveTrain,
    color: vd.exteriorColor,
    bodyStyle: vd.bodyStyle,
  };
  await loadAnalytics();
  addToEventQueue(() => {
    if (typeof window.sd !== 'undefined') {
      const dataLayer = {
        countSearchResults: 1,
        filterSearch: filterProps,
        events: 'filterSearch',
      };
      window.sd('dataLayer', dataLayer);
      window.sd('send');
      console.info('Shift Track (VDP):: filterSearch', dataLayer);
    }
  }, 'filterSearch');
};
