const AppName = {
  DEFAULT: 'DEFAULT',
  ROOT: 'ROOT',
  EXPLORE: 'EXPLORE',
  TOPICS: 'TOPICS',
  INTERATIONS: 'INTERATIONS',
  PUBLICATIONS: 'PUBLICATIONS',
  CREATE: 'CREATE',
  SEND: 'SEND',
  SIGNUP: 'SIGNUP',
  RESET_PASSWORD: 'RESET_PASSWORD',
  UNREGISTRED: 'UNREGISTRED',
  PROFILE: 'PROFILE',
} as const;

export const PHOTORAMA_BASE_URL = 'http://localhost:9666/photorama/api/v1';

export const AppRoute = {
  [AppName.ROOT]: '/',
  [AppName.EXPLORE]: '/explore',
  [AppName.TOPICS]: '/topics',
  [AppName.INTERATIONS]: '/interactions',
  [AppName.PUBLICATIONS]: '/publications',
  [AppName.CREATE]: '/create',
  [AppName.SEND]: '/send',
  [AppName.SIGNUP]: '/signup',
  [AppName.RESET_PASSWORD]: '/reset-password',
  [AppName.UNREGISTRED]: '/unregistred',
  [AppName.PROFILE]: '/profile',
};

export const AUTHED_FORBIDDEN_URLS = [AppRoute.ROOT, AppRoute.SIGNUP];
export const UNAUTHED_FORBIDDEN_URLS = [AppRoute.PUBLICATIONS, AppRoute.CREATE, AppRoute.PROFILE, AppRoute.EXPLORE];

export const AppTitle = {
  [AppName.DEFAULT]: 'Photorama',
  [AppName.SIGNUP]: 'Registration',
  [AppName.EXPLORE]: 'Photorama • Registration',
  [AppName.CREATE]: 'Photorama • Create',
  [AppName.PROFILE]: 'Photorama • Profile',
};
