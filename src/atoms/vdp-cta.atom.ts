import { selector, selectorFamily } from 'recoil-ssr';
import { siteUniqueIdAtom } from './site.atom';
import { primaryFormTitleAtom } from './settings.atom';
import { uniqueId } from '@utils/constant';

export const valueTradeBtnVdpAtom = selector<boolean>({
  key: 'valueTradeBtnVdp',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showValueTradeBtnVDP = [uniqueId.WESTCHESTERBENZ, uniqueId.MBCINCY, uniqueId.JAGUARCERRITOS];
    return showValueTradeBtnVDP.includes(siteUniqueId);
  },
});

export const callUsBtnVdpAtom = selector<boolean>({
  key: 'callUsBtnVdp',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showCallUsBtn = [uniqueId.WESTCHESTERBENZ, uniqueId.MBCINCY];
    return showCallUsBtn.includes(siteUniqueId);
  },
});

export const hideCalculateYourPaymentCtaAtom = selector<boolean>({
  key: 'hideCalculateYourPaymentCta',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const hideCalculateYourPaymentCta = [uniqueId.MYGASTONIANISSAN];
    return !hideCalculateYourPaymentCta.includes(siteUniqueId);
  },
});

export const searchRecallCtaAtom = selector<boolean>({
  key: 'showSearchRecallCta',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showSearchRecallCtaSites = [uniqueId.MLADYNISSAN];
    return showSearchRecallCtaSites?.includes?.(siteUniqueId);
  },
});

export const showSimilarVehicleModelsAtom = selector<boolean>({
  key: 'showSimilarVehicleModels',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showSimilarVehicleModelsSites = [uniqueId.MLADYNISSAN];
    return showSimilarVehicleModelsSites?.includes?.(siteUniqueId);
  },
});

export const showGetApprovedCtaInOptionsAtom = selector({
  key: 'getApprovedCtaInOptions',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const getApprovedCtaInOptionsSites = [uniqueId.MONROVIACDJR];
    return getApprovedCtaInOptionsSites.includes(siteUniqueId);
  },
});

export const showDvVideoBtnAtom = selector({
  key: 'showDvVideoBtnVdp',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showDvVideoBtn = [uniqueId.TOYOTAOFMILPITAS];
    return showDvVideoBtn.includes(siteUniqueId);
  },
});

export const vdpCpoDetailsLinksAtom = selector({
  key: 'vdpCpoDetailsLinks',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const cpoDetailsLinksMap: Record<string, string> = {
      [uniqueId.COLEJAGUAR]: '/approved-certified-pre-owned-program',
    };
    return cpoDetailsLinksMap?.[siteUniqueId] ?? '';
  },
});

export const showAdditionalFieldsInSummaryAtom = selector({
  key: 'showAdditionalFieldsInSummary',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showAdditionalFieldsInSummarySites = [
      uniqueId.HILLTOPNISSAN,
      uniqueId.MLADYNISSAN,
      uniqueId.VIXENUSEDCARDEMO,
      uniqueId.TOYOTACANADADEMO,
      uniqueId.MYCARPARK,
      uniqueId.HUDSONAUTO,
    ];
    return showAdditionalFieldsInSummarySites.includes(siteUniqueId);
  },
});

export const showKbbIframeAtom = selector({
  key: 'showKbbIframe',
  get: async ({ get }) => {
    const siteId = get(siteUniqueIdAtom);
    const showKbbIframeSites = [uniqueId.ROCKHILLNISSAN, uniqueId.HONDAMORRISTOWN];
    return showKbbIframeSites.includes(siteId);
  },
});

export const kbbIframeDetailsAtom = selector({
  key: 'kbbIframeDetails',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const kbbIframeDetails: Record<string, { kbbZip: string; kbbApiKey: string }> = {
      [uniqueId.ROCKHILLNISSAN]: {
        kbbZip: '29730',
        kbbApiKey: 'd2afbdf9-09df-4a57-a481-ac53b8004f40',
      },
    };
    return kbbIframeDetails?.[siteUniqueId];
  },
});

