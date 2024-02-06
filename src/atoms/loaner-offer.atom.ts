import { selector } from "recoil-ssr";
import { cachedFetch } from "./cache.atom";

export const loanerOffersAtom= selector({
    key: 'loanerOffers',
    get: async ({ get }) => {
      const offers = await cachedFetch(
        {
          id: 'loanerOffers',
          path: 'loaner_offers',
        },
        get,
      );
      return offers?.loaner_offers?.[0] ?? [];
    },
  });
  