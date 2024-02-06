import { selector, selectorFamily } from 'recoil-ssr';
import { BannerItem } from '@typedefs/banner';
import { parseInventoryUrlParams } from '@utils/inventory.util';
import { cachedFetch } from './cache.atom';
import { siteUniqueIdAtom } from './site.atom';
import { siteIdAtom } from './site.atom';
import { uniqueId } from '@utils/constant';

export const bannersAtom = selector({
  key: 'banners',
  get: async ({ get }) => {
    const banners = await cachedFetch(
      {
        id: 'banners',
        path: 'banners',
        rootContext: 'banners',
        filterDataPaths: [
          'title',
          'isDefaultBanner',
          'additionalSettings.vixen_only',
          'additionalSettings.is_hp_background_img_enabled',
          'schedule.pages.homepage.show',
          'schedule.pages.homepage.images.desktop.url',
          'schedule.pages.homepage.url',
          'schedule.pages.homepage.target',
          'schedule.pages.srp.show',
          'schedule.pages.srp.images.desktop.url',
          'schedule.pages.srp.images.mobile.url',
          'schedule.pages.srp.url',
          'schedule.pages.srp.target',
          'schedule.pages.srp.urlApplyTo',
          'schedule.pages.srp.query_fields',
          'schedule.pages.srp.images.desktop.url',
          'schedule.disclaimer',
          'schedule.pages.homepage.homepagespecial',
          'schedule.pages.homepage.images.mobile.url',
          'schedule.pages.homepage.noDesktopBannerOnMobile',
          'schedule.pages.homepage.video.url',
        ],
      },
      get,
    );
    const vixenOnlyBanners =
      banners?.filter((banner: BannerItem) => !!banner?.additionalSettings?.vixen_only?.[0]) ?? [];
    return !vixenOnlyBanners?.length ? banners : vixenOnlyBanners;
  },
});

export type Banner = {
  imageTitle: string;
  imageSrc: string;
  link: string;
  linkTarget: string;
  imageDisclaimer: string;
  homepagespecials: boolean;
  noDesktopBannerOnMobile: boolean;
  mobileImage: string;
  queryFields: {
    make?: string[];
    model?: string[];
    trim?: string[];
    type?: string[];
    vdp?: boolean[];
    year: string[];
  };
  isDefaultBanner?: boolean;
  videoUrl?: string;
  additionalSettings?: {
    vixen_only?: any;
    is_hp_background_img_enabled?: any;
  };
  urlApplyto?: string[];
  alt?: string;
  isHpBgBanner?: boolean;
};

export const homepageBannersAtom = selector<Banner[]>({
  key: 'homepageBanners',
  get: async ({ get }) => {
    const banners = get(bannersAtom);
    const hpBackgroundImgEnabled = banners?.filter(
      (banner: BannerItem) =>
        !!banner?.additionalSettings?.is_hp_background_img_enabled?.[0] && !!banner?.schedule?.pages?.homepage?.show,
    );
    return (hpBackgroundImgEnabled?.length ? hpBackgroundImgEnabled : banners)
      .filter((banner: BannerItem) => !!banner?.schedule?.pages?.homepage?.show)
      .map((banner: BannerItem) => ({
        imageTitle: banner.title ?? '',
        imageSrc: banner?.schedule?.pages?.homepage?.images?.desktop?.url ?? '',
        link: banner?.schedule?.pages?.homepage?.url ?? '',
        linkTarget: banner?.schedule?.pages?.homepage?.target ?? '_blank',
        imageDisclaimer: banner?.schedule?.disclaimer ?? '',
        homepagespecials: banner?.schedule?.pages?.homepage?.homepagespecial,
        mobileImage: banner?.schedule?.pages?.homepage?.images?.mobile?.url ?? '',
        noDesktopBannerOnMobile: banner?.schedule?.pages?.homepage?.noDesktopBannerOnMobile ?? false,
        videoUrl: banner?.schedule?.pages?.homepage?.video?.url ?? '',
        alt: banner?.schedule?.pages?.homepage?.images?.desktop?.alt ?? '',
        isHpBgBanner: !!banner?.additionalSettings?.is_hp_background_img_enabled?.[0],
      }));
  },
});
export const homepageBannersForHomepageSpecialsPageAtom = selector<Banner[]>({
  key: 'homepageBannersForHomepageSpecialsPage',
  get: async ({ get }) => {
    const banners = get(bannersAtom);
    return banners
      .filter((banner: BannerItem) => !!banner?.schedule?.pages?.homepage?.homepagespecial)
      .map((banner: BannerItem) => ({
        imageTitle: banner.title ?? '',
        imageSrc: banner?.schedule?.pages?.homepage?.images?.desktop?.url ?? '',
        link: banner?.schedule?.pages?.homepage?.url ?? '',
        linkTarget: banner?.schedule?.pages?.homepage?.target ?? '_blank',
        imageDisclaimer: banner?.schedule?.disclaimer ?? '',
        homepagespecials: banner?.schedule?.pages?.homepage?.homepagespecial,
        mobileImage: banner?.schedule?.pages?.homepage?.images?.mobile?.url ?? '',
        noDesktopBannerOnMobile: banner?.schedule?.pages?.homepage?.noDesktopBannerOnMobile ?? false,
        videoUrl: banner?.schedule?.pages?.homepage?.video?.url ?? '',
      }));
  },
});
// export const homepageMobileBannersAtom = selector<Banner[]>({
//   key: 'homepageMobileBanners',
//   get: async ({ get }) => {
//     const banners = get(bannersAtom);
//     return banners
//       .filter((banner: BannerItem) => !!banner?.schedule?.pages?.homepage?.show)
//       .map((banner: BannerItem) => ({
//         imageTitle: banner.title ?? '',
//         imageSrc: banner?.schedule?.pages?.homepage?.images?.mobile?.url ?? '',
//         link: banner?.schedule?.pages?.homepage?.url ?? '',
//         linkTarget: banner?.schedule?.pages?.homepage?.target ?? '_blank',
//         imageDisclaimer: banner?.schedule?.disclaimer ?? '',
//       }));
//   },
// });

