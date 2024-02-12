import type { ReactElement } from 'react';
import { atom } from 'recoil-ssr';

type ModalState = { state: 'open' | 'close'; props: Record<string, any> };

export const activeModalsAtom = atom<Map<string, ModalState>>({
  key: 'activeModals',
  default: new Map(),
});

export const registeredModalsAtom = atom<Map<string, { children: ReactElement; count: number }>>({
  key: 'registeredModals',
  default: new Map(),
});
