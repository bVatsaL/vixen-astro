import { selector, selectorFamily } from 'recoil-ssr';
import { siteIdAtom, siteUniqueIdAtom } from './site.atom';
import { UniqueID, uniqueId } from '@utils/constant';

export const showNewAggreagtionsAtom = selector({
  key: 'show-new-aggreagtions',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showNewAggreagtionsSites = [uniqueId.MYGASTONIANISSAN, uniqueId.HONDAKINGSPORT, uniqueId.HONDAMORRISTOWN];
    return showNewAggreagtionsSites?.includes?.(siteUniqueId) ?? false;
  },
});

export const showTotalPriceDisclaimerAtom = selector({
  key: 'showTotalPriceDisclaimer',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showTotalPriceDisclaimerSites = [uniqueId.SOUTHFORTCHEV];
    return showTotalPriceDisclaimerSites.includes(siteUniqueId);
  },
});

export const showDealerNameAtom = selector({
  key: 'showDealerName',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showDealerNameSites = [uniqueId.WESTCHESTERBENZ, uniqueId.MBCINCY];
    return showDealerNameSites.includes(siteUniqueId);
  },
});

export const showPaymentOptionAtom = selector({
  key: 'showPaymentOption',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showDealerNameSites = [
      uniqueId.MBESCONDIDO,
      uniqueId.WESTCHESTERBENZ,
      uniqueId.MBCINCY,
      uniqueId.MBOFROCKLIN,
      uniqueId.MBOFEDH,
    ];
    return showDealerNameSites.includes(siteUniqueId);
  },
});
export const showOfferForm = selector({
  key: 'showOfferForm',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showDealerNameSites = [uniqueId.MLADYNISSAN];
    return showDealerNameSites.includes(siteUniqueId);
  },
});
export const buyingProcessCtaTextAtom = selector({
  key: 'buyingProcessCtaText',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const buyingProcessCtaTextBySite: Record<string, string> = {
      [uniqueId.MBESCONDIDO]: 'Show Payment Options',
      [uniqueId.WESTCHESTERBENZ]: 'See Payment Options',
      [uniqueId.MBCINCY]: 'See Payment Options',
    };
    return buyingProcessCtaTextBySite?.[siteUniqueId] || 'See Payment Options';
  },
});

export const hideBuyingProcessCtaAtom = selector({
  key: 'hideBuyingProcessCta',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const hideBuyingProcessCtaSites = [uniqueId.MBESCONDIDO, uniqueId.MBOFROCKLIN, uniqueId.MBOFEDH];
    return hideBuyingProcessCtaSites.includes(siteUniqueId);
  },
});

export const removeDupicateFromCarTitleAtom = selector({
  key: 'removeDupicateFromCarTitle',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const removeDupicateFromCarTitleSites = [
      uniqueId.JAGUARVENTURA,
      uniqueId.JAGUARFAIRFIELD,
      uniqueId.COLEJAGUAR,
      uniqueId.JAGUARCERRITOS,
    ];
    return removeDupicateFromCarTitleSites.includes(siteUniqueId);
  },
});

export const hideMilesSrpResultDescAtom = selector({
  key: 'hideMilesSrpResultDesc',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const hideMilesSrpResultDesc = [uniqueId.JAGUARCERRITOS];
    return hideMilesSrpResultDesc.includes(siteUniqueId);
  },
});

export const hideColorSrpResultDescAtom = selector({
  key: 'hideColorSrpResultDesc',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const hideColorSrpResultDesc = [uniqueId.JAGUARCERRITOS];
    return hideColorSrpResultDesc.includes(siteUniqueId);
  },
});

export const showSearchBarOnSrpFiltersAtom = selector({
  key: 'showSearchBarOnSrpFilters',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showSearchBarOnSrpFiltersSites = [uniqueId.HILLTOPNISSAN];
    return showSearchBarOnSrpFiltersSites.includes(siteUniqueId);
  },
});

