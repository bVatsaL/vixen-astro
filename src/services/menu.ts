import type { MenuItem } from '@typedefs/menu';
import { apiFetch } from './api-fetch';
import lodashPick from 'lodash/pick';
import { $menus } from '@atoms/menus';

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

const filterDataPaths = [
  'MainNav',
  'footerNav-center',
  'footerNav-left',
  'footerNav-right',
  'subhero',
  'subherobanner_01',
  'fronthero',
  'quick-choose',
  'vixen_sub-hero',
];

const filterFields = {
  MainNav: navFields,
  'footerNav-center': navFields,
  'footerNav-left': navFields,
  'footerNav-right': navFields,
  subhero: [...navFields, 'image.url'],
  subherobanner_01: [...navFields, 'image.url'],
  fronthero: ['image.url'],
  'quick-choose': navFields,
  'vixen_sub-hero': [...navFields, 'image.url'],
};

const pickFields = (navItems: MenuItem[], fields: string[] = navFields) =>
  navItems
    .map((i: any) => lodashPick(i, fields))
    .map((i: MenuItem) => {
      if (i.submenu) {
        return {
          ...i,
          submenu: i.submenu.map((s) => lodashPick(s, fields)),
        };
      }
      return i;
    });

export const fetchMenus = async () => {
  const menus = await apiFetch(
    {
      path: 'menus',
      rootContext: 'menus',
      filterDataPaths,
      filterFields,
    },
  );
  $menus.set({
    headerMainNav: pickFields(menus.MainNav || []),
    footerCenterNav: pickFields(menus?.['footerNav-center'] || []),
    footerLeftNav: pickFields(menus?.['footerNav-left'] || []),
    footerRightNav: pickFields(menus?.['footerNav-right'] || []),
    subHeroNav: pickFields(menus?.subhero || [], [...navFields, 'image.url']),
    bannersBelowSubhero: pickFields(menus?.subherobanner_01 || [], [...navFields, 'image.url']),
    frontHero: pickFields(menus?.fronthero || [], ['image.url']),
    quickChoose: pickFields(menus?.['quick-choose'] || []),
    vixensubhero: pickFields(menus?.['vixen_sub-hero'] || [], [...navFields, 'image.url']),
  });
};
