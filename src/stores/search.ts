import { atom } from 'nanostores';

export const $defaultCarModels = atom<{ display_name: string; item: string }[]>([]);

export const $preOwnedTotal = atom<string>('');
