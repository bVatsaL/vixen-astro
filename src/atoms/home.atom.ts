import { selector } from 'recoil-ssr';
import { siteIdAtom, siteUniqueIdAtom } from './site.atom';
import { UniqueID, uniqueId } from '@utils/constant';

interface sitesMapSalesBannerIdWiseType {
  [key: string]: number | string;
}
interface sitesMapVideoUrl {
  [key: string]: string;
}
export const pureInfluencerDealerIdAtom = selector<string>({
  key: 'pureInfluencerDealerId',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const pureInfluencerDealerIdData: Record<string, string> = {
      [uniqueId.MYGASTONIANISSAN]: 'a6okLuNfgjLgWrSix',
      [uniqueId.HILLTOPNISSAN]: '64e8d6a145c81f6df3321a5f',
      [uniqueId.TOYOTAOFLASVEGAS]: '653fcdde9ba3aa45e6799866',
      [uniqueId.CLAREMONTTOYOTA]: '659dd063efc6264ef11cc0d0',
      [uniqueId.TOYOTAHUNTINGTONBEACH]: '659dcf30efc6264ef11cc093',
    };
    return pureInfluencerDealerIdData?.[siteUniqueId] ?? '';
  },
});

export const showBorderSubheroAtom = selector<boolean>({
  key: 'showBorderSubhero',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const pureInfluencerDealerIdData = [uniqueId.WESTCHESTERBENZ, uniqueId.MBCINCY];
    return pureInfluencerDealerIdData.includes(siteUniqueId);
  },
});

export const getSalesAndRatingBannerIdAtom = selector({
  key: 'getSalesAndRatingBannerId',
  get: ({ get }) => {
    const sitesMapSalesBannerIdWise: sitesMapSalesBannerIdWiseType = {
      [uniqueId.WESTCHESTERBENZ]: 62437,
      [uniqueId.MBCINCY]: 62436,
      [uniqueId.MBESCONDIDO]: 62437,
      [uniqueId.MBSACRAMENTO]: '05189',
      [uniqueId.MBWESTCOVINA]: '05327',
      [uniqueId.MBOFROCKLIN]: '05133',
      [uniqueId.MBOFEDH]: '05138',
    };
    const siteUniqueId = get(siteUniqueIdAtom);
    return sitesMapSalesBannerIdWise[siteUniqueId];
  },
});
export const getHpVideoURLAtom = selector({
  key: 'getHpVideoURL',
  get: ({ get }) => {
    const sitesMapHPV: sitesMapVideoUrl = {
      // uniqueId.MBSACRAMENTO:
      //   'https://static.foxdealer.com/928/2023/10/MBS-Tour.mp4',
    };
    const siteUniqueId = get(siteUniqueIdAtom);
    return sitesMapHPV[siteUniqueId];
  },
});

export const HomeEpressHeroAtom = selector<{ imageUrl: string; mobileImage: string }>({
  key: 'HomeEpressHero',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const HomeEpressHero: Record<string, { imageUrl: string; mobileImage: string }> = {
      [uniqueId.MBOFROCKLIN]: {
        imageUrl: 'https://cdn-pods.foxdealer.com/mbofrocklin/p_3_a7e3582576.webp',
        mobileImage: '',
      },
      [uniqueId.MBWESTCOVINA]: {
        imageUrl: 'https://static.foxdealer.com/880/2022/09/roadster-hp-hero.png',
        mobileImage: 'https://static.foxdealer.com/880/2022/09/roadster-hp-hero-mobile.png',
      },
      [uniqueId.MBSACRAMENTO]: {
        imageUrl: 'https://static.foxdealer.com/880/2022/09/roadster-hp-hero.png',
        mobileImage: 'https://static.foxdealer.com/880/2022/09/roadster-hp-hero-mobile.png',
      },
      [uniqueId.MBOFEDH]: {
        imageUrl: 'https://static.foxdealer.com/880/2022/09/roadster-hp-hero.png',
        mobileImage: '',
      },
    };

    return HomeEpressHero?.[siteUniqueId] ?? { imageUrl: '' };
  },
});

