// store/users.ts
import { siteConstants } from '@utils/constant';
import { atom, computed } from 'nanostores'

type SiteConfig = {
  theme?: string;
  podSlug?: string;
  siteSlug?: string;
  apiEndpoint?: string;
  pagesApiEndpoint?: string;
  siteUrls?: string[];
  siteLogo?: string;
  siteName?: string;
  siteId?: string;
  baseSiteUrl?: string;
  siteLanguage?: string;
  siteLanguages?: string[];
  expectedSiteOrigin?: string;
  dealer?: {
    zipCode?: string;
    city?: string;
    state?: string;
    name?: string;
    bacId?: string;
    address?: string;
  };
  smartpathDisclaimers?: any;
  oem?: OemSettings;
  fonts: {
    primary?: string;
  };
  colors: {
    primary?: string;
    secondary?: string;
    header?: string;
    headerBg?: string;
    navbarBg?: string;
    secondaryNavbarBg?: string;
    contactNavbarBg?: string;
    contactNavbar?: string;
    navBannerBackground?: string;
    navBannerFont?: string;
    footerLogo?: string;
    footerLogoBg?: string;
    frontpageAboutUsBg?: string;
    frontpageAboutUs?: string;
    frontpageContactUs?: string;
    frontpageContactUsBgPrimary?: string;
    frontpageContactUsBgSecondary?: string;
    findNextVehicleSearchBg?: string;
    findNextVehicleSearch?: string;
    findNextVehicleSearchBtn?: string;
    findNextVehicleSearchBtnBg?: string;
    tagrailBtnBg?: string;
    favoritesButtonBg?: string;
    favoritesButton?: string;
    carboxSpecialsRibbonBg?: string;
    carboxSpecialsRibbon?: string;
    headerTextColor?: string;
  };
  secondarySorting?: any;
  defalutOrderingKey?: string;
  fdiCustomInventoryMeta?: any;
  options?: {
    siteTags?: string[];
    gaTracker?: string[];
    callrailCode?: string;
    siteRedirects?: Record<string, string>;
    fallbackInventoryUrl?: string;
    fdiCustomInventoryUrls?: string;
    fdiSiteTags?: string[];
    instagramSettings?: {
      accessToken?: string;
      userId?: string;
    }
    ascbSettings: {
      isEnabled?: boolean,
      ascbOptions?: string,
    }
  };
  toyotaTdaNumber?: string;
  addGa4GtmContainer?: boolean;
};

export const $siteConfig = atom<SiteConfig | null>(null);

export const $apiEndpoint = computed(
  $siteConfig,
  (siteConfig) => siteConfig?.apiEndpoint ?? ''
);

export const $siteUniqueId = computed(
  $siteConfig,
  (siteConfig) => siteConstants[siteConfig?.siteId ?? '']
);

export const $searchDomainName = computed(
  $siteConfig,
  (siteConfig) => {
    let domain = new URL(siteConfig?.expectedSiteOrigin ?? '');
    const siteSlug = siteConfig?.siteSlug ?? '';
    if (siteSlug === 'hudsonauto') {
      domain = new URL('https://www.hudsonauto.com');
    }
    return domain?.host ?? '';
  },
);

export const $siteName = computed($siteConfig, siteConfig => siteConfig?.siteName ?? '');
