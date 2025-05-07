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
