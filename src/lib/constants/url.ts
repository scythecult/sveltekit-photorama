export const PHOTORAMA_BASE_URL = 'http://localhost:9666/photorama/api/v1';

export const AppRoute = {
  ROOT: '/',
  EXPLORE: '/explore',
  INTERATIONS: '/interactions',
  PUBLICATIONS: '/publications',
  ADD: '/add',
  SEND: '/send',
  SIGNUP: '/signup',
  RESET_PASSWORD: '/reset-password',
  UNREGISTRED: '/unregistred',
  PROFILE: '/profile',
};

export const AUTHED_FORBIDDEN_URLS = [AppRoute.ROOT, AppRoute.SIGNUP];
export const UNAUTHED_FORBIDDEN_URLS = [AppRoute.PUBLICATIONS, AppRoute.ADD, AppRoute.PROFILE, AppRoute.EXPLORE];
