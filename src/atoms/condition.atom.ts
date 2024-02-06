import { selector, selectorFamily } from 'recoil-ssr';
import { siteIdAtom, siteNameAtom, siteUniqueIdAtom, themeAtom } from './site.atom';
import { uniqueId } from '@utils/constant';

export const hasSaleAndServiceViewOnlyAtom = selector({
  key: 'hasSaleAndServiceViewOnly',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const siteNames = [
      uniqueId.CARTERCADILLAC,
      uniqueId.MURRAYCADILLAC,
      uniqueId.GAUTHIERCADILLAC,
      uniqueId.ULMERCADILLAC,
      uniqueId.WOLFECADILLACCALGARY,
    ];
    return siteNames.includes(siteUniqueId);
  },
});
export const showStockVINBelowPriceInfoAtom = selector({
  key: 'howStockVINBelowPriceInfo',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const siteNames = [uniqueId.MBCINCY, uniqueId.WESTCHESTERBENZ];
    return siteNames.includes(siteUniqueId);
  },
});
export const hasDriveServiceSpecialsAtom = selector({
  key: 'hasDriveServiceSpecials',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const siteNames = [uniqueId.MYGASTONIANISSAN];
    return siteNames.includes(siteUniqueId);
  },
});
export const showHeaderSearchIconAtom = selector({
  key: 'hasSearchIconInHeader',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const siteNames = [uniqueId.SPARTANBURGTOYOTA];
    return siteNames.includes(siteUniqueId);
  },
});

export const showPartsDataAtom = selector({
  key: 'showPartsData',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const sitesToShowPartsData = [uniqueId.HONDAKINGSPORT];
    return sitesToShowPartsData.includes(siteUniqueId);
  },
});

export const showMotorStreet360Atom = selector({
  key: 'showMotorStreet360',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showMotorStreet360Sites = [uniqueId.BEAMANTOYOTA];
    return showMotorStreet360Sites.includes(siteUniqueId);
  },
});

export const blog1LayoutAtom = selector({
  key: 'blog1Layout',
  get: ({ get }) => {
    const themeName = get(themeAtom);
    const isNissanSites = ['nissantheme1'];
    return isNissanSites.includes(themeName);
  },
});

export const addStockInVdpUrlAtom = selector({
  key: 'addStockInVdpUrl',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const addStockInVdpUrlSites = [uniqueId.GAUTHIERCADILLAC];
    return addStockInVdpUrlSites.includes(siteUniqueId);
  },
});

export const showPremiumSafetyDisclaimerAtom = selector({
  key: 'showPremiumSafetyDisclaimer',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showPremiumSafetyDisclaimerSites = [uniqueId.MYGASTONIANISSAN];
    return showPremiumSafetyDisclaimerSites.includes(siteUniqueId);
  },
});
export const showSrpCallBtnAboveFormAtom = selector({
  key: 'showSrpCallBtnAboveForm',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showSrpCallBtnAboveFormSites = [
      uniqueId.HONDAKINGSPORT,
      uniqueId.HONDAMORRISTOWN,
      uniqueId.SPARTANBURGTOYOTA,
    ];
    return showSrpCallBtnAboveFormSites.includes(siteUniqueId);
  },
});
export const showHPWelcomeLogoSectionAtom = selector({
  key: 'showHPWelcomeLogoSection',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showHPWelcomeLogoSectionSites = [uniqueId.TOYOTAOFLASVEGAS];
    return showHPWelcomeLogoSectionSites.includes(siteUniqueId);
  },
});
export const tradePendingAtom = selector({
  key: 'tradePending',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const tradePendingDivMap: Record<string, { srp?: string; vdp?: string; home?: string }> = {
      [uniqueId.TOYOTAOFLASVEGAS]: {
        srp: 'w-100 p-3 sub-nav-search',
        vdp: 'w-100 p-3 sub-nav-search',
        home: 'component-subhero container',
      },
    };
    return tradePendingDivMap?.[siteUniqueId];
  },
});

export const jellybeanNoStockLabelAtom = selector({
  key: 'jellybeanNoStockLabel',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const jellybeanNoStockLabel: Record<string, string> = {
      [uniqueId.TOYOTAOFLASVEGAS]: 'Reserve Now',
    };
    return jellybeanNoStockLabel?.[siteUniqueId] ?? '';
  },
});