export const showStrikeThroughAtom = selector({
  key: 'showStrikeThrough',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showStrikeThroughSites = [
      uniqueId.ROCKHILLNISSAN,
      uniqueId.LANDROVERDEMO,
      uniqueId.COLELANDROVER,
      uniqueId.LANDROVERVENTURA,
      uniqueId.LANDROVERFAIRFIELD,
      uniqueId.PRINCETONLANDROVER,
    ];
    return showStrikeThroughSites.includes(siteUniqueId);
  },
});
export const showCapitalOneCtaAtom = selector({
  key: 'showCapitalOneCta',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showCapitalOneCtaSites = [uniqueId.HILLTOPNISSAN, uniqueId.CLAREMONTTOYOTA];
    return showCapitalOneCtaSites.includes(siteUniqueId);
  },
});
export const showCapitalOneCalcAtom = selector({
  key: 'showCapitalOneCalc',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showCapitalOneCalcSites = [uniqueId.TOYOTAHUNTINGTONBEACH];
    return showCapitalOneCalcSites.includes(siteUniqueId);
  },
});

export const showDealerLocationAtom = selector({
  key: 'dealerLocation',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showdealerLocation = [uniqueId.HUDSONAUTO];
    return showdealerLocation.includes(siteUniqueId);
  },
});

export const showDealerViewIframeAtom = selector({
  key: 'showDealerViewIframe',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerViewIframeSites = [uniqueId.MYCARPARK];
    return dealerViewIframeSites.includes(siteUniqueId);
  },
});

export const showWindowStickerCtaAtom = selector({
  key: 'showWindowStickerCta',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const windowStickerCtaSites = [
      uniqueId.MYGASTONIANISSAN,
      uniqueId.MLADYNISSAN,
      uniqueId.TOYOTAWESTCOVINA,
      uniqueId.TOYOTAOFMILPITAS,
      uniqueId.HILLTOPNISSAN,
      uniqueId.CDJRWESTCOVINA,
    ];
    return windowStickerCtaSites.includes(siteUniqueId);
  },
});

export const showLimitedWarrantySitesAtom = selector({
  key: 'limitedWarrantySites',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const limitedWarrantySites = [
      uniqueId.ROCKYMOUNTTOYOTA,
      uniqueId.HONDAKINGSPORT,
      uniqueId.HONDAMORRISTOWN,
      uniqueId.TOYOTAOFMIDLAND,
    ];
    return limitedWarrantySites.includes(siteUniqueId);
  },
});
export const showMidlandsToyotaTopratedImageAtom = selector({
  key: 'showMidlandsToyotaTopratedImage',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.TOYOTAOFMIDLAND];
    return dealerSites.includes(siteUniqueId);
  },
});
export const showNhtsaCTASitesAtom = selector({
  key: 'nhtsaCTASites',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const nhtsaCTAsites = [uniqueId.HONDAKINGSPORT, uniqueId.HONDAMORRISTOWN];
    return nhtsaCTAsites.includes(siteUniqueId);
  },
});
export const showCarfaxAbovePriceStackAtom = selector({
  key: 'showCarfaxAbovePriceStack',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showCarfaxAbovePriceStackSites = [uniqueId.ROCKHILLNISSAN];
    return showCarfaxAbovePriceStackSites.includes(siteUniqueId);
  },
});

export const getForm1001CTAButtonTextAtom = selector<string>({
  key: 'getForm1001CTAButtonText',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const ctaButtonTextMap: Record<string, string> = {
      [uniqueId.MBESCONDIDO]: 'Get Vehicle Details',
      [uniqueId.MBSACRAMENTO]: 'Submit',
      [uniqueId.MBOFEDH]: 'Submit',
      [uniqueId.BEAMANTOYOTA]: 'Next Steps',
    };
    return ctaButtonTextMap[siteUniqueId] ?? 'GET E-PRICE';
  },
});
export const getForm1001TitleAtom = selector<string>({
  key: 'getForm1001Title',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const ctaButtonTextMap: Record<string, string> = {
      [uniqueId.MBESCONDIDO]: 'Get More Info',
      [uniqueId.MBOFEDH]: 'Request More Info',
    };
    return ctaButtonTextMap[siteUniqueId] ?? 'Find Out More';
  },
});

export const showPaymentOptionOnVDPAtom = selector({
  key: 'showPaymentOptionOnVDP',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showDealerNameSites = [uniqueId.MBESCONDIDO, uniqueId.MBSACRAMENTO, uniqueId.MBOFEDH, uniqueId.MBOFROCKLIN];
    return showDealerNameSites.includes(siteUniqueId);
  },
});
export const showSecondaryRibbonAtom = selector({
  key: 'showSecondaryRibbon',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showSecondaryRibbonSites = [uniqueId.CARTERCADILLAC];
    return showSecondaryRibbonSites.includes(siteUniqueId);
  },
});