export const sellyourVehicleButtonAtom = selector({
  key: 'sellyourVehicleButton',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const sellyourVehicleButtonLink: { link: string }[] = [];

    if (siteUniqueId === uniqueId.MYCARPARK) {
      sellyourVehicleButtonLink.push({ link: '/trade-in' });
    }
    if (siteUniqueId === uniqueId.VIXENUSEDCARDEMO) {
      sellyourVehicleButtonLink.push({ link: '/value-your-trade' });
    }
    return sellyourVehicleButtonLink;
  },
});

export const valueYoutTradeButtonAtom = selector({
  key: 'valueYoutTradeButton',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const valueYoutTradeButtonLink: { link: string }[] = [];
    if (siteUniqueId === uniqueId.VIXENUSEDCARDEMO) {
      valueYoutTradeButtonLink.push({ link: '/value-your-trade' });
    }
    if (siteUniqueId === uniqueId.MYCARPARK) {
      valueYoutTradeButtonLink.push({ link: '/trade-in' });
    }
    return valueYoutTradeButtonLink;
  },
});

export const timingLablesAtom = selector<string[]>({
  key: 'timingLables',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const timingLablesDetails: Record<string, string[]> = {
      Mycarpark: ['Sales'],
      'Sierra CDJR Used Car Superstore': ['Sales'],
      'Norwalk Toyota': ['Sales', 'Service & Parts', 'Collision Center', 'Internet/Fleet Dept.'],
    };
    return (timingLablesDetails?.[siteUniqueId] ?? ['Sales', 'Service & Parts']) || ['Sales', 'Service & Parts'];
  },
});

export const showAdsBannerAtom = selector<boolean>({
  key: 'adsBanner',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const adsBanner = [uniqueId.ROCKYMOUNTTOYOTA];
    return adsBanner.includes(siteUniqueId);
  },
});

export const showServiceVehicleAtom = selector<boolean>({
  key: 'serviceVehicle',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const serviceVehicle = [uniqueId.ROCKYMOUNTTOYOTA];
    return serviceVehicle.includes(siteUniqueId);
  },
});

export const getDirectionPlaceholderAtom = selector<string>({
  key: 'getDirectionPlaceholder',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const placeholderMapObject: Record<string, string> = {
      Mycarpark: 'Starting Point',
    };
    return placeholderMapObject[siteUniqueId] ? placeholderMapObject[siteUniqueId] : 'Get Directions';
  },
});

export const expressStoreIframeUrlAtom = selector<string>({
  key: 'expressStoreIframeUrl',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const expressStoreIrameUrls: Record<string, string> = {
      Mycarpark: 'Starting Point',
      [uniqueId.TOYOTAHUNTINGTONBEACH]:
        'https://player.vimeo.com/video/710208972?h=1961b4d315&color=ffffff&byline=0&portrait=0',
      [uniqueId.MBESCONDIDO]: 'https://player.vimeo.com/video/749466181?h=bc42310fbc&color=ffffff&byline=0&portrait=0',
      [uniqueId.MBWESTCOVINA]: 'https://player.vimeo.com/video/749465788?h=df88cc609f&color=ffffff&byline=0&portrait=0',
      [uniqueId.WESTCHESTERBENZ]:
        'https://player.vimeo.com/video/840762415?h=0e67d8ce60&color=ffffff&byline=0&portrait=0',
      [uniqueId.MBCINCY]: 'https://player.vimeo.com/video/840762461?h=18068651e2&color=ffffff&byline=0&portrait=0',
      [uniqueId.MBSACRAMENTO]: 'https://player.vimeo.com/video/444129458?color=ffffff&byline=0&portrait=0',
      [uniqueId.MBOFEDH]: 'https://player.vimeo.com/video/444130396?color=ffffff&byline=0&portrait=0',
    };
    return expressStoreIrameUrls?.[siteUniqueId] ?? '';
  },
});

//spesific for nissantheme1

export const showStaticSalesSliderAtom = selector<boolean>({
  key: 'showStaticSalesSlider',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const siteToIncludeSaleSlider = [''];
    return siteToIncludeSaleSlider.includes(siteUniqueId);
  },
});

