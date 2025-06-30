import { LocalStorageKey, PHOTORAMA_SIGNUP_LOCAL_STORAGE_KEY_REGEXP } from '$lib/constants/common';
import { convertToBase64, getObjectURL } from '$lib/utils/utils';

const signupSessionKeys = [
  LocalStorageKey.SIGNUP_EMAIL,
  LocalStorageKey.SIGNUP_FULLNAME,
  LocalStorageKey.SIGNUP_PASSWORD,
  LocalStorageKey.SIGNUP_BIRTHDATE,
  LocalStorageKey.SIGNUP_USERNAME,
  LocalStorageKey.SIGNUP_AVATAR,
] as const;

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
    return signupSessionKeys.reduce<Record<string, string>>((acc, key) => {
      acc[key.replace(PHOTORAMA_SIGNUP_LOCAL_STORAGE_KEY_REGEXP, '')] = window.sessionStorage.getItem(key) || '';

      return acc;
    }, {});
  }

  clearAll() {
    signupSessionKeys.forEach((key) => {
      window.sessionStorage.removeItem(key);
    });
  }
}