export const showCarStoryReportAtom = selector({
  key: 'showCarStoryReport',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showCarStoryReportSites = [uniqueId.JOHNSONCITYTOYOTA];
    return showCarStoryReportSites.includes(siteUniqueId);
  },
});

export const showCarNowBtnsAtom = selector<boolean>({
  key: 'showCarNowBtns',
  get: async ({ get }) => {
    const siteId = get(siteUniqueIdAtom);
    const showCarNowBtnsCta = [
      uniqueId.BEAMANTOYOTA,
      uniqueId.TOYOTASB,
      uniqueId.TOYOTAOFLASVEGAS,
      uniqueId.MBESCONDIDO,
      uniqueId.MBWESTCOVINA,
      uniqueId.TOYOTAWESTCOVINA,
      uniqueId.NORWALKTOYOTA,
    ];
    return showCarNowBtnsCta.includes(siteId);
  },
});

export const showVelocityEngageVdpCtaAtom = selector<boolean>({
  key: 'showVelocityEngageVdpCta',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showVelocityEngageVdpCtaSites = [uniqueId.BEAMANTOYOTA, uniqueId.JAGUARCERRITOS, uniqueId.LANDROVERCERRITOS];
    return showVelocityEngageVdpCtaSites.includes(siteUniqueId);
  },
});

export const showProdigyPricingBtnGroupVdpAtom = selector({
  key: 'showProdigyPricingBtnGroupVdp',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showProdigyPricingBtnGroupVdpSites = [uniqueId.HONDAKINGSPORT, uniqueId.HONDAMORRISTOWN];
    return showProdigyPricingBtnGroupVdpSites.includes(siteUniqueId);
  },
});

export const calculatorVisibilityAtom = selector({
  key: 'calculatorVisibility',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const calculatorVisibility = [uniqueId.JOSEPHTOYOTA, uniqueId.TOYOTAOFLASVEGAS];
    return calculatorVisibility.includes(siteUniqueId);
  },
});

export const showValueTradeBtnVdpAtom = selector({
  key: 'showValueTradeBtn',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const valueTradeBtnSites = [
      uniqueId.TOYOTAHUNTINGTONBEACH,
      uniqueId.JOSEPHTOYOTA,
      uniqueId.I10TOYOTA,
      uniqueId.TOYOTASB,
      uniqueId.TOYOTAOFLASVEGAS,
    ];
    return !valueTradeBtnSites.includes(siteUniqueId);
  },
});

export const clickToCallBtnVisibilityAtom = selector({
  key: 'clickToCallBtnVisibility',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const sitesExcludedFromClickToCall = [uniqueId.TOYOTAOFLASVEGAS];
    return !sitesExcludedFromClickToCall.includes(siteUniqueId);
  },
});

export const callInternetSalesLinkAtom = selector({
  key: 'callInternetSalesLink',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    if (siteUniqueId === uniqueId.TOYOTAOFLASVEGAS) {
      return 'tel:833-447-0322';
    } else {
      return '';
    }
  },
});

export const showCallInternetSalesLinkAtom = selector({
  key: 'showCallInternetSalesLink',
  get: ({ get }) => {
    const siteId = get(siteUniqueIdAtom);
    const sitesExcludedFromCallInternetSalesButton = [
      uniqueId.JOHNSONCITYTOYOTA,
      uniqueId.SPARTANBURGTOYOTA,
      uniqueId.CLAREMONTTOYOTA,
      uniqueId.TOYOTAHUNTINGTONBEACH,
    ];
    return !sitesExcludedFromCallInternetSalesButton.includes(siteId);
  },
});

export const kbbvdpCtaAtom = selector({
  key: 'kbbvdpCta',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const kbbVdpCtaDetails: Record<string, { show: boolean; text: string; link: string }> = {
      [uniqueId.NORWALKTOYOTA]: {
        show: false,
        text: 'KBB Instant Cash Offer!',
        link: '/sell-us-your-car/',
      },
    };
    return kbbVdpCtaDetails?.[siteUniqueId];
  },
});

export const queryBtnTextAtom = selector({
  key: 'queryBtnText',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const primaryFormTitle = get(primaryFormTitleAtom);
    const queryBtnText: Record<string, string> = {
      [uniqueId.JOHNSONCITYTOYOTA]: "Get today's VIP Price",
      [uniqueId.TOYOTAHUNTINGTONBEACH]: 'CONTACT SALES PROFESSIONAL',
      [uniqueId.SPARTANBURGTOYOTA]: primaryFormTitle ?? 'Unlock This Price',
    };
    return queryBtnText?.[siteUniqueId] ?? 'EMAIL SALES PROFESSIONAL';
  },
});

