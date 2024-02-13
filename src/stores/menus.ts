import { $inventoryCount } from '@services/search';
import { parseInventoryUrlParams } from '@utils/inventory.util';
import { atom, computed } from 'nanostores';

export const $menus = atom<Record<string, unknown | any>>({});

export const $headerMainNav = computed(
  $menus,
  menus => {
    const mainNav = menus.headerMainNav?.map((menu: any) => {
      const inventory_count =
        menu?.menu_field__gets_inventory_count === 'append'
          ? $inventoryCount(parseInventoryUrlParams(menu?.url ?? '').toString())
          : 0;
      return {
        ...menu,
        inventory_count,
      };
    });
    return mainNav;
  },
);
