export const AppLocaleName = {
  RU: 'ru',
  EN: 'en',
};

export const APP_LOCALES = [
  { value: AppLocaleName.RU, text: 'Русский' },
  { value: AppLocaleName.EN, text: 'English' },
];

export const ModalId = {
  SEND: 'send',
  COMMENT: 'comment',
  PROFILE_NAME: 'profile-name',
  NOTE: 'note',
} as const;

export type ModalIdKey = keyof typeof ModalId;
export type ModalIdValue = (typeof ModalId)[ModalIdKey];

export const LocalStorageKey = {
  FLOATING_MODAL_CLOSE_TIME: 'floating-modal-close-time',
  SIGNUP_EMAIL: 'photorama-signup-email',
  SIGNUP_FULLNAME: 'photorama-signup-fullname',
  SIGNUP_PASSWORD: 'photorama-signup-password',
  SIGNUP_BIRTHDATE: 'photorama-signup-birthdate',
  SIGNUP_USERNAME: 'photorama-signup-username',
  SIGNUP_AVATAR: 'photorama-signup-avatar',
} as const;

export const SIGNUP_SESSION_STORAGE_KEYS = [
  LocalStorageKey.SIGNUP_EMAIL,
  LocalStorageKey.SIGNUP_FULLNAME,
  LocalStorageKey.SIGNUP_PASSWORD,
  LocalStorageKey.SIGNUP_BIRTHDATE,
  LocalStorageKey.SIGNUP_USERNAME,
  LocalStorageKey.SIGNUP_AVATAR,
] as const;

export const PHOTORAMA_SIGNUP_LOCAL_STORAGE_KEY_REGEXP = /photorama-signup-/g;

export const PUBLICATIONS_DESCRIPTION_HASHTAG_REGEXP = /#[a-zA-Z|а-яА-Я]+/gi;

export const MAX_PICTURE_SIZE = 1.4 * 1024 * 1024;

export const ImageDimension = {
  min: 100,
  max: 600,
};

export const PICTURE_ALLOWED_FILE_TYPES = ['jpg', 'jpeg', 'png', 'webp'];