export const testDriveBtnVdpAtom = selector<boolean>({
  key: 'testDriveBtnVdp',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showScheduleTestDriveBtn = [uniqueId.TOYOTADEMO3];
    return showScheduleTestDriveBtn.includes(siteUniqueId);
  },
});

export const primaryFormTextAtom = selector({
  key: 'primaryFormText',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const primaryFormText: Record<string, string> = {
      [uniqueId.NORWALKTOYOTA]: 'Request Today’s Price',
    };
    return primaryFormText?.[siteUniqueId];
  },
});

export const showCallUsCtaAtom = selector({
  key: 'showCallUsCta',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showCallUsCtaSites = [uniqueId.NORWALKTOYOTA];
    return showCallUsCtaSites?.includes(siteUniqueId);
  },
});

export const showGetPreQualifiedAtom = selector({
  key: 'showGetPreQualified',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showGetPreQualifiedSites = [uniqueId.NORWALKTOYOTA];
    return showGetPreQualifiedSites?.includes(siteUniqueId);
  },
});

export const hideScheduleServiceCtaAtom = selector({
  key: 'hideScheduleServiceCta',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const hideScheduleServiceCtaSites = [uniqueId.NORWALKTOYOTA];
    return hideScheduleServiceCtaSites?.includes(siteUniqueId);
  },
});

export const internetSalesCtaTextAtom = selector({
  key: 'internetSalesCtaText',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const internetSalesCtaText: Record<string, string> = {
      [uniqueId.CLAREMONTTOYOTA]: 'Contact Inventory Specialist',
    };
    return internetSalesCtaText?.[siteUniqueId] ?? 'Call Internet Sales';
  },
});
export const showCarNowCtaAtom = selector<boolean>({
  key: 'showCarNowCtaVdp',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.NORWALKTOYOTA];
    return dealerSites.includes(siteUniqueId);
  },
});
export const getClickForDetailsCtaAtom = selector<string>({
  key: 'getClickForDetailsCta',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites: Record<string, string> = {
      [uniqueId.TOYOTAOFMIDLAND]: '/toyota-certified-used-vehicle-program/',
    };
    return dealerSites[siteUniqueId] ?? '';
  },
});
export const getRequestAdditionalInformationCtaTitleAtom = selector<string>({
  key: 'getRequestAdditionalInformationCtaTitle',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites: Record<string, string> = { [uniqueId.JAGUARCERRITOS]: 'Confirm Availability' };
    return dealerSites[siteUniqueId] ?? 'Ask us anything';
  },
});
export const showWindowStickerOnUsedVehiclesAtom = selectorFamily({
  key: 'showWindowStickerOnUsedVehicles',
  get: (make: string) => async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const windowStickerCtaSites = [...(make?.toLowerCase() === 'nissan' ? [uniqueId.HILLTOPNISSAN] : [])];
    return windowStickerCtaSites.includes(siteUniqueId);
  },
});

export const showMilesBelowDescriptionAtom = selector({
  key: 'showMilesBelowDescription',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showMilesBelowDescriptionSites = [uniqueId.HONDAKINGSPORT];
    return showMilesBelowDescriptionSites.includes(siteUniqueId);
  },
});

export const showShareSectionAtom = selector({
  key: 'showShareSection',
  get: async ({ get }) => {
    const siteId = get(siteUniqueIdAtom);
    const showShareSectionSites = [uniqueId.TRISTATEVANS];
    return showShareSectionSites.includes(siteId);
  },
});
export const hideForm1001VdpAtom = selector({
  key: 'hideForm1001Vdp',
  get: async ({ get }) => {
    const siteId = get(siteUniqueIdAtom);
    const hideForm1001VdpSites = [uniqueId.NORWALKTOYOTA, uniqueId.TOYOTAWESTCOVINA];
    return hideForm1001VdpSites.includes(siteId);
  },
});
export const showClickToCallBtnDiffPosAtom = selector({
  key: 'showClickToCallBtn',
  get: async ({ get }) => {
    const siteId = get(siteUniqueIdAtom);
    const showClickToCallBtnDiffPosSites = [uniqueId.CLAREMONTTOYOTA, uniqueId.JOHNSONCITYTOYOTA];
    return showClickToCallBtnDiffPosSites.includes(siteId);
  },
});