export const staticInventoryBannerAtom = selector({
  key: 'staticInventoryBanner',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    type TUser = {
      src: string;
      link: string;
    };
    const inventoryBanners: Record<string, TUser> = {
      [uniqueId.HILLTOPNISSAN]: {
        src: 'https://static.foxdealer.com/546/2021/05/Trade-in_Web_Banners-07.png',
        link: '/value-your-trade/',
      },
    };
    return inventoryBanners?.[siteUniqueId];
  },
});

export const showReelupsVideoBtnAtom = selector({
  key: 'showReelupsVideoBtn',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showReelupsVideoBtnSites = [uniqueId.HILLTOPNISSAN];
    return showReelupsVideoBtnSites.includes(siteUniqueId);
  },
});

export const showWindowStickerSrpCtaAtom = selector<boolean>({
  key: 'showWindowStickerSrpCta',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const windowStickerCtaSites = [''];
    return windowStickerCtaSites.includes(siteUniqueId);
  },
});

export const isStockNumberBoldAtom = selector({
  key: 'isStockNumberBold',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const isStockNumberBoldSites = [uniqueId.MLADYNISSAN];
    return isStockNumberBoldSites.includes(siteUniqueId);
  },
});

export const isVinNumberBoldAtom = selector({
  key: 'isVinNumberBold',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const isVinNumberBoldSites = [''];
    return isVinNumberBoldSites.includes(siteUniqueId);
  },
});

export const hideHighestPriceAtom = selector({
  key: 'hideHighestPrice',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const hideHighestPriceSites = [uniqueId.CYVGM, uniqueId.ROCKHILLNISSAN];
    return hideHighestPriceSites.includes(siteUniqueId);
  },
});

export const hideCarfaxSrpAtom = selector({
  key: 'hideCarfaxSrp',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const hideCarfaxSrpSites = [uniqueId.ROCKHILLNISSAN, uniqueId.MYGASTONIANISSAN];
    return hideCarfaxSrpSites.includes(siteUniqueId);
  },
});