export const srpBannersAtom = selector<Banner[]>({
  key: 'srpBanners',
  get: async ({ get }) => {
    const banners = get(bannersAtom);
    return banners
      .filter((banner: BannerItem) => !!banner?.schedule?.pages?.srp?.show)
      .map((banner: BannerItem) => ({
        imageTitle: banner.title ?? '',
        imageSrc: banner?.schedule?.pages?.srp?.images?.desktop?.url ?? '',
        link: banner?.schedule?.pages?.srp?.url ?? '',
        urlApplyto: (banner?.schedule?.pages?.srp?.urlApplyTo ?? [])
          .filter((path) => path.indexOf('/inventory/') !== -1)
          .map((partialPath) => parseInventoryUrlParams(partialPath)),
        linkTarget: banner?.schedule?.pages?.srp?.target ?? '_blank',
        imageDisclaimer: banner?.schedule?.disclaimer ?? '',
        queryFields: banner?.schedule?.pages?.srp?.query_fields,
        isDefaultBanner: banner?.isDefaultBanner,
        mobileImage: banner?.schedule?.pages?.srp?.images?.mobile?.url ?? '',
      }));
  },
});

export const srpPageBannerAtom = selectorFamily({
  key: 'srpPageBanner',
  get:
    ({ pathname, search }: { pathname: string; search: string }) =>
    async ({ get }) => {
      const banners = get(srpBannersAtom);
      const siteUniqueId = get(siteUniqueIdAtom);
      const showAllSrpBannersSites = [uniqueId.TOYOTAOFLASVEGAS];
      const showAllbannersWithoutDefaultBanner = [uniqueId.MYGASTONIANISSAN];
      const dummyInventoryUrl = new URL('/inventory/', 'https://www.foxdealer.com');
      dummyInventoryUrl.pathname = pathname;
      dummyInventoryUrl.search = search;
      const searchParams = parseInventoryUrlParams(dummyInventoryUrl.toString());
      searchParams.delete('ref');
      const searchString = searchParams.toString();
      let srpBanner =
        banners
          .filter(
            (b: any) =>
              !!b.urlApplyto.find((urlSearchParams: URLSearchParams) => urlSearchParams.toString() === searchString),
          )
          .filter((i) => !!i.imageSrc) ?? null;
      // if (!srpBanner?.length) {
      const querySrpBanner =
        banners
          .filter((banner) => {
            const queryFields = banner?.queryFields ?? {};

            let returnValue = false;

            // if (queryFields.vdp?.includes(false)) {
            const keys = Object.keys(queryFields) as (keyof typeof queryFields)[];

            keys.forEach((key: keyof typeof queryFields) => {
              if (queryFields[key]?.length && searchParams.has(key)) {
                const searchKey = searchParams?.get?.(key)?.trim?.().toLowerCase?.()?.split?.(',') ?? [];
                const returnArr: boolean[] = [];
                searchKey?.forEach((s: string) => {
                  returnArr.push(!!queryFields?.[key]?.toString()?.trim()?.toLowerCase?.()?.split(',')?.includes?.(s));
                });
                returnValue = !!returnArr?.filter(Boolean)?.length;
                // queryFields[key]?.toString()?.trim()?.toLowerCase() ===
                // searchParams?.get(key)?.trim().toLowerCase();
              }
              if (key === 'type' && !searchParams.has(key)) {
                const istypeNewandUsed = queryFields?.[key]?.toString()?.trim()?.toLowerCase?.() === 'new,used';
                returnValue = istypeNewandUsed;
              }
            });
            // }
            return returnValue;
          })
          .filter((i) => !!i.imageSrc) ?? null;
      if (!srpBanner?.length && showAllbannersWithoutDefaultBanner.includes(siteUniqueId)) {
        srpBanner = banners.filter((banner) => !banner.isDefaultBanner) ?? null;
      }
      if (showAllSrpBannersSites.includes(siteUniqueId)) {
        srpBanner = banners.filter((banner) => !!banner?.imageSrc) ?? null;
      }
      if (querySrpBanner?.length) {
        querySrpBanner.forEach((i) => {
          srpBanner.push(i);
        });
      }
      // }

      if (!srpBanner?.length) {
        srpBanner = banners.filter((banner) => !!banner.isDefaultBanner) ?? null;
      }

      return srpBanner;
    },
});

export const specialsPageBannerAtom = selector<Banner[]>({
  key: 'specialsPageBanner',
  get: async ({ get }) => {
    const banners = get(bannersAtom);
    return banners
      .filter((banner: BannerItem) => !!banner?.schedule?.pages?.homepage?.homepagespecial)
      .map((banner: BannerItem) => ({
        imageTitle: banner.title ?? '',
        imageSrc: banner?.schedule?.pages?.homepage?.images?.desktop?.url ?? '',
        link: banner?.schedule?.pages?.homepage?.url ?? '',
        linkTarget: banner?.schedule?.pages?.homepage?.target ?? '_blank',
        imageDisclaimer: banner?.schedule?.disclaimer ?? '',
        mobileImage: banner?.schedule?.pages?.homepage?.images?.mobile?.url ?? '',
      }));
  },
});

export const staticPageBannersAtom = selectorFamily({
  key: 'staticPageBanners',
  get: (slug: string) => async ({ get }) => {
    const banners = get(bannersAtom);
    return banners
      .filter(
        (banner: BannerItem) =>
          !!banner?.schedule?.pages?.srp?.show &&
          !!banner?.schedule?.pages?.srp?.urlApplyTo?.filter?.((path) => path.indexOf(slug) !== -1)?.length,
      )
      ?.filter((b: BannerItem) => !!b?.schedule?.pages?.srp?.images?.desktop?.url)
      ?.map((banner: BannerItem) => ({
        imageTitle: banner.title ?? '',
        imageSrc: banner?.schedule?.pages?.srp?.images?.desktop?.url ?? '',
        link: banner?.schedule?.pages?.srp?.url ?? '',
        urlApplyto: (banner?.schedule?.pages?.srp?.urlApplyTo ?? [])
          .filter((path) => path.indexOf(slug) !== -1)
          .map((partialPath) => parseInventoryUrlParams(partialPath)),
        linkTarget: banner?.schedule?.pages?.srp?.target ?? '_blank',
        imageDisclaimer: banner?.schedule?.disclaimer ?? '',
      }));
  },
});

export const vdpPageBannerAtom = selectorFamily({
  key: 'vdpPageBanner',
  get:
    ({ pathname, search }: { pathname: string; search: string }) =>
    async ({ get }) => {
      const banners = get(srpBannersAtom);
      const dummyInventoryUrl = new URL('/inventory/', 'https://www.foxdealer.com');
      dummyInventoryUrl.pathname = pathname;
      dummyInventoryUrl.search = search;
      const searchParams = parseInventoryUrlParams(dummyInventoryUrl.toString());
      const vdpBanner =
        banners
          .filter((banner) => {
            const queryFields = banner?.queryFields ?? {};
            if (!!queryFields?.vdp?.length && !!queryFields?.vdp?.[0]) {
              const bannersReturnValueArray: boolean[] = [];
              let returnValue = false;
              const keys = Object.keys(queryFields) as (keyof typeof queryFields)[];
              keys.forEach((key: keyof typeof queryFields) => {
                if (queryFields[key]?.length && searchParams.has(key)) {
                  const searchKey = searchParams?.get?.(key)?.trim?.().toLowerCase?.()?.split?.(',')?.[0] ?? '';
                  bannersReturnValueArray.push(
                    !!queryFields?.[key]?.toString()?.trim()?.toLowerCase?.()?.split(',')?.includes?.(searchKey),
                  );
                }
                if (key === 'type' && !searchParams.has(key)) {
                  const istypeNewandUsed = queryFields?.[key]?.toString()?.trim()?.toLowerCase?.() === 'new,used';
                  bannersReturnValueArray.push(istypeNewandUsed);
                }
                returnValue = !bannersReturnValueArray?.includes(false);
              });
              return returnValue;
            }
          })
          .filter((i) => !!i.imageSrc) ?? [];
      return vdpBanner;
    },
});

export const showBannerOnVdpAtom = selector({
  key: 'showBannerOnVdp',
  get: ({ get }) => {
    const siteId = get(siteIdAtom).toString();
    const dealerSites = ['38', '372'];
    return dealerSites.includes(siteId);
  },
});
