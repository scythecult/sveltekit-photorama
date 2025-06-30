import { LocalStorageKey } from '$lib/constants/common';

export class FloatingModalLsResource {
  load() {
    return window.localStorage.getItem(LocalStorageKey.FLOATING_MODAL_CLOSE_TIME) || '';
  }
  save(closeTime: string) {
    window.localStorage.setItem(LocalStorageKey.FLOATING_MODAL_CLOSE_TIME, closeTime);
  }
}