export const kbbSrpBannerDetailsAtom = selector({
  key: 'kbbSrpBannerDetails',
  get: async ({ get }) => {
    const siteId = get(siteUniqueIdAtom);
    const kbbSrpBannerDetails: Record<
      UniqueID,
      { show: boolean; link: string; desktopUrl: string; mobileUrl: string }
    > = {
      [uniqueId.JOHNSONCITYTOYOTA]: {
        show: true,
        link: 'https://www.johnsoncitytoyota.com/value-your-trade',
        desktopUrl: 'https://static.foxdealer.com/996/2023/10/MicrosoftTeams-image.png',
        mobileUrl: 'https://static.foxdealer.com/996/2023/10/MicrosoftTeams-image.png',
      },
      // 'Spartanburg Toyota': {
      //   show: true,
      //   link: '/sell-my-car',
      //   desktopUrl:
      //     'https://timdealers.autotrader.com/images/Autotrader/DWSI/Assets/12_Q3_158_TIM_WebBanner_940x84_TradeIn.jpg',
      //   mobileUrl:
      //     'https://timdealers.autotrader.com/images/Autotrader/DWSI/Assets/12_Q3_158_TIM_WebBanner_325x95_Sell_5.jpg',
      // },
      [uniqueId.MBESCONDIDO]: {
        show: true,
        link: 'https://www.kbb.com/instant-cash-offer/W/71818219/43A6F9B8-DB6C-48C0-A360-F658B2176E3E/',
        desktopUrl:
          'https://icodealers.kbb.com/images/Autotrader/DWSI/Assets/other/12_Q3_158_TIM_WebBanner_940x84_TradeIn.jpg',
        mobileUrl:
          'https://icodealers.kbb.com/images/Autotrader/DWSI/Assets/other/12_Q3_158_TIM_WebBanner_325x95_Sell_5.jpg',
      },
      [uniqueId.MBWESTCOVINA]: {
        show: true,
        link: 'https://www.kbb.com/instant-cash-offer/W/72149429/43A6F9B8-DB6C-48C0-A360-F658B2176E3E/',
        desktopUrl:
          'https://timdealers.autotrader.com/images/Autotrader/DWSI/Assets/12_Q3_158_TIM_WebBanner_940x84_TradeIn.jpg',
        mobileUrl:
          'https://timdealers.autotrader.com/images/Autotrader/DWSI/Assets/12_Q3_158_TIM_WebBanner_325x95_Sell_5.jpg',
      },
      [uniqueId.NORWALKTOYOTA]: {
        show: false,
        link: '/sell-us-your-car',
        desktopUrl:
          'https://icodealers.kbb.com/images/Autotrader/DWSI/Assets/other/12_Q3_158_TIM_WebBanner_940x84_TradeIn.jpg',
        mobileUrl:
          'https://icodealers.kbb.com/images/Autotrader/DWSI/Assets/other/12_Q3_158_TIM_WebBanner_325x95_Sell_5.jpg',
      },
      [uniqueId.TOYOTAWESTCOVINA]: {
        show: true,
        link: '/instant-cash-offer',
        desktopUrl:
          'https://timdealers.autotrader.com/images/Autotrader/DWSI/Assets/12_Q3_158_TIM_WebBanner_940x84_TradeIn.jpg',
        mobileUrl:
          'https://timdealers.autotrader.com/images/Autotrader/DWSI/Assets/12_Q3_158_TIM_WebBanner_325x95_Sell_5.jpg',
      },
      [uniqueId.MBOFROCKLIN]: {
        show: true,
        link: 'https://www.kbb.com/instant-cash-offer/W/74052679/43A6F9B8-DB6C-48C0-A360-F658B2176E3E/',
        desktopUrl:
          'https://timdealers.autotrader.com/images/Autotrader/DWSI/Assets/12_Q3_158_TIM_WebBanner_940x84_TradeIn.jpg',
        mobileUrl: 'https://icodealers.kbb.com/images/Autotrader/DWSI/Assets/12_Q3_158_TIM_WebBanner_325x95_Sell_5.jpg',
      },
      [uniqueId.MBOFEDH]: {
        show: true,
        link: 'https://www.kbb.com/instant-cash-offer/W/74053151/43A6F9B8-DB6C-48C0-A360-F658B2176E3E/',
        desktopUrl:
          'https://icodealers.kbb.com/images/Autotrader/DWSI/Assets/12_Q3_158_TIM_WebBanner_940x84_TradeIn.jpg',
        mobileUrl: 'https://icodealers.kbb.com/images/Autotrader/DWSI/Assets/12_Q3_158_TIM_WebBanner_325x95_Sell_5.jpg',
      },

      [uniqueId.MBSACRAMENTO]: {
        show: true,
        link: 'https://www.kbb.com/instant-cash-offer/W/74053079/43A6F9B8-DB6C-48C0-A360-F658B2176E3E/',
        desktopUrl:
          'https://timdealers.autotrader.com/images/Autotrader/DWSI/Assets/12_Q3_158_TIM_WebBanner_940x84_TradeIn.jpg',
        mobileUrl: 'https://icodealers.kbb.com/images/Autotrader/DWSI/Assets/12_Q3_158_TIM_WebBanner_325x95_Sell_5.jpg',
      },

      [uniqueId.MLADYNISSAN]: {
        show: true,
        link: 'https://www.kbb.com/instant-cash-offer/W/577046/43A6F9B8-DB6C-48C0-A360-F658B2176E3E/',
        desktopUrl:
          'https://icodealers.kbb.com/images/Autotrader/DWSI/Assets/12_Q3_158_TIM_WebBanner_940x84_TradeIn.jpg',
        mobileUrl: 'https://icodealers.kbb.com/images/Autotrader/DWSI/Assets/12_Q3_158_TIM_WebBanner_325x95_Sell_5.jpg',
      },

      [uniqueId.HONDAMORRISTOWN]: {
        show: true,
        link: 'https://www.kbb.com/instant-cash-offer/W/1147771/43A6F9B8-DB6C-48C0-A360-F658B2176E3E/',
        desktopUrl:
          'https://icodealers.kbb.com/images/Autotrader/DWSI/Assets/other/12_Q3_158_TIM_WebBanner_940x84_TradeIn.jpg',
        mobileUrl:
          'https://icodealers.kbb.com/images/Autotrader/DWSI/Assets/other/12_Q3_158_TIM_WebBanner_325x95_Sell_5.jpg',
      },
    };
    return (
      kbbSrpBannerDetails?.[siteId] ?? {
        show: false,
        link: '',
        desktopUrl: '',
        mobileUrl: '',
      }
    );
  },
});