export const showStaticReviewBannerAtom = selector<boolean>({
  key: 'showStaticReviewBanner',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const siteToIncludeSaleSlider = [uniqueId.ROCKHILLNISSAN];
    return siteToIncludeSaleSlider.includes(siteUniqueId);
  },
});

export const showStaticNewyearBannerAtom = selector<boolean>({
  key: 'showStaticNewyearBanner',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const siteToIncludeNewyear = [''];
    return siteToIncludeNewyear.includes(siteUniqueId);
  },
});

export const showStaticHpBannerAtom = selector<boolean>({
  key: 'showStaticHpBanner',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const siteToIncludeStaticHpBanner = [uniqueId.ROCKHILLNISSAN];
    return siteToIncludeStaticHpBanner.includes(siteUniqueId);
  },
});
export const showHpCouponSliderAtom = selector<boolean>({
  key: 'showHpCouponSliderAtom',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const siteToIncludeServiceSlider = [uniqueId.ROCKHILLNISSAN];
    return siteToIncludeServiceSlider.includes(siteUniqueId);
  },
});
export const showStaticServiceSliderAtom = selector<boolean>({
  key: 'showStaticServiceSlider',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const siteToIncludeServiceSlider = [uniqueId.ROCKHILLNISSAN];
    return siteToIncludeServiceSlider.includes(siteUniqueId);
  },
});

export const showHpBannerSwiperAtom = selector<boolean>({
  key: 'showHpBannerSwiper',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showHpBannerSwiperSites = [uniqueId.JOHNSONCITYTOYOTA];
    return showHpBannerSwiperSites.includes(siteUniqueId);
  },
});

export const showCustomNavBanner = selector<boolean>({
  key: 'showCustomNavBanner',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showCustomNavBannerSites = [uniqueId.JOHNSONCITYTOYOTA, uniqueId.SPARTANBURGTOYOTA];
    return showCustomNavBannerSites.includes(siteUniqueId);
  },
});

export const showServiceAndPartsContactAtom = selector<boolean>({
  key: 'showServiceAndPartsContact',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.I10TOYOTA, uniqueId.TOYOTASB, uniqueId.TOYOTAOFLASVEGAS];
    return dealerSites.includes(siteUniqueId);
  },
});

export const serviceVehicleImgPathAtom = selector<string>({
  key: 'serviceVehicleImgPath',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const imgPaths: Record<string, string> = {
      [uniqueId.CLAREMONTTOYOTA]:
        'https://cdn-pods.foxdealer.com/claremonttoyota/service_wont_slow_you_down_2aa3b9823b.jpg',
      [uniqueId.TOYOTAHUNTINGTONBEACH]: 'https://cdn-pods.foxdealer.com/admin/Service_hp_toyotaofhb_5c1b8f3e2d.jpg',
      [uniqueId.TOYOTAOFLASVEGAS]:
        'https://cdn-pods.foxdealer.com/toyotademo3/c5c7b021_d4c9_46cf_8087_695a8fb36624_8d0703ae3a.jpg',
    };
    return imgPaths?.[siteUniqueId] ?? 'https://cdn-pods.foxdealer.com/admin/service_a897e02b31.png';
  },
});

export const hideVerticalDiscalimerAtom = selector<boolean>({
  key: 'hideVerticalDiscalimer',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const hideVerticalDiscalimerSites = [uniqueId.MLADYNISSAN];
    return !hideVerticalDiscalimerSites.includes(siteUniqueId);
  },
});

export const showDisclaimerBelowItemAtom = selector<boolean>({
  key: 'showDisclaimerBelowItem',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showDisclaimerBelowItemSites = [uniqueId.MLADYNISSAN];
    return showDisclaimerBelowItemSites.includes(siteUniqueId);
  },
});

export const bannerImgPathAtom = selector<string>({
  key: 'bannerImg',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const imgPaths: Record<string, string> = {
      [uniqueId.SUBURBANTOYOTA]: 'https://cdn-pods.foxdealer.com/toyotademo3/Heder_Placeholder_884d4213b5.jpeg',
      [uniqueId.CDJRWESTCOVINA]: 'https://cdn-pods.foxdealer.com/toyotademo3/Hero_Image_391081c0de.png',
    };
    return imgPaths?.[siteUniqueId] ?? 'https://cdn-pods.foxdealer.com/toyotademo3/Heder_Placeholder_884d4213b5.jpeg';
  },
});