export const showDealerMadeNextOnQVAtom = selector({
  key: 'showDealerMadeNextOnQV',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showSrpCallBtnAboveFormSites = [uniqueId.HONDAMORRISTOWN];
    return showSrpCallBtnAboveFormSites.includes(siteUniqueId);
  },
});

export const openInstaModalOnIconClickAtom = selector({
  key: 'openInstaModalOnIconClick',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const openInstaModalOnIconClickSites = [''];
    return openInstaModalOnIconClickSites?.includes?.(siteUniqueId) ?? false;
  },
});

export const openTwitterModalOnIconClickAtom = selector({
  key: 'openTwitterModalOnIconClick',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const openTwitterModalOnIconClickSites = [''];
    return openTwitterModalOnIconClickSites?.includes?.(siteUniqueId) ?? false;
  },
});

export const runmyLeaseIdAtom = selector({
  key: 'runmyLeaseId',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const runmyLeaseScripts: Record<string, string> = {
      [uniqueId.LANDROVERVENTURA]: '6540337e687b16353e300747',
      [uniqueId.JAGUARVENTURA]: '654032c1687b16353e300746',
    };
    return runmyLeaseScripts?.[siteUniqueId] ?? '';
  },
});

export const showAdditionalLogoForNorwalkToyotaAtom = selector({
  key: 'showAdditionalLogoForNorwalkToyota',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const siteNames = [uniqueId.NORWALKTOYOTA];
    return siteNames.includes(siteUniqueId);
  },
});

export const addTrimToCarTitleAtom = selector({
  key: 'addTrimToCarTitle',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const addTrimToCarTitleSites = [uniqueId.BEAMANTOYOTA];
    return addTrimToCarTitleSites.includes(siteUniqueId);
  },
});

export const siteNameToyotaLasVegasAtom = selector({
  key: 'siteNameToyotaLasVegas',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const siteNameToyotaLasVegas = [uniqueId.TOYOTAOFLASVEGAS];
    return siteNameToyotaLasVegas.includes(siteUniqueId);
  },
});

export const showMobileBtnNavAtom = selector({
  key: 'showMobileBtnNav',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showMobileBtnNavSites = [uniqueId.SUBURBANTOYOTA, uniqueId.NORWALKTOYOTA, uniqueId.TOYOTAOFMIDLAND];
    return showMobileBtnNavSites.includes(siteUniqueId);
  },
});

export const siteNameNorwalkToyotaAtom = selector({
  key: 'siteNameNorwalkToyota',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const siteNameNorwalkToyota = [uniqueId.NORWALKTOYOTA];
    return siteNameNorwalkToyota.includes(siteUniqueId);
  },
});

export const renderVehicleVinOnSrpAtom = selector({
  key: 'renderVehicleVinOnSrp',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const renderVehicleVinOnSrpSites = [uniqueId.TOYOTAOFLASVEGAS];
    return renderVehicleVinOnSrpSites.includes(siteUniqueId);
  },
});

/** Atom will return if auto hub button should display or not  */
export const showAutoHubButtonAtom = selector({
  key: 'showAutoHubButton',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showAutoHubOnSites = [
      uniqueId.LACDJR,
      uniqueId.MONROVIACDJR,
      uniqueId.HONDASIERRA,
      uniqueId.TOYOTASB,
      uniqueId.NORWALKTOYOTA,
    ];
    return showAutoHubOnSites.includes(siteUniqueId);
  },
});
export const srpScheduleYourTestDriveButtonTextAtom = selector({
  key: 'scheduleYourTestDriveButtonText',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    let buttonText = 'Test Drive Today';
    if (siteUniqueId === uniqueId.MLADYNISSAN) {
      buttonText = 'SCHEDULE YOUR TEST DRIVE';
    }
    return buttonText;
  },
});

export const showCallUsInfoInOffersAtom = selector({
  key: 'showCallUsInfoInOffers',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showCallUsInfoInOffersSites = [uniqueId.MBOFROCKLIN];
    return showCallUsInfoInOffersSites.includes(siteUniqueId);
  },
});