export const showKbbTradInWidgetAtom = selector<boolean>({
  key: 'showKbbTradInWidget',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealersList = [uniqueId.TOYOTAOFMIDLAND];
    return dealersList.includes(siteUniqueId);
  },
});
export const showCarStoryCtaAtom = selector({
  key: 'showCarStoryCta',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showCarStoryCtaSites = [uniqueId.JOHNSONCITYTOYOTA];
    return showCarStoryCtaSites.includes(siteUniqueId);
  },
});

export const showVelocityEngageCtaAtom = selector({
  key: 'showVelocityEngageCta',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showVelocityEngageCtaSites = [uniqueId.BEAMANTOYOTA, uniqueId.JAGUARCERRITOS, uniqueId.LANDROVERCERRITOS];
    return showVelocityEngageCtaSites.includes(siteUniqueId);
  },
});

export const showProdigyPricingBtnGroupAtom = selector({
  key: 'showProdigyPricingBtnGroup',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showProdigyPricingBtnGroupSites = [uniqueId.HONDAKINGSPORT, uniqueId.HONDAMORRISTOWN];
    return showProdigyPricingBtnGroupSites.includes(siteUniqueId);
  },
});

export const srpCardPhoneTextAtom = selector({
  key: 'srpCardPhoneText',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const phoneTextMap: Record<string, string> = {
      [uniqueId.SOUTHFORTCHEV]: 'SEND TO PHONE',
      [uniqueId.CHEVROLETOFMONTEBELLO]: 'Text Me This Offer',
    };
    return phoneTextMap?.[siteUniqueId] ?? '';
  },
});

export const showLesVideoCtaAtom = selector({
  key: 'showLesVideoCta',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showLesVideoCtaSites = [uniqueId.TOYOTAOFLASVEGAS];
    return showLesVideoCtaSites.includes(siteUniqueId);
  },
});

export const showLesVideoCtaAtBottomAtom = selector({
  key: 'showLesVideoCtaAtBottom',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showLesVideoCtaAtBottomSites = [uniqueId.TOYOTAHUNTINGTONBEACH, uniqueId.RIGHTTOYOTA];
    return showLesVideoCtaAtBottomSites.includes(siteUniqueId);
  },
});

export const hideCondtionAndTypeAtom = selector({
  key: 'hideCondtionAndType',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const hideCondtionAndTypeSites = [uniqueId.ROCKHILLNISSAN];
    return hideCondtionAndTypeSites.includes(siteUniqueId);
  },
});

export const hideDescriptionOnSrpAtom = selector({
  key: 'hideDescriptionOnSrp',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const hideDescriptionOnSrpSites = [uniqueId.ROCKHILLNISSAN];
    return hideDescriptionOnSrpSites.includes(siteUniqueId);
  },
});

export const showMilesInPriceTabAtom = selector({
  key: 'showMilesInPriceTab',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showMilesInPriceTabSites = [uniqueId.ROCKHILLNISSAN];
    return showMilesInPriceTabSites.includes(siteUniqueId);
  },
});