export const bannerVideoPathAtom = selector<string>({
  key: 'bannerVideoPath',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const videoPaths: Record<string, string> = {
      [uniqueId.NORWALKTOYOTA]:
        'https://cdn-pods.foxdealer.com/norwalktoyota/Norwalk_Toyota_banner_video_9c343cd553.mp4',
      [uniqueId.TOYOTAOFMILPITAS]: 'https://cdn-pods.foxdealer.com/toyotamilpitas/ETM_Video_Tour_a07a2ca7b0.mp4',
      [uniqueId.TOYOTAWESTCOVINA]: 'https://static.foxdealer.com/680/2024/01/TWC-Homepage-Video.mp4',
      [uniqueId.MBWESTCOVINA]: 'https://static.foxdealer.com/880/2023/11/MBWC_Promo_min.mp4',
      [uniqueId.MBSACRAMENTO]: 'https://static.foxdealer.com/928/2023/10/MBS-Tour.mp4',
      [uniqueId.MBOFEDH]: 'https://static.foxdealer.com/924/2023/11/MB-EDH-Tour.mp4',
      [uniqueId.MBOFROCKLIN]: 'https://cdn-pods.foxdealer.com/mbescondido/MBR_Promo_60_b7a2a85953.mp4',
      [uniqueId.CDJRWESTCOVINA]: 'https://cdn-pods.foxdealer.com/cdjrwestcovina/CDJR_Promo_1_d76d1da851.mp4',
    };
    return videoPaths?.[siteUniqueId] ?? '';
  },
});
export const hideHomeHeroBannerDescriptionAtom = selector<boolean>({
  key: 'hideHomeHeroBannerDescription',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.TOYOTAOFLASVEGAS];
    return dealerSites.includes(siteUniqueId);
  },
});
export const searchWithoutFilters = selector<boolean>({
  key: 'searchWithoutFilters',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [
      uniqueId.NORWALKTOYOTA,
      uniqueId.MBWESTCOVINA,
      uniqueId.MBSACRAMENTO,
      uniqueId.TOYOTAOFMILPITAS,
      uniqueId.TOYOTAWESTCOVINA,
      uniqueId.MBOFEDH,
      uniqueId.MBOFROCKLIN,
      uniqueId.CDJRWESTCOVINA,
    ];
    return dealerSites.includes(siteUniqueId);
  },
});
export const hpHeroSubHeroBtns = selector<boolean>({
  key: 'hpHeroSubHeroBtns',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [
      uniqueId.NORWALKTOYOTA,
      uniqueId.MBWESTCOVINA,
      uniqueId.MBSACRAMENTO,
      uniqueId.TOYOTAOFMILPITAS,
      uniqueId.TOYOTAWESTCOVINA,
      uniqueId.MBOFEDH,
      uniqueId.MBOFROCKLIN,
      uniqueId.CDJRWESTCOVINA,
    ];
    return dealerSites.includes(siteUniqueId);
  },
});
export const showHeroBannerWithSearchAtom = selector<boolean>({
  key: 'showHeroBannerWithSearch',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.MBWESTCOVINA, uniqueId.MBSACRAMENTO, uniqueId.MBOFEDH, uniqueId.MBOFROCKLIN];
    return dealerSites.includes(siteUniqueId);
  },
});
export const showSearchBarOnHomePageAtom = selector<boolean>({
  key: 'showSearchBarOnHomePage',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.LANDROVERVENTURA, uniqueId.JAGUARVENTURA, uniqueId.TOYOTAOFMIDLAND];
    return dealerSites.includes(siteUniqueId);
  },
});

export const showSubHeroNavSectionAtom = selector<boolean>({
  key: 'showSubHeroNavSection',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.MYCARPARK, uniqueId.VIXENUSEDCARDEMO];
    return dealerSites.includes(siteUniqueId);
  },
});

export const hideExploreVehicleCategoryAtom = selector<boolean>({
  key: 'hideExploreVehicleCategory',
  get: ({ get }) => {
    const siteId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.TOYOTAWESTCOVINA, uniqueId.SUBURBANTOYOTA, uniqueId.TOYOTAOFMILPITAS];
    return dealerSites.includes(siteId);
  },
});

