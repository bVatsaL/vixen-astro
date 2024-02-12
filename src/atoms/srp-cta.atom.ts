import { selector, selectorFamily } from 'recoil-ssr';
import { siteIdAtom, siteUniqueIdAtom } from './site.atom';
import { primaryPhoneAtom } from './location.atom';
import comingSoonMladyImg from '@nissantheme1/components/images/commingsonn-mlady.webp';
import { ctaPrimaryTextAtom } from './settings.atom';
import { UniqueID, uniqueId } from '@utils/constant';
// import comingSoonImg from '@nissantheme1/components/images/coming-soon.png';

export const confirmAvailabilityBtnAtom = selector<boolean>({
  key: 'confirmAvailabilityBtn',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showConfirmAvailabilityBtn = [
      uniqueId.NISSANDEMOV3,
      // uniqueId.MLADYNISSAN,
      uniqueId.HILLTOPNISSAN,
      uniqueId.TOYOTADEMO3,
      uniqueId.BEAMANTOYOTA,
      uniqueId.CITYTOYOTADEMO,
    ];
    return showConfirmAvailabilityBtn.includes(siteUniqueId);
  },
});
export const confirmAvailabilityBtnLabelAtom = selector<string>({
  key: 'confirmAvailabilityBtnLabel',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const primaryFormCtaTitle = get(ctaPrimaryTextAtom);
    const showConfirmAvailabilityBtnLabel = [
      uniqueId.MLADYNISSAN,
      uniqueId.MYGASTONIANISSAN,
      uniqueId.ROCKHILLNISSAN,
      uniqueId.SPARTANBURGTOYOTA,
    ];
    const defaultLabel = 'Get our Internet Price';
    const siteId = get(siteIdAtom).toString();
    const showConfirmAvailabilityBtnText = ['1025'];
    const showPrimaryFormCtaTitleOnToogleCta = ['1004'];
    if (showConfirmAvailabilityBtnLabel.includes(siteUniqueId)) {
      return 'Get Our Best Price';
    }
    if (siteUniqueId === uniqueId.CYVGM) {
      return 'Check Availability';
    } else if (showConfirmAvailabilityBtnText.includes(siteId)) {
      return 'Next Steps';
    } else if (showPrimaryFormCtaTitleOnToogleCta.includes(siteId)) {
      return primaryFormCtaTitle;
    } else {
      return defaultLabel;
    }
  },
});

export const capitalOneButtonAtom = selector<boolean>({
  key: 'capitalOneButton',
  get: async ({ get }) => {
    const siteId = get(siteIdAtom).toString();
    const shocapitalOneButton = ['384', '675', '680'];
    return shocapitalOneButton.includes(siteId);
  },
});

export const getPreapprovedButtonAtom = selector<boolean>({
  key: 'getPreapprovedButton',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const getPreapprovedButton = [uniqueId.CYVGM];
    return getPreapprovedButton.includes(siteUniqueId);
  },
});

export const showDvVideoBtnAtom = selector<boolean>({
  key: 'showDvVideoBtnSrp',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showDvVideoBtn = [uniqueId.TOYOTAOFMILPITAS];
    return showDvVideoBtn.includes(siteUniqueId);
  },
});

export const showFlickFusionBtnAtom = selector<boolean>({
  key: 'flickFusionBtn',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showflickFusionBtn = [uniqueId.MLADYNISSAN, uniqueId.TOYOTAOFMIDLAND];
    return showflickFusionBtn.includes(siteUniqueId);
  },
});

export const showTestDriveBtnAtom = selector<boolean>({
  key: 'testDriveBtn',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showTestDriveBtn = [uniqueId.MLADYNISSAN];
    return showTestDriveBtn.includes(siteUniqueId);
  },
});

export const showTestDriveBtnWithModalAtom = selector<boolean>({
  key: 'testDriveBtnWithModal',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showScheduleTestDriveBtn = [uniqueId.HONDAMORRISTOWN];
    return showScheduleTestDriveBtn.includes(siteUniqueId);
  },
});

export const showCarSaverBtnAtom = selector<boolean>({
  key: 'carSaverBtn',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showCarSaverBtn = [uniqueId.MLADYNISSAN];
    return showCarSaverBtn.includes(siteUniqueId);
  },
});
export const showExpressBtnAtom = selector<boolean>({
  key: 'showExpressBtn',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showExpressBtn = [uniqueId.MBSACRAMENTO];
    return showExpressBtn.includes(siteUniqueId);
  },
});

export const showRoadSterButtonAtBottomAtom = selector<boolean>({
  key: 'roadSterButtonAtBottom',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showRoadSterButtonAtBottom = [''];
    return showRoadSterButtonAtBottom.includes(siteUniqueId);
  },
});

export const showPriceStrikethroughBySiteAtom = selector<boolean>({
  key: 'priceStrikethroughBySite',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showPriceStrikethroughBySite = [uniqueId.ROCKHILLNISSAN];
    return showPriceStrikethroughBySite.includes(siteUniqueId);
  },
});

