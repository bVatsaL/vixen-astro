import { atom, computed } from 'nanostores';

export const $global = atom<Record<string, unknown | any>>({});

export const $showCompareandFav = computed($global, (global) => global?.settings?.site__show_favorites || '');
