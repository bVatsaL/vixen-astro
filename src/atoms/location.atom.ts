import { selector, selectorFamily } from 'recoil-ssr';
import { cachedFetch } from './cache.atom';
import { siteConfigAtom, siteNameAtom } from './site.atom';

const getCorrectSiteName = (siteName: string) => {
  if (siteName === 'Jaguar Fairfield Certified Pre-Owned &amp; Service') {
    return 'JAGUAR FAIRFIELD';
  } else if (siteName === 'M&#039;Lady Nissan') {
    return "M'lady Nissan";
  } else {
    return siteName;
  }
};

export const locationAtom = selector({
  key: 'location',
  get: async ({ get }) =>
    cachedFetch(
      {
        id: 'locations',
        path: 'locations',
        rootContext: 'locations.locations',
        filterDataPaths: [
          'location__street_number',
          'location__street_name',
          'location__city',
          'location__state',
          'location__zip',
          'location__country',
          'location__phone_primary',
          'location__phone_secondary',
          'location__phone_tertiary',
          'location__phone_fourth',
          'location__name',
          'location__feed_id',
          'location__home_url',
          'location__logo',
          'location__phone_primary_title',
          'location__phone_secondary_title',
          'location__phone_tertiary_title',
          'location__email_primary',
          'location__email_secondary',
          'location__email_tertiary',
          'location__service_url',
          'location__new_url',
          'location__region',
          'location__phone_fourth_title',
        ],
      },
      get,
    ),
});

export const currentLocationFeedIdAtom = selector<string>({
  key: 'currentLocationFeedId',
  get: ({ get }) => {
    const location = get(locationAtom);
    return location?.[0]?.location__feed_id ?? '';
  },
});

export const addressAtom = selector<string>({
  key: 'address',
  get: ({ get }) => {
    const location = get(locationAtom);
    const locationParts = [
      `${location?.[0]?.location__street_number} ${location?.[0]?.location__street_name}`,
      location?.[0]?.location__city,
      `${location?.[0]?.location__state} ${location?.[0]?.location__zip}`,
    ]
      .map((s) => s?.trim?.())
      .filter(Boolean);
    return locationParts.join(', ');
  },
});

export const secodaryAddressAtom = selector<string>({
  key: 'secondaryaddress',
  get: ({ get }) => {
    const location = get(locationAtom);
    const locationParts = [
      `${location?.[1]?.location__street_number} ${location?.[1]?.location__street_name}`,
      location?.[1]?.location__city,
      `${location?.[1]?.location__state} ${location?.[1]?.location__zip}`,
    ]
      .map((s) => s?.trim?.())
      .filter(Boolean);
    return locationParts.join(', ');
  },
});

export const address2Atom = selector<string>({
  key: 'address2',
  get: ({ get }) => {
    const location = get(locationAtom);
    const locationParts = [
      `${location?.[0]?.location__street_number} ${location?.[0]?.location__street_name}
      ${location?.[0]?.location__city}`,
      `${location?.[0]?.location__state} ${location?.[0]?.location__zip}`,
    ]
      .map((s) => s?.trim?.())
      .filter(Boolean);
    return locationParts.join(', ');
  },
});

export const primaryPhoneAtom = selector<string>({
  key: 'primaryPhone',
  get: ({ get }) => {
    const location = get(locationAtom);
    return location?.[0]?.location__phone_primary ?? '';
  },
});

export const secondaryPhoneAtom = selector<string>({
  key: 'secondaryPhone',
  get: ({ get }) => {
    const location = get(locationAtom);
    return location?.[0]?.location__phone_secondary ?? '';
  },
});

export const tertiaryPhoneAtom = selector<string>({
  key: 'tertiaryPhone',
  get: ({ get }) => {
    const location = get(locationAtom);
    return location?.[0]?.location__phone_tertiary ?? '';
  },
});

export const collisionPhoneAtom = selector<string>({
  key: 'collisionPhone',
  get: ({ get }) => {
    const location = get(locationAtom);
    return location?.[0]?.location__phone_fourth ?? '';
  },
});

export const googleAddressUrlAtom = selector<string>({
  key: 'googleAddressUrl',
  get: ({ get }) => {
    const address = get(addressAtom);
    return `https://maps.google.com/?q=${encodeURIComponent(address)}`;
  },
});

export const googleMapIframeAddressAtom = selector<string>({
  key: 'googleMapIframeAddress',
  get: ({ get }) => {
    const address = get(addressAtom);
    const siteName = get(siteNameAtom);
    return `https:///www.google.com/maps/embed/v1/place?q=${getCorrectSiteName(
      siteName,
    )},${address}&key=AIzaSyBBBAU5mKTu8I0KJcKl8foyI1oT7S9DSfY`;
  },
});

export const locationNameAtom = selector<string>({
  key: 'locationName',
  get: ({ get }) => {
    const location = get(locationAtom);
    return location?.[0]?.location__name ?? '';
  },
});

export const countryNameAtom = selector<string>({
  key: 'countryName',
  get: ({ get }) => {
    const location = get(locationAtom);
    return location?.[0]?.location__country ?? '';
  },
});

export const vdpDomainByFeedIdAtom = selectorFamily({
  key: 'VdpDomainName',
  get: (feedId: string) => ({ get }) => {
    const searchDomain = new URL(get(siteConfigAtom)?.expectedSiteOrigin ?? '');
    const result = (get(locationAtom) || []).find((l: any) => l.location__feed_id === feedId);
    let vdpDomainUrl;
    if (result) {
      vdpDomainUrl = new URL(result?.location__home_url ?? '') ?? '';
      vdpDomainUrl.host = vdpDomainUrl.host.indexOf('www') === -1 ? `www.${vdpDomainUrl.host}` : vdpDomainUrl.host;
    } else {
      vdpDomainUrl = searchDomain;
    }
    return vdpDomainUrl?.host;
  },
});

export const locationByFeedIdAtom = selectorFamily({
  key: 'locationByFeedId',
  get: (feedId: string) => ({ get }) => {
    const location = get(locationAtom);
    const result = (location || []).find((l: any) => l.location__feed_id === feedId);
    return result ?? location?.[0];
  },
});

export const locationPhoneTitleAtom = selector<Record<string, string>>({
  key: 'locationPhoneTitles',
  get: ({ get }) => {
    const location = get(locationAtom)?.[0] ?? [];
    return {
      primaryPhoneTitle: location?.location__phone_primary_title ?? '',
      secondaryPhoneTitle: location?.location__phone_secondary_title ?? '',
      tertiaryPhoneTitle: location?.location__phone_tertiary_title ?? '',
      primaryEmail: location?.location__email_primary ?? '',
      secondaryEmail: location?.location__email_secondary ?? '',
      tertiaryEmail: location?.location__email_tertiary ?? '',
    };
  },
});

export const primaryPhoneTitleAtom = selector({
  key: 'primaryPhoneTitle',
  get: ({ get }) => get(locationAtom)?.[0]?.location__phone_primary_title ?? 'Sales',
});
export const secondaryPhoneTitle = selector({
  key: 'secondaryPhoneTitle',
  get: ({ get }) => get(locationAtom)?.[0]?.location__phone_secondary_title ?? 'Service',
});
export const tertiaryPhoneTitle = selector({
  key: 'tertiaryPhoneTitle',
  get: ({ get }) => get(locationAtom)?.[0]?.location__phone_tertiary_title ?? 'Parts',
});

export const forthPhoneTitleAtom = selector<string>({
  key: 'forthPhoneTitle',
  get: ({ get }) => get(locationAtom)?.[0]?.location__phone_fourth_title ?? 'Rental',
});