export const showPlayVideoBtnsAtom = selector<boolean>({
  key: 'playVideoBtns',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showPlayVideoBtns = [uniqueId.ROCKHILLNISSAN];
    return showPlayVideoBtns.includes(siteUniqueId);
  },
});

export const vehicleRecordsBtnAtom = selector<boolean>({
  key: 'vehicleRecordsBtn',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showVehicleRecordsBtn = [uniqueId.JAGUARFAIRFIELD, uniqueId.JAGUARCINCINNATI, uniqueId.HUDSONAUTO];
    return showVehicleRecordsBtn.includes(siteUniqueId);
  },
});

export const showConfirmAvailableCtaAtom = selector<boolean>({
  key: 'confirmAvailableCta',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showConfirmAvailableCta = [
      uniqueId.JAGUARCINCINNATI,
      uniqueId.BEAMANTOYOTA,
      uniqueId.TOWNTOYOTADEMO,
      uniqueId.CITYTOYOTADEMO,
    ];
    return showConfirmAvailableCta.includes(siteUniqueId);
  },
});

export const showBuyingProcessCtaAtom = selector<boolean>({
  key: 'buyingProcessCta',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showBuyingProcessCta = [uniqueId.JAGUARCINCINNATI];
    return showBuyingProcessCta.includes(siteUniqueId);
  },
});

export const showCarGuruDealToolAtom = selector<boolean>({
  key: 'carGuruDealTool',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showCarGuruDealTool = [uniqueId.JAGUARCERRITOS, uniqueId.NORWALKTOYOTA, uniqueId.CDJRWESTCOVINA];
    return showCarGuruDealTool.includes(siteUniqueId);
  },
});

export const showCourtesyImageAtom = selector<boolean>({
  key: 'courtesyImage',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showCourtesyImage = [uniqueId.JAGUARFAIRFIELD, uniqueId.JAGUARCERRITOS];
    return showCourtesyImage.includes(siteUniqueId);
  },
});

export const showCtaAtom = selector<boolean>({
  key: 'showCta',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showshowCta = [uniqueId.JAGUARCERRITOS];
    return showshowCta.includes(siteUniqueId);
  },
});

export const showColorSpecsAtom = selector<boolean>({
  key: 'colorSpecs',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showColorSpecs = [
      uniqueId.JAGUARCERRITOS,
      uniqueId.NISSANDEMOV3,
      uniqueId.MLADYNISSAN,
      uniqueId.HILLTOPNISSAN,
    ];
    return showColorSpecs.includes(siteUniqueId);
  },
});

export const showClickToCallBtnAtom = selector<boolean>({
  key: 'clickToCallBtn',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showClickToCallBtn = [
      uniqueId.NISSANDEMOV3,
      uniqueId.MLADYNISSAN,
      uniqueId.HILLTOPNISSAN,
      uniqueId.ROCKHILLNISSAN,
      uniqueId.TOYOTAHUNTINGTONBEACH,
      uniqueId.SPARTANBURGTOYOTA,
      uniqueId.CLAREMONTTOYOTA,
      uniqueId.JOHNSONCITYTOYOTA,
      uniqueId.JOSEPHTOYOTA,
      uniqueId.I10TOYOTA,
      uniqueId.TOYOTASB,
    ];
    return showClickToCallBtn.includes(siteUniqueId);
  },
});

export const hideOnDesktopClickBtnAtom = selector<boolean>({
  key: 'hideOnDesktopClickBtn',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const hideOnDesktopClickBtn = [uniqueId.ROCKHILLNISSAN, uniqueId.SPARTANBURGTOYOTA, uniqueId.MLADYNISSAN];
    return hideOnDesktopClickBtn.includes(siteUniqueId);
  },
});

export const clickToCallContentAtom = selector<string>({
  key: 'clickToCallBtnContent',
  get: async ({ get }) => {
    const siteId = get(siteUniqueIdAtom);
    const primaryNumber = get(primaryPhoneAtom);
    const clickToCallBtnContent: Record<UniqueID, string> = {
      [uniqueId.ROCKHILLNISSAN]: 'Click to Call',
      [uniqueId.LANDROVERCERRITOS]: 'Call',
      [uniqueId.LANDROVERFAIRFIELD]: 'Call Ryan for more information',
    };
    const defaultLabel = `Call: ${primaryNumber}`;
    return clickToCallBtnContent?.[siteId] ?? defaultLabel;
  },
});

export const showValueYourTradeACtaAtom = selector<boolean>({
  key: 'valueYourTradeACta',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showValueYourTradeACta = [
      uniqueId.MBCINCY,
      uniqueId.WESTCHESTERBENZ,
      uniqueId.TOYOTAHUNTINGTONBEACH,
      uniqueId.SPARTANBURGTOYOTA,
      uniqueId.CLAREMONTTOYOTA,
      uniqueId.BEAMANTOYOTA,
    ];
    return showValueYourTradeACta.includes(siteUniqueId);
  },
});
export const isCyvgmAtom = selector<boolean>({
  key: 'isCyvgm',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const isCyvgm = [uniqueId.CYVGM];
    return isCyvgm.includes(siteUniqueId);
  },
});
export const showValueTradeBtnLinkAtom = selector<string>({
  key: 'valueTradeBtnLink',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showValueTradeBtnLink = [uniqueId.MBCINCY, uniqueId.WESTCHESTERBENZ];
    return showValueTradeBtnLink.includes(siteUniqueId) ? '/value-your-trade' : '/value-my-vehicle';
  },
});

