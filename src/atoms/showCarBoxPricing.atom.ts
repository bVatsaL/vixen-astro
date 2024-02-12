import { selector } from 'recoil-ssr';
import { siteUrlAtom, themeAtom } from './site.atom';

export const showCarBoxPricingAtom = selector({
    key: 'showCarBoxPricing',
    get: async ({ get }) => {
        const siteUrl = get(siteUrlAtom);
        const themeName = get(themeAtom)
        const show = ['usedcartheme1'].includes(themeName) || [''].includes(siteUrl)
        return show;
    },
});