export const alignUsedPriceTabToLeftAtom = selector({
  key: 'alignUsedPriceTabToLeft',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const alignUsedPriceTabToLefSites = [uniqueId.ROCKHILLNISSAN];
    return alignUsedPriceTabToLefSites.includes(siteUniqueId);
  },
});

export const comingSoonImageAtom = selector({
  key: 'comingSoonImage',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const comingSoomImgSiteMap: Record<string, string> = {
      [uniqueId.TOYOTAOFLASVEGAS]: 'https://cdn-pods.foxdealer.com/toyotademo3/Microsoft_Teams_image_9_8e8a1265af.png',
    };
    return comingSoomImgSiteMap?.[siteUniqueId] ?? '';
  },
});

export const hideCompareIconBtnAtom = selector({
  key: 'hideCompareIconBtn',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const hideCompareIconBtnSites = [uniqueId.MYGASTONIANISSAN];
    return hideCompareIconBtnSites?.includes(siteUniqueId) ?? false;
  },
});

export const hideMilesOnSrpAtom = selector({
  key: 'hideMilesOnSrp',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const hideMilesOnSrpSites = [
      uniqueId.CLAREMONTTOYOTA,
      uniqueId.JOHNSONCITYTOYOTA,
      uniqueId.TOYOTAOFLASVEGAS,
      uniqueId.LANDROVERCERRITOS,
      uniqueId.PRINCETONLANDROVER,
      uniqueId.MBOFROCKLIN,
      uniqueId.MBESCONDIDO,
    ];
    return hideMilesOnSrpSites?.includes(siteUniqueId) ?? false;
  },
});

export const showSrpFullPriceStackAtom = selector({
  key: 'showSrpFullPriceStack',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const hideMilesOnSrpSites = [uniqueId.CHEVROLETOFMONTEBELLO, uniqueId.CDJRWESTCOVINA];
    return hideMilesOnSrpSites?.includes(siteUniqueId) ?? false;
  },
});

export const showCompareFavoritesVehicleAtSRPAtom = selector<boolean>({
  key: 'showCompareFavoritesVehicleAtSRP',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealersLists = [uniqueId.CYVGM];
    return dealersLists?.includes(siteUniqueId);
  },
});
export const getFlickFusionClinetIdAtom = selector<string>({
  key: 'getFlickFusionClinetId',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const clientID: Record<string, string> = {
      [uniqueId.MLADYNISSAN]: '5EF7EED3-296F-CF35-7048-3F01A4FCCF03',
      [uniqueId.TOYOTAOFMIDLAND]: 'B5E2051F-CED6-5634-5A9A-32DB16C05313',
    };
    return clientID?.[siteUniqueId] ?? '';
  },
});

export const showRoadSterButtonAtom = selector({
  key: 'showRoadSterButton',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showRoadSterButtonSites = [uniqueId.MBWESTCOVINA];
    return showRoadSterButtonSites.includes(siteUniqueId);
  },
});

export const removeRoadsterClassAtom = selector({
  key: 'removeRoadsterClass',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const removeRoadsterClassSites = [uniqueId.MBWESTCOVINA];
    return !removeRoadsterClassSites.includes(siteUniqueId);
  },
});

export const runFaceBookPixelScriptAtom = selector({
  key: 'runFaceBookPixelScript',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.NORWALKTOYOTA];
    return dealerSites.includes(siteUniqueId);
  },
});

export const runTikTokPixelScriptAtom = selector({
  key: 'runTikTokPixelScript',
  get: ({ get }) => {
    const siteId = get(siteIdAtom).toString();
    const dealerSites = ['38'];
    return dealerSites.includes(siteId);
  },
});

export const srpBannerFormIdAtom = selector({
  key: 'srpBannerFormId',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const srpBannerSiteIds: Record<string, string> = {
      [uniqueId.MBSACRAMENTO]: '1019',
      [uniqueId.MBWESTCOVINA]: '1019',
      [uniqueId.LANDROVERCERRITOS]: '1024',
    };
    return srpBannerSiteIds?.[siteUniqueId] ?? '1003';
  },
});

