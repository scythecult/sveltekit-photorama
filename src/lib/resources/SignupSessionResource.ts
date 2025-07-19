import {
  LocalStorageKey,
  PHOTORAMA_SIGNUP_LOCAL_STORAGE_KEY_REGEXP,
  SIGNUP_SESSION_STORAGE_KEYS,
} from '$lib/constants/common';
import type { User } from '$lib/types/user';
import { convertToBase64, getObjectURL } from '$lib/utils/common';

export class SignupSessionResource {
  loadEmail() {
    return window.sessionStorage?.getItem(LocalStorageKey.SIGNUP_EMAIL) || '';
  }
  loadFullname() {
    return window.sessionStorage?.getItem(LocalStorageKey.SIGNUP_FULLNAME) || '';
  }
  loadPassword() {
    return window.sessionStorage?.getItem(LocalStorageKey.SIGNUP_PASSWORD) || '';
  }
  loadBirthdate() {
    return window.sessionStorage?.getItem(LocalStorageKey.SIGNUP_BIRTHDATE) || '';
  }
  loadUsername() {
    return window.sessionStorage?.getItem(LocalStorageKey.SIGNUP_USERNAME) || '';
  }

  async loadAvatar(raw?: boolean) {
    const storageValue = window.sessionStorage?.getItem(LocalStorageKey.SIGNUP_AVATAR) || '';

    return raw ? storageValue : storageValue && (await getObjectURL(storageValue));
  }

  saveEmail(email: string) {
    window.sessionStorage.setItem(LocalStorageKey.SIGNUP_EMAIL, email);
  }
  saveFullname(fullname: string) {
    window.sessionStorage.setItem(LocalStorageKey.SIGNUP_FULLNAME, fullname);
  }
  savePassword(password: string) {
    window.sessionStorage.setItem(LocalStorageKey.SIGNUP_PASSWORD, password);
  }
  saveBirthdate(birthdate: string) {
    window.sessionStorage.setItem(LocalStorageKey.SIGNUP_BIRTHDATE, birthdate);
  }
  saveUsername(username: string) {
    window.sessionStorage.setItem(LocalStorageKey.SIGNUP_USERNAME, username);
  }

  async saveAvatar(avatar: File | string) {
    let storageValue;

    if (typeof avatar === 'string') {
      storageValue = avatar;
    } else {
      storageValue = await convertToBase64(avatar);
    }

    window.sessionStorage.setItem(LocalStorageKey.SIGNUP_AVATAR, storageValue);

    return storageValue;
  }

  loadAll() {
    return SIGNUP_SESSION_STORAGE_KEYS.reduce<User>((acc, key) => {
      const fieldName = key.replace(PHOTORAMA_SIGNUP_LOCAL_STORAGE_KEY_REGEXP, '') as keyof User;

      acc[fieldName] = window.sessionStorage.getItem(key) || '';

      return acc;
    }, {} as User);
  }

  clearAll() {
    SIGNUP_SESSION_STORAGE_KEYS.forEach((key) => {
      window.sessionStorage.removeItem(key);
    });
  }
}
