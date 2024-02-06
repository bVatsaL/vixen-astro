import { selector } from 'recoil-ssr';
import { pick } from 'lodash';
import { MenuItem } from '@typedefs/menu';
import { cachedFetch } from './cache.atom';
import { siteIdAtom, siteUniqueIdAtom } from './site.atom';
import { inventoryCountAtom } from './search.atom';
import { parseInventoryUrlParams } from '@utils/inventory.util';
import { uniqueId } from '@utils/constant';

const navFields = [
  'class',
  'label',
  'menu_field__dropdown_theme',
  'menu_field__add_newVehicle_dropdown',
  'menu_field__submenu__popout',
  'url',
  'target',
  'submenu',
  'description',
  'menu_field__gets_inventory_count',
  'inventory_count',
];

const pickFields = (navItems: MenuItem[], fields: string[] = navFields) =>
  navItems
    .map((i: any) => pick(i, fields))
    .map((i: MenuItem) => {
      if (i.submenu) {
        return {
          ...i,
          submenu: i.submenu.map((s) => pick(s, fields)),
        };
      }
      return i;
    });

const getNavUrlByLabel = (navItems: MenuItem[], label: string) => {
  let navUrl = '';
  const lowerCaseLabel = label.toLowerCase();
  navItems.forEach((i) => {
    if (navUrl) return;
    if (i.label?.toLowerCase?.() === lowerCaseLabel) {
      navUrl = i?.url ?? '';
      return;
    }
    if (i.submenu) {
      i.submenu.forEach((item) => {
        if (navUrl) return;
        if (item.label?.toLowerCase?.() === lowerCaseLabel) {
          navUrl = item?.url ?? '';
        }
      });
    }
  });
  return navUrl;
};

export const menusAtom = selector({
  key: 'menus',
  get: async ({ get }) => {
    const menus = await cachedFetch(
      {
        id: 'menus',
        path: 'menus',
        rootContext: 'menus',
        filterDataPaths: [
          'MainNav',
          'footerNav-center',
          'footerNav-left',
          'footerNav-right',
          'subhero',
          'subherobanner_01',
          'fronthero',
          'quick-choose',
          'vixen_sub-hero',
        ],
        filterFields: {
          MainNav: navFields,
          'footerNav-center': navFields,
          'footerNav-left': navFields,
          'footerNav-right': navFields,
          subhero: [...navFields, 'image.url'],
          subherobanner_01: [...navFields, 'image.url'],
          fronthero: ['image.url'],
          'quick-choose': navFields,
          'vixen_sub-hero': [...navFields, 'image.url'],
        },
      },
      get,
    );
    return {
      headerMainNav: pickFields(menus.MainNav || []),
      footerCenterNav: pickFields(menus?.['footerNav-center'] || []),
      footerLeftNav: pickFields(menus?.['footerNav-left'] || []),
      footerRightNav: pickFields(menus?.['footerNav-right'] || []),
      subHeroNav: pickFields(menus?.subhero || [], [...navFields, 'image.url']),
      bannersBelowSubhero: pickFields(menus?.subherobanner_01 || [], [...navFields, 'image.url']),
      frontHero: pickFields(menus?.fronthero || [], ['image.url']),
      quickChoose: pickFields(menus?.['quick-choose'] || []),
      vixensubhero: pickFields(menus?.['vixen_sub-hero'] || [], [...navFields, 'image.url']),
    };
  },
});

export const headerMainNavAtom = selector({
  key: 'headerMainNav',
  get: ({ get }) => {
    const mainNav = get(menusAtom).headerMainNav?.map((menu) => {
      const inventory_count =
        menu?.menu_field__gets_inventory_count === 'append'
          ? get(inventoryCountAtom(parseInventoryUrlParams(menu?.url ?? '').toString()))
          : 0;
      return {
        ...menu,
        inventory_count,
      };
    });
    return mainNav;
  },
});

export const footerCenterNavAtom = selector({
  key: 'footerCenterNav',
  get: ({ get }) => get(menusAtom).footerCenterNav,
});

export const footerLeftNavAtom = selector({
  key: 'footerLeftNav',
  get: ({ get }) => get(menusAtom).footerLeftNav,
});

