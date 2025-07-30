import { atom } from 'recoil';
import React from 'react';

export const currentUserAtom = atom({
  key: 'currentUserAtom',
  default: null,
});

export const isAuthenticatedAtom = atom({
  key: 'isAuthenticatedAtom',
  default: false,
});
export const loadingAtom = atom({
  key: 'loadingAtom',
  default: true,
});
export const errorAtom = atom({
  key: 'errorAtom',
  default: null,
});

export const hasCheckedAuthAtom = atom({
  key: 'hasCheckAuthAtom',
  default: false,
});