/** This atom will return if vehicle status should display on the SRP, VDP and QV or not.
 *  Currently it is enabled for the JLR demo sites */
export const showVehicleStatusAtom = selector({
  key: 'showVehicleStatus',
  get: ({ get }) => {
    const themeName = get(themeAtom);
    const showVehicleStatusOnThemes = ['jaguar', 'landrover'];
    return showVehicleStatusOnThemes.includes(themeName);
  },
});
export const showBannerSearchTitleAtom = selector({
  key: 'showBannerSearchTitle',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showBannerSearchTitleSites = [uniqueId.HUDSONAUTO];
    return showBannerSearchTitleSites.includes(siteUniqueId);
  },
});

/**
 * This atom will return if calculator should be displayed in modal or not
 */
export const showCalculatorInModalAtom = selector({
  key: 'showCalculatorInModal',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showshowCalculatorInSites = [uniqueId.MLADYNISSAN];
    return showshowCalculatorInSites.includes(siteUniqueId);
  },
});
export const showTotalPriceDisclaimerAtom = selectorFamily({
  key: 'showTotalPriceDisclaimer',
  get:
    ({ totalPriceDisclaimer, carType }: { totalPriceDisclaimer: string; carType: string }) =>
    ({ get }) => {
      if (!totalPriceDisclaimer) return false;

      const siteUniqueId = get(siteUniqueIdAtom);
      const dealerSitesWithShowDesclimerToAllVehicle = [uniqueId.MBOFROCKLIN];
      if (dealerSitesWithShowDesclimerToAllVehicle.includes(siteUniqueId)) return true;

      const dealerSites = [uniqueId.SOUTHFORTCHEV];
      if (carType === 'new' || (carType === 'demo' && dealerSites.includes(siteUniqueId))) return true;

      return false;
    },
});
export const showSrpLeadFormAtom = selector({
  key: 'showSrpLeadForm',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showSrpLeadFormSites = [uniqueId.CLAREMONTTOYOTA];
    return showSrpLeadFormSites.includes(siteUniqueId);
  },
});

export const hideTimeSortingOptionsAtom = selector({
  key: 'hideTimeSortingOptions',
  get: ({ get }) => {
    const siteId = get(siteUniqueIdAtom);
    const hideTimeSortingOptionsSites = [uniqueId.MBCINCY, uniqueId.WESTCHESTERBENZ];
    return hideTimeSortingOptionsSites.includes(siteId);
  },
});

export const srpPageTypeAtom = selector({
  key: 'srpPageType',
  get: ({ get }) => {
    const themeName = get(themeAtom);
    const srpPageType: Record<string, string> = {
      lexuscanadatheme1: 'Vehicle Listing',
      toyotacanadatheme1: 'Vehicle Listing',
    };
    return (srpPageType?.[themeName] ?? 'srp') || 'srp';
  },
});

export const formDisclaimerTextAtom = selector<string>({
  key: 'formDisclaimerText',
  get: async ({ get }) => {
    const siteId = get(siteIdAtom);
    const siteName = get(siteNameAtom);
    const customFormDisclaimerSite = ['982', '968', '967'].toString();
    const defaultLabel = '';
    const customDisclaimerText = `By clicking submit, I consent to receive marketing emails/calls/text messages,
    including calls/texts made using an autodialer or a pre-rerecorded voice message,
     by or on behalf of ${siteName}, to the email and/or phone number(s) provided.
       My consent is not required as a condition of purchase.  Message and data rates may apply.  I may opt-out at any time.`;
    return customFormDisclaimerSite.includes(siteId) ? customDisclaimerText : defaultLabel;
  },
});
export const hideVDPInstalledOptionsAtom = selector({
  key: 'hideVDPInstalledOptions',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const siteNames = [uniqueId.BARRHEADFORD, uniqueId.WHITECOURTFORD];
    return siteNames.includes(siteUniqueId);
  },
});
export const showServiceNumberInFooterAtom = selector({
  key: 'showServiceNumberInFooter',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const siteNames = [uniqueId.MLADYNISSAN];
    return siteNames.includes(siteUniqueId);
  },
});