import { atom, selector, selectorFamily } from 'recoil-ssr';
import { siteConstants } from '@utils/constant';

export const siteConfigAtom = atom<SiteConfig>({
  key: 'siteConfig',
  default: {} as SiteConfig,
});

export const apiEndpointAtom = selector<string>({
  key: 'apiEndpoint',
  get: ({ get }) => get(siteConfigAtom)?.apiEndpoint ?? '',
});

export const pagesApiEndpointAtom = selector<string>({
  key: 'pagesApiEndpoint',
  get: ({ get }) => get(siteConfigAtom)?.pagesApiEndpoint ?? '',
});

export const retailerIdAtom = selector({
  key: 'retailer-id',
  get: ({ get }) => get(siteConfigAtom)?.oem?.retailerId ?? '',
});

export const formApiEndpointAtom = selector({
  key: 'formApiEndpoint',
  get: ({ get }) => {
    const apiEndpoint = get(apiEndpointAtom);
    if (apiEndpoint) {
      const url = new URL(apiEndpoint);
      url.pathname = '';
      return url.toString();
    }
    return '';
  },
});

export const siteUrlsAtom = selector<string[]>({
  key: 'siteUrls',
  get: ({ get }) => get(siteConfigAtom)?.siteUrls ?? [],
});

export const siteNameAtom = selector<string>({
  key: 'siteName',
  get: ({ get }) => get(siteConfigAtom)?.siteName ?? '',
});

export const siteUniqueIdAtom = selector<string>({
  key: 'siteUniqueId',
  get: ({ get }) => {
    return siteConstants[get(siteConfigAtom)?.siteId ?? ''];
  },
})

export const smartPathDisclaimersAtom = selector({
  key: 'smartPathDisclaimers',
  get: ({ get }) => get(siteConfigAtom)?.smartpathDisclaimers ?? {},
});

export const siteUrlAtom = atom<string>({
  key: 'siteUrl',
  default: '',
});

export const expectedSiteOriginAtom = selector<string>({
  key: 'expectedSiteOrigin',
  get: ({ get }) => get(siteConfigAtom)?.expectedSiteOrigin ?? '',
});

export const siteLanguagesAtom = selector<string[]>({
  key: 'siteLanguages',
  get: ({ get }) => get(siteConfigAtom)?.siteLanguages ?? ['en'],
});

export const searchDomainAtom = selector<string>({
  key: 'searchDomainName',
  get: ({ get }) => {
    let domain = new URL(get(siteConfigAtom)?.expectedSiteOrigin ?? '');
    const siteSlug = get(siteConfigAtom).siteSlug ?? '';
    if (siteSlug === 'hudsonauto') {
      domain = new URL('https://www.hudsonauto.com');
    }
    if (siteSlug === 'jaguardemo') {
      domain = new URL('https://www.foxjaguardemo.com');
    }
    if (siteSlug === 'landroverdemo') {
      domain = new URL('https://www.foxlandroverdemo.com');
    }
    if (siteSlug === 'mercedesbenzdemo') {
      domain = new URL('https://mercedesbenzdemo.foxdealersites.com');
    }
    if (siteSlug === 'vivalacdjr') {
      domain = new URL('https://es.lacdjr.com');
    }
    if (siteSlug === 'westchesterbenz') {
      domain = new URL('https://westchesterbenz.foxdealersites.com');
    }
    if (siteSlug === 'nissandemov3') {
      domain = new URL('https://nissandemov3.foxdealersites.com');
    }
    if (siteSlug === 'mbcincy') {
      domain = new URL('https://mbcincy.foxdealersites.com/');
    }
    if (siteSlug === 'toyotademo3') {
      domain = new URL('https://toyotademo3.foxdealersites.com/');
    }
    if (siteSlug === 'toyotacanadademo') {
      domain = new URL('https://toyotacanadademo.foxdealersites.com/');
    }
    if (siteSlug === 'lexuscanadademo') {
      domain = new URL('https://lexuscanadademo.foxdealersites.com/');
    }
    if (siteSlug === 'vixentoyotademo') {
      domain = new URL('https://vixentoyotademo.foxdealersites.com/');
    }
    if (siteSlug === 'vixenhondademo') {
      domain = new URL('https://vixenhondademo.foxdealersites.com/');
    }
    if (siteSlug === 'johnsoncitytoyota') {
      domain = new URL('https://johnsoncitytoyota.foxdealersites.com/');
    }
    if (siteSlug === 'beamantoyota') {
      domain = new URL('https://beamantoyota.foxdealersites.com/');
    }
    return domain?.host ?? '';
  },
});

export const secondarySortingAtom = selector<string>({
  key: 'secondarySorting',
  get: ({ get }) => {
    const secondarySortingData = get(siteConfigAtom)?.secondarySorting ?? '';
    let secondarySortStr = '';
    if (typeof secondarySortingData === 'object') {
      secondarySortStr =
        Object.values(secondarySortingData || {})
          ?.map((s: any) => (!!s?.target && !!s?.value ? `${s?.target ?? ''}-${s?.value ?? ''}` : ''))
          ?.toString?.() ?? '';
    } else {
      secondarySortStr = '';
    }
    return secondarySortStr;
  },
});

export const defalutOrderingKeyAtom = selector<string>({
  key: 'defalutOrderingKey',
  get: ({ get }) => get(siteConfigAtom)?.defalutOrderingKey ?? '',
});

export const fdiCustomInventoryMetaAtom = selector({
  key: 'fdi-custom-inventory-meta',
  get: ({ get }) => get(siteConfigAtom)?.fdiCustomInventoryMeta ?? '',
});

export const redirect301DataAtom = selector({
  key: '301-redirect-data',
  get: ({ get }) => get(siteConfigAtom)?.options?.siteRedirects ?? {},
});

export const themeAtom = selector<string>({
  key: 'site-theme',
  get: ({ get }) => get(siteConfigAtom)?.theme ?? '',
});
export const getSiteSlugAtom = selector<string>({
  key: 'site-slug',
  get: ({ get }) => get(siteConfigAtom)?.siteSlug ?? '',
});
export const siteIdAtom = selector<string>({
  key: 'site-id',
  get: ({ get }) => get(siteConfigAtom)?.siteId ?? '',
});
export const baseSiteUrlAtom = selector<string>({
  key: 'base-site-url',
  get: ({ get }) => get(siteConfigAtom)?.baseSiteUrl ?? '',
});

export const fallbackInventoryUrlAtom = selector<string>({
  key: 'fallback-inventory-url',
  get: ({ get }) => get(siteConfigAtom)?.options?.fallbackInventoryUrl ?? '',
});

export const fdiCustomInventoryUrlsAtom = selector({
  key: 'fdiCustomInventoryUrls',
  get: ({ get }) => {
    const fdiCustomInventoryUrlsData = get(siteConfigAtom)?.options?.fdiCustomInventoryUrls;
    return eval(fdiCustomInventoryUrlsData ?? '') || '';
  },
});

export const podsApiEndpointAtom = selector<URL | null>({
  key: 'pods-api-endpoint',
  get: ({ get }) => {
    const podSlug = (get(siteConfigAtom)?.podSlug ?? '').trim();
    if (podSlug) {
      const podsHost = process.env.PODS_HOST;
      const podsUrl = `${podSlug}.${podsHost}`;
      return new URL(podsUrl);
    }
    return null;
  },
});

export const instaFeedDetailsAtom = selector({
  key: 'instaFeedDetails',
  get: ({ get }) => {
    const fdiCustomInventoryUrlsData = get(siteConfigAtom)?.options?.instagramSettings;
    return (fdiCustomInventoryUrlsData ?? {}) || {};
  },
});

export const hasSiteAtom = selectorFamily({
  key: 'hasSite',
  get: (siteUniqueIdParam?: string) => ({ get }) =>  {
    const siteUniqueId = get(siteUniqueIdAtom);
    return siteUniqueId === siteUniqueIdParam;
  }
})
