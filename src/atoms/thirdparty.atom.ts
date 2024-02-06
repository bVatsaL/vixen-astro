import { selector } from 'recoil-ssr';
import { cachedFetch } from './cache.atom';
import { siteUniqueIdAtom } from './site.atom';
import { uniqueId } from '@utils/constant';

export const ThirdPartyScriptsAtom = selector<any>({
  key: 'third-party',
  get: async ({ get }) => {
    const data = await cachedFetch(
      {
        id: 'third-party',
        path: 'third_party_scripts',
      },
      get,
    );
    return data;
  },
});

export const showActiveScriptAtom = selector({
  key: 'active-script',
  get: ({ get }) => get(ThirdPartyScriptsAtom)?.scripts?.[0]?.data?.[0]?.third_party_script__is_active ?? '',
});
export const getThirdPartyScriptAtom = selector({
  key: 'third-party-script',
  get: ({ get }) => get(ThirdPartyScriptsAtom)?.scripts?.[0]?.data?.[0]?.third_party_script__code ?? '',
});

export const showActiveEuifaxScriptAtom = selector({
  key: 'equifax-active-script',
  get: ({ get }) => get(ThirdPartyScriptsAtom)?.scripts?.[0]?.data?.[16]?.third_party_script__is_active ?? '',
});
export const getThirdPartyEquifaxScriptAtom = selector({
  key: 'equifax-script',
  get: ({ get }) => get(ThirdPartyScriptsAtom)?.scripts?.[0]?.data?.[16]?.third_party_script__code ?? '',
});

export const getCapitalOneToken = selector({
  key: 'cap-one-token',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);

    switch (siteUniqueId) {
      case uniqueId.CLAREMONTTOYOTA:
        return '3ba1a1aa-7b04-4a9c-8def-9b963b9cacd1';
      case uniqueId.MLADYNISSAN:
        return 'bc6fc8f4-82ba-4f0e-a94f-ef95a6613806';
      case uniqueId.HILLTOPNISSAN:
        return '20ad00dd-c1f7-4b49-9d87-761102322e4f';
      case uniqueId.TOYOTAHUNTINGTONBEACH:
        return '11c0ed6c-0c6a-4a35-aafb-fff9a6e6b2e3';
      default:
        break;
    }
    if (siteUniqueId === uniqueId.TOYOTAWESTCOVINA) {
      return '4ddfb443-c9d5-4adb-a038-3dc554db66f9';
    }
    if (siteUniqueId === uniqueId.NORWALKTOYOTA) {
      return '334ed36e-6945-45e1-82a4-31e02a9b29b5';
    }
  },
});
export const getCarsaverLocationAtom = selector({
  key: 'cs-buy-widget-location',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    if (siteUniqueId === uniqueId.MLADYNISSAN) {
      return 'below_price_stack';
    } else {
      return 'below_vehicle_img';
    }
  },
});
export const showEdmundsTools = selector({
  key: 'edmunds-tools',
  get: ({ get }) => {
    const siteId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.RIGHTTOYOTA, uniqueId.HILLTOPNISSAN, uniqueId.CDJRWESTCOVINA];
    return dealerSites.includes(siteId);
  },
});
export const useEdmundsToolsUrl = selector({
  key: 'edmunds-tools-url',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.CDJRWESTCOVINA, uniqueId.NORWALKTOYOTA];
    return dealerSites.includes(siteUniqueId);
  },
});

export const showTradepending = selector({
  key: 'tradepending',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [
      uniqueId.MURRAYCADILLACMOOSEJAW,
      uniqueId.MURRAYMEDICINEHATCADILLAC,
      uniqueId.MURRAYCADILLACABBOTSFORD,
      uniqueId.MURRAYCADILLAC,
      uniqueId.MURRAYCADILLACBRANDON,
    ];
    return dealerSites.includes(siteUniqueId);
  },
});
export const FixedOpsScript = selector<boolean>({
  key: 'fixedopsscript',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const fireFixedOpsAtom = [uniqueId.MYGASTONIANISSAN];
    return fireFixedOpsAtom.includes(siteUniqueId);
  },
});

export const CarFaxTradeScript = selector<boolean>({
  key: 'carfaxtradeinscript',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const fireCarFaxWidgetAtom = [uniqueId.SOUTHFORTCHEV];
    return fireCarFaxWidgetAtom.includes(siteUniqueId);
  },
});
export const showCapitalOneCalculatorAtom = selector<boolean>({
  key: 'showCapitalOneCalculatorAtom',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const siteIDs = [uniqueId.NORWALKTOYOTA, uniqueId.TOYOTAWESTCOVINA];
    return siteIDs.includes(siteUniqueId);
  },
});