export const getTotalPriceDisclaimerAtom = selector({
  key: 'getTotalPriceDisclaimer',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const srpBannerSiteIds: Record<string, string> = {
      [uniqueId.MBOFROCKLIN]: 'Plus taxes and applicable fees',
    };
    return srpBannerSiteIds?.[siteUniqueId] ?? '';
  },
});

export const hideDrivetrainAtom = selector({
  key: 'hideDrivetrain',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealersLists = [uniqueId.LANDROVERCERRITOS];
    return dealersLists.includes(siteUniqueId);
  },
});

export const hideDiscountedPriceTitleAtom = selector({
  key: 'hideDiscountedPriceTitle',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealersLists = [uniqueId.LANDROVERCERRITOS, uniqueId.CINCINNATILANDROVER, 'Courtesy Vehicle Incentive'];
    return dealersLists.includes(siteUniqueId);
  },
});
export const hideCertifiedLogoAtom = selector({
  key: 'hideCertifiedLogo',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealersLists = [''];
    return dealersLists.includes(siteUniqueId);
  },
});
export const showPriceStackWithIncentivesAtom = selector({
  key: 'showPriceStackWithIncentives',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showPriceStackWithIncentivesSites = [uniqueId.ROCKHILLNISSAN];
    return showPriceStackWithIncentivesSites.includes(siteUniqueId);
  },
});
export const showColorBubbleBelowDescriptionAtom = selector({
  key: 'showColorBubbleBelowDescription',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.LANDROVERCERRITOS];
    return dealerSites.includes(siteUniqueId);
  },
});
export const hideExtColorAtom = selector<boolean>({
  key: 'hideExtColor',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.LANDROVERCERRITOS];
    return dealerSites.includes(siteUniqueId);
  },
});

export const allowRedirectToVdpByClickOnQuickviewAtom = selector({
  key: 'alloRedirectToVdpByClickOnQuickview',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.GAUTHIERCADILLAC, uniqueId.BEAMANTOYOTA];
    return dealerSites.includes(siteUniqueId);
  },
});

export const clickToCallBtnTextAtom = selector({
  key: 'clickToCallBtnText',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.TOYOTAHUNTINGTONBEACH, uniqueId.SPARTANBURGTOYOTA, uniqueId.CLAREMONTTOYOTA];
    return dealerSites.includes(siteUniqueId);
  },
});