export const useAboutUsVideoAtom = selector({
  key: 'useAboutUsVideo',
  get: ({ get }) => {
    const siteId = get(siteIdAtom).toString();
    const sitesToIncludeVideo = ['680'];
    return sitesToIncludeVideo.includes(siteId);
  },
});

export const aboutUsVideoPathAtom = selector({
  key: 'useAboutUsPathVideo',
  get: ({ get }) => {
    const siteId = get(siteIdAtom).toString();
    const videoPaths: Record<string, string> = {
      '680': 'https://static.foxdealer.com/680/2023/10/TWC-Homepage-Video.mp4',
    };
    return videoPaths?.[siteId] ?? '';
  },
});

export const showPartsServiceCallonTimesAtom = selector<boolean>({
  key: 'showPartsServiceCallonTimes',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showPartsServiceCallonTimesSites = [uniqueId.WESTCHESTERBENZ, uniqueId.MBCINCY, uniqueId.MBOFROCKLIN];
    return showPartsServiceCallonTimesSites.includes(siteUniqueId);
  },
});

export const hideMobileBtnNavAtom = selector<boolean>({
  key: 'hideMobileBtnNav',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const hideMobileBtnNavSites = [
      uniqueId.WESTCHESTERBENZ,
      uniqueId.MBCINCY,
      uniqueId.MBOFROCKLIN,
      uniqueId.MBWESTCOVINA,
      uniqueId.MBSACRAMENTO,
    ];
    return hideMobileBtnNavSites.includes(siteUniqueId);
  },
});
export const openHeaderMapInNewTabAtom = selector<boolean>({
  key: 'openHeaderMapInNewTab',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const openHeaderMapInNewTabSites = [uniqueId.MBOFROCKLIN];
    return openHeaderMapInNewTabSites.includes(siteUniqueId);
  },
});

export const homeStaticCardBtnUrlAtom = selector({
  key: ' homeStaticCardBtnUrl',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    let buttonUrl = '/toyota-express-maintenance/';
    if (siteUniqueId === uniqueId.TOYOTAWESTCOVINA) {
      buttonUrl = '/schedule-service/';
    }
    return buttonUrl;
  },
});
export const openSubheroNewVehicleModelAtom = selector<boolean>({
  key: 'openSubheroNewVehicleModel',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.TOYOTAOFLASVEGAS];
    return dealerSites.includes(siteUniqueId);
  },
});

export const hpInventorySliderUrlAtom = selector<string>({
  key: 'hpInventorySliderUrl',
  get: ({ get }) => {
    const siteId = get(siteUniqueIdAtom);
    const hpInventorySliderUrls: Record<UniqueID, string> = {
      [uniqueId.HILLTOPNISSAN]: 'type=used',
    };
    return (hpInventorySliderUrls?.[siteId] ?? '') || '';
  },
});

export const onlineCreditApplicationUrlsAtom = selector({
  key: 'onlineCreditApplicationUrls',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const CreditApplicationUrls: Record<UniqueID, string> = {
      [uniqueId.CINCINNATILANDROVER]: 'https://www.routeone.net/digital-retail-ui/?dealerId=FF5DG',
      [uniqueId.JAGUARCINCINNATI]: 'https://www.routeone.net/digital-retail-ui/?dealerId=FF5DG',
    };
    return CreditApplicationUrls?.[siteUniqueId] ?? '';
  },
});

export const showSmartPixlVerbiageAtom = selector<boolean>({
  key: 'showSmartPixlVerbiage',
  get: ({ get }) => {
    const siteId = get(siteUniqueIdAtom);
    const showSmartPixlVerbiageSites = [uniqueId.RIGHTTOYOTA];
    return showSmartPixlVerbiageSites.includes(siteId);
  },
});

export const showDiffBannerTextAtom = selector<boolean>({
  key: 'showDiffBannerText',
  get: ({ get }) => {
    const siteId = get(siteUniqueIdAtom);
    const showDiffBannerTextSites = [uniqueId.CLAREMONTTOYOTA];
    return showDiffBannerTextSites.includes(siteId);
  },
});
