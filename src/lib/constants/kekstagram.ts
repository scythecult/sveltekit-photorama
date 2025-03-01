export const KEKSTAGRAM_BASE_URL = 'http://localhost:9666/api/v1/kekstagram';

export const AppRoute = {
  USER: '/user',
  INTERATIONS: '/interactions',
};

// TODO remove nahuy
export const CustomComponentType = {
  USER_ACTION: 'user-action',
  USER_NAME: 'user-name',
  HASHTAG: 'hashtag',
};

export type CustomComponentTypeKey = keyof typeof CustomComponentType;
export type CustomComponentTypeValue = (typeof CustomComponentType)[CustomComponentTypeKey];
