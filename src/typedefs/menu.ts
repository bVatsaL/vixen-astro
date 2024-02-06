export type MenuItem = {
  class?: string;
  url?: string;
  label?: string;
  description?: string;
  submenu?: MenuItem[];
  menu_field__dropdown_theme?: string;
  menu_field__add_newVehicle_dropdown?: string;
  image?: {
    url?: string;
  };
  target?: string;
  menu_field__gets_inventory_count?: string,
  inventory_count?: number
};

export type MenuVehicle = {};
