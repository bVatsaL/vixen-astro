import { selector } from 'recoil-ssr';
import { siteUniqueIdAtom } from './site.atom';
import { ctaPrimaryTextAtom } from './settings.atom';
import { uniqueId } from '@utils/constant';

export const vdpFormCommentDefaultValueAtom = selector<string>({
  key: 'vdpFormCommentDefaultValue',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const vdpFormCommentDefaultValue: any = {
      [uniqueId.ROCKHILLNISSAN]: {
        comment: '',
      },
      [uniqueId.MYGASTONIANISSAN]: {
        comment: 'Find out more about this vehicle.',
      },
      [uniqueId.HILLTOPNISSAN]: {
        comment: 'Have a question?',
      },
      [uniqueId.MLADYNISSAN]: {
        comment: 'Find out more about this vehicle.',
      },
      [uniqueId.NISSANDEMOV3]: {
        comment: 'Find out more about this vehicle.',
      },
    };
    return vdpFormCommentDefaultValue?.[siteUniqueId]?.comment ?? '';
  },
});

export const vdpFormCommentPlaceholderAtom = selector<string>({
  key: 'vdpFormCommentPlaceholder',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const vdpFormCommentPlaceholder: any = {
      [uniqueId.ROCKHILLNISSAN]: {
        placeholder: 'Comments',
      },
    };
    return vdpFormCommentPlaceholder?.[siteUniqueId]?.placeholder ?? '';
  },
});

export const showScheduleTestDriveFormBtnAtom = selector<boolean>({
  key: 'showScheduleTestDriveFormBtn',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showScheduleTestDriveFormBtn = [
      uniqueId.NISSANDEMOV3,
      uniqueId.MLADYNISSAN,
      uniqueId.HILLTOPNISSAN,
      uniqueId.MYCARPARK,
      uniqueId.VIXENUSEDCARDEMO,
    ];
    return showScheduleTestDriveFormBtn.includes(siteUniqueId);
  },
});
export const showVdpForm1001CardFormAtom = selector<boolean>({
  key: 'showVdpForm1001CardForm',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showScheduleTestDriveFormBtn = [
      uniqueId.ROCKYMOUNTTOYOTA,
      uniqueId.VIXENTOYOTADEMO,
      uniqueId.TOYOTAOFMIDLAND,
    ];
    return showScheduleTestDriveFormBtn.includes(siteUniqueId);
  },
});

export const showLeadFormCommentFieldAtom = selector<boolean>({
  key: 'showLeadFormCommentField',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showLeadFormCommentField = [uniqueId.ROCKHILLNISSAN, uniqueId.HILLTOPNISSAN];
    return showLeadFormCommentField.includes(siteUniqueId);
  },
});
export const showCarSaverBuyWidgetAtom = selector<boolean>({
  key: 'showCarSaverBuyWidget',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showCarSaverBuyWidget = [
      uniqueId.NISSANDEMOV3,
      uniqueId.JAGUARCERRITOS,
      uniqueId.MLADYNISSAN,
      uniqueId.HILLTOPNISSAN,
    ];
    return showCarSaverBuyWidget.includes(siteUniqueId);
  },
});

export const vdpFormBtnTextAtom = selector<string>({
  key: 'vdpFormBtnText',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const vdpFormBtnText: any = {
      [uniqueId.ROCKHILLNISSAN]: {
        BtnText: 'Get Our Best Price',
      },
      [uniqueId.MYGASTONIANISSAN]: {
        BtnText: get(ctaPrimaryTextAtom),
      },
      [uniqueId.HILLTOPNISSAN]: {
        BtnText: 'GET E-PRICE',
      },
      [uniqueId.MLADYNISSAN]: {
        BtnText: get(ctaPrimaryTextAtom),
      },
      [uniqueId.NISSANDEMOV3]: {
        BtnText: 'GET E-PRICE',
      },
    };
    return vdpFormBtnText?.[siteUniqueId]?.BtnText ?? '';
  },
});

export const showOnlyFinalPriceAtom = selector<boolean>({
  key: 'showOnlyFinalPrice',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.HONDAKINGSPORT];
    return dealerSites.includes(siteUniqueId);
  },
});
export const showTotalCostAtFinanceTabHeadingAtom = selector<boolean>({
  key: 'showTotalCostAtFinanceTabHeading',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.MBOFROCKLIN, uniqueId.MBOFEDH];
    return dealerSites.includes(siteUniqueId);
  },
});

export const showVDPValueYourTradeBtnAtom = selector<boolean>({
  key: 'showVDPValueYourTradeBtn',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.LANDROVERCERRITOS];
    return dealerSites.includes(siteUniqueId);
  },
});
export const showMilageVDPAtom = selector<boolean>({
  key: 'showMilageVDP',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.SIERRACDJRUSEDCARSUPERSTORE];
    return dealerSites.includes(siteUniqueId);
  },
});