export const getSRPFooterDesclaimerAtom = selectorFamily({
  key: 'getSRPFooterDesclaimer',
  get: (url: string) => ({ get }) => {
    const desclaimerMapping: Record<string, Record<string, string>> = {
      [uniqueId.HONDAKINGSPORT]: {
        'inventory/new-Honda-hr--v':
          '*3.9% APR financing for 48 months. $22.53 per month per every $1,000 borrowed. With approved credit. Not all will qualify. On select models. Prices exclude optional equipment selected by the purchaser, dealer documentation fee of $699 per TCA 55-17-114, and state and local taxes, tags, registration and title fees. Advertised prices include factory-installed options installed by the manufacturer and dealer-installed accessories already installed on the vehicle by the dealer at time of advertising. See dealer for details. Offer Expires 02/29/2024. ',
        'inventory/New-Honda-Civic_Sedan':
          '*2.9% APR financing for 36 months. $29.04 per month per every $1,000 borrowed. With approved credit. Not all will qualify. On select models. Prices exclude optional equipment selected by the purchaser, dealer documentation fee of $699 per TCA 55-17-114, and state and local taxes, tags, registration and title fees. Advertised prices include factory-installed options installed by the manufacturer and dealer-installed accessories already installed on the vehicle by the dealer at time of advertising. See dealer for details. Offer Expires 02/29/2024.',
        'inventory/new-Honda-cr--v':
          '*2.9% APR financing for 36 months. $29.04 per month per every $1,000 borrowed. With approved credit. Not all will qualify. On select models. Prices exclude optional equipment selected by the purchaser, dealer documentation fee of $699 per TCA 55-17-114, and state and local taxes, tags, registration and title fees. Advertised prices include factory-installed options installed by the manufacturer and dealer-installed accessories already installed on the vehicle by the dealer at time of advertising. See dealer for details. Offer Expires 02/29/2024. ',
      },
      [uniqueId.HONDAMORRISTOWN]: {
        'inventory/?body=4d+sedan&model=civic&type=new':
          '*$389 per month lease for 36 months. With approved Credit. 10,000 Miles per Year. $2,999 due at signing. Prices exclude optional equipment selected by the purchaser, dealer documentation fee of $699 per TCA 55-17-114, and state and local taxes, tags, registration and title fees. Advertised prices include factory-installed options installed by the manufacturer and dealer-installed accessories already installed on the vehicle by the dealer at time of advertising.. Not all will qualify. Security deposit not required. On Select Models. See dealer for details. Offer Expires 01/31/2024. ',
        'inventory/new-Honda-cr--v':
          '*$499 per month lease for 36 months. With approved Credit. 10,000 Miles per Year. $2,999 due at signing. Prices exclude optional equipment selected by the purchaser, dealer documentation fee of $699 per TCA 55-17-114, and state and local taxes, tags, registration and title fees. Advertised prices include factory-installed options installed by the manufacturer and dealer-installed accessories already installed on the vehicle by the dealer at time of advertising. Not all will qualify. Security deposit not required. On Select Models. See dealer for details. Offer Expires 01/31/2024.',
        'inventory/new-honda-hr--v':
          '*$429 per month lease for 36 months. With approved Credit. 10,000 Miles per Year. $2,999 due at signing. Prices exclude optional equipment selected by the purchaser, dealer documentation fee of $699 per TCA 55-17-114, and state and local taxes, tags, registration and title fees. Advertised prices include factory-installed options installed by the manufacturer and dealer-installed accessories already installed on the vehicle by the dealer at time of advertising.. Not all will qualify. Security deposit not required. On Select Models. See dealer for details. Offer Expires 01/31/2024. ',
      },
    };
    const siteUniqueId = get(siteUniqueIdAtom);
    return desclaimerMapping[siteUniqueId]?.[url] ?? '';
  },
});

export const getFormSubmitDisclaimerAtom = selector({
  key: 'getFormSubmitDisclaimer',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const desclaimerMapping: Record<string, string> = {
      [uniqueId.BEAMANTOYOTA]:
        'By submitting my information, I consent to receive marketing emails/calls/text messages, including calls/texts made using an autodialer or a pre-rerecorded voice message, by or on behalf of Beaman Toyota, to the email and/or phone number(s) provided. My consent is not required as a condition of purchase. Message and data rates may apply. I may opt out at any time.',
    };
    return desclaimerMapping?.[siteUniqueId] ?? '';
  },
});
export const showDisclaimerAtom = selector({
  key: 'showDisclaimer',
  get: ({ get }) => {
    const siteId = get(siteUniqueIdAtom);
    const dealerSites = [
      uniqueId.TRISTATEVANS,
      uniqueId.WESTCHESTERBENZ,
      uniqueId.MBCINCY,
      uniqueId.ROCKYMOUNTTOYOTA,
      uniqueId.TOYOTAOFMIDLAND,
      uniqueId.MYGASTONIANISSAN,
      uniqueId.ROCKHILLNISSAN,
    ];
    return dealerSites.includes(siteId);
  },
});

/**
 * This atom is used to hide share and 'Add to Garage' button from the SRP page as we do not have any customizer as of now.
 */
export const hideShareAndAddToGarageButtonsAtom = selector({
  key: 'hideShareAndAddToGarageButtons',
  get: ({ get }) => {
    const siteId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.TOYOTAOFMILPITAS];
    return dealerSites.includes(siteId);
  },
});