export const showClickToCallCtaAtom = selector<boolean>({
  key: 'ClickToCallCta',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showClickToCallCta = [uniqueId.MBCINCY, uniqueId.WESTCHESTERBENZ];
    return showClickToCallCta.includes(siteUniqueId);
  },
});

export const showTaxAndPriceAtom = selector<boolean>({
  key: 'showTaxAndPrice',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showTaxAndPriceSites = [uniqueId.MBESCONDIDO];
    return showTaxAndPriceSites.includes(siteUniqueId);
  },
});

export const confirmAvailabilityBtntextAtom = selector<string>({
  key: 'confirmAvailabilityBtnText',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const confirmAvailabilitityBtnText = [uniqueId.HUDSONAUTO];
    const defaultLabel = 'GET E-PRICE';
    return confirmAvailabilitityBtnText.includes(siteUniqueId) ? 'Get our Internet Price' : defaultLabel;
  },
});

export const getComingSoonImgAtom = selector<string>({
  key: 'getComingSoonImg',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const comingSoonImgSites = [uniqueId.MLADYNISSAN];
    return comingSoonImgSites.includes(siteUniqueId) ? comingSoonMladyImg : '';
  },
});

export const showStatusDisclaimerTextAtom = selector<boolean>({
  key: 'statusDisclaimerText',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const statusDisclaimerText = [uniqueId.RIGHTTOYOTA];
    return statusDisclaimerText.includes(siteUniqueId);
  },
});

export const hideLimitedWarrantyLogoAtom = selector<boolean>({
  key: 'hideLimitedWarrantyLogo',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const hideLimitedWarrantyLogo = [uniqueId.MYCARPARK, uniqueId.VIXENUSEDCARDEMO];
    return !hideLimitedWarrantyLogo.includes(siteUniqueId);
  },
});

export const showSrpCompareShareBtnsAtom = selector<boolean>({
  key: 'showSrpCompareShareBtns',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showSrpCompareShareBtns = [
      uniqueId.NISSANDEMOV3,
      uniqueId.MYGASTONIANISSAN,
      uniqueId.MLADYNISSAN,
      uniqueId.HILLTOPNISSAN,
      uniqueId.TOYOTAOFLASVEGAS,
    ];
    return showSrpCompareShareBtns.includes(siteUniqueId);
  },
});

export const showCarNowCtaAtom = selector<boolean>({
  key: 'showCarNowCtaSrp',
  get: async ({ get }) => {
    const siteId = get(siteUniqueIdAtom);
    const dealerSites = [
      uniqueId.TOYOTASB,
      uniqueId.TOYOTAOFLASVEGAS,
      uniqueId.MBESCONDIDO,
      uniqueId.TOYOTAWESTCOVINA,
      uniqueId.MBWESTCOVINA,
    ];
    return dealerSites.includes(siteId);
  },
});
export const showCarNowCtabAfterFormAtom = selector<boolean>({
  key: 'showCarNowCtabAfterForm',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.NORWALKTOYOTA];
    return dealerSites.includes(siteUniqueId);
  },
});
export const showPaymentOptionsCtaAtom = selector<boolean>({
  key: 'showPaymentOptionsCta',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.SUBURBANTOYOTA];
    return dealerSites.includes(siteUniqueId);
  },
});
export const getPreQualifiedBtnLinkAtom = selectorFamily({
  key: 'getPreQualifiedBtnLink',
  get: (vin: string) => async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const isVinAdd: Record<string, boolean> = {
      [uniqueId.NORWALKTOYOTA]: true,
    };
    const dataMap: Record<string, string> = {
      [uniqueId.I10TOYOTA]: 'https://extranet.dealercentric.com/CreditPlus?AssociateID=121736&AssociateTypeID=4000',
      [uniqueId.NORWALKTOYOTA]:
        'https://extranet.dealercentric.com/CreditPlus?AssociateID=300&AssociateTypeID=4000&P=GPIS&Video=speed&s=true',
    };
    if (isVinAdd[siteUniqueId] && !vin) {
      return null;
    }
    if (vin && isVinAdd[siteUniqueId] && dataMap[siteUniqueId]) {
      return `${dataMap[siteUniqueId]}&vin=${vin}`;
    }
    return dataMap[siteUniqueId] ?? null;
  },
});
export const showViewFullDetailsOnSrpAtom = selector<boolean>({
  key: 'showViewFullDetailsOnSrp',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.HUDSONAUTO];
    return dealerSites.includes(siteUniqueId);
  },
});
