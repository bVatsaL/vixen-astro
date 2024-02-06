type OemSettings = {
  taggingScriptSrc?: string;
  taggingScriptSrcStaging?: string;
  retailerId?: string;
  providerId?: string;
  pageBrand?: string;
  clientId?: string;
  dealerMakes?: string[];
};

type SiteConfig = {
  theme?: string;
  podSlug?: string;
  siteSlug?: string;
  apiEndpoint?: string;
  pagesApiEndpoint?: string;
  siteUrls?: string[];
  siteLogo?: string;
  siteName?: string;
  siteUrl?: string;
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
  isSmartPathActive?:boolean;
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
  uniqueId: string;
  wpDomain?: string;
  id?: number;
  primaryDomain?: string;
  useSearchApiV2?:boolean
};