export const footerRightNavAtom = selector({
  key: 'footerRightNav',
  get: ({ get }) => get(menusAtom).footerRightNav,
});

export const subHeroNavAtom = selector({
  key: 'subhero',
  get: ({ get }) => get(menusAtom).subHeroNav,
});
export const subHeroBannersAtom = selector({
  key: 'subherobanners_01',
  get: ({ get }) => get(menusAtom).bannersBelowSubhero,
});
export const vixenSubHeroNavAtom = selector({
  key: 'vixen-subhero',
  get: ({ get }) => get(menusAtom).vixensubhero,
});

export const scheduleServiceUrlAtom = selector({
  key: 'scheduleServiceUrl',
  get: ({ get }) => getNavUrlByLabel(get(menusAtom).headerMainNav, 'schedule service'),
});

export const financingUrlAtom = selector({
  key: 'financingUrl',
  get: ({ get }) => getNavUrlByLabel(get(menusAtom).headerMainNav, 'financing'),
});

export const newSepecialsUrlAtom = selector({
  key: 'newSepecialsUrl',
  get: ({ get }) => getNavUrlByLabel(get(menusAtom).footerCenterNav, 'New Car Specials'),
});

export const frontHeroImagesAtom = selector<string[]>({
  key: 'frontHeroImages',
  get: ({ get }) =>
    get(menusAtom)
      .frontHero.map((i) => i?.image?.url ?? '')
      .filter(Boolean),
});
export const quickChooseAtom = selector({
  key: 'quick-choose',
  get: ({ get }) => get(menusAtom)?.quickChoose ?? [],
});

export const specialStockLabelAtom = selector<string>({
  key: 'specialStockLabelText',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const specialStockLabelText = [uniqueId.ROCKHILLNISSAN];
    const defaultLabel = 'Contact Us!';
    return specialStockLabelText.includes(siteUniqueId) ? 'Order Now!' : defaultLabel;
  },
});

export const showSearchInputAtom = selector<boolean>({
  key: 'showSearchInput',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showSearchInputSites = [uniqueId.MLADYNISSAN];
    return showSearchInputSites.includes(siteUniqueId);
  },
});

export const showLanguageTranslatorOnActionBarAtom = selector<boolean>({
  key: 'showLanguageTranslatorOnActionBar',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showLanguageTranslatorOnActionBarList = [uniqueId.MLADYNISSAN];
    return showLanguageTranslatorOnActionBarList.includes(siteUniqueId);
  },
});

export const hideLanguageTranslatorOnHeaderMenuAtom = selector<boolean>({
  key: 'hideLanguageTranslatorOnHeaderMenu',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const hideLanguageTranslatorOnHeaderMenu = [uniqueId.HILLTOPNISSAN];
    return hideLanguageTranslatorOnHeaderMenu.includes(siteUniqueId);
  },
});

export const showTranslateBtnOnActionBarAtom = selector<boolean>({
  key: 'showTranslateBtnOnActionBar',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const showTranslateBtnOnActionBar = [uniqueId.HILLTOPNISSAN, uniqueId.MBWESTCOVINA];
    return showTranslateBtnOnActionBar.includes(siteUniqueId);
  },
});

export const customSpanishLabelAtom = selector<string>({
  key: 'customSpanishLabelText',
  get: async ({ get }) => {
    const siteId = get(siteIdAtom).toString();
    const customSpanishLabelText = ['546'];
    const defaultLabel = 'Español';
    return customSpanishLabelText.includes(siteId) ? 'Se Habla Español' : defaultLabel;
  },
});

export const showMyGastoniaNissanLanguageTranslatorAtom = selector<boolean>({
  key: 'showMyGastoniaNissanLanguageTranslator',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const myGastoniaNissanLanguageTranslator = [uniqueId.MYGASTONIANISSAN];
    return myGastoniaNissanLanguageTranslator.includes(siteUniqueId);
  },
});

export const hasStreachSearchOnlyAtom = selector<boolean>({
  key: 'hasStreachSearchOnly',
  get: async ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const hasStreachSearchSites = [uniqueId.RIGHTTOYOTA];
    return hasStreachSearchSites.includes(siteUniqueId);
  },
});
