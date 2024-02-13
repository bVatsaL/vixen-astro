import type { Vehicle } from '@typedefs/vehicle';
import { atom } from 'nanostores';

export const $vehicles = atom<Vehicle[]>([]);
