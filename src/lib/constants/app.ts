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
  SETTINGS: 'SETTINGS',
  ACCOUNTS: 'ACCOUNTS',
  EDIT: 'EDIT',
  FOLLOWERS: 'FOLLOWERS',
  FOLLOWING: 'FOLLOWING',
  FEED: 'FEED',
  SAVED: 'SAVED',
  TAGGED: 'TAGGED',
  ARCHIVE: 'ARCHIVE',
  COMMENTS: 'COMMENTS',
  LIKES: 'LIKES',
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
  [AppName.ACCOUNTS]: '/accounts',
  [AppName.SETTINGS]: '/settings',
  [AppName.EDIT]: '/edit',
  [AppName.FOLLOWERS]: '/followers',
  [AppName.FOLLOWING]: '/following',
  [AppName.FEED]: '/feed',
  [AppName.SAVED]: '/saved',
  [AppName.TAGGED]: '/tagged',
  [AppName.ARCHIVE]: '/archive',
  [AppName.COMMENTS]: '/comments',
  [AppName.LIKES]: '/likes',
};

export const AUTHED_FORBIDDEN_URLS = [AppRoute.ROOT, AppRoute.SIGNUP];
export const UNAUTHED_FORBIDDEN_URLS = [AppRoute.PUBLICATIONS, AppRoute.CREATE, AppRoute.PROFILE, AppRoute.EXPLORE];

export const AppPath = {
  COMMENT_MESSAGE: '/publications/comments',
  LIKE: '/publications/likes',
  SIGNUP: '/accounts/signup',
  USER: '/user',
  PUBLICATIONS: '/publications',
} as const;

export const AppTitle = {
  [AppName.DEFAULT]: 'Photorama',
  [AppName.SIGNUP]: 'Registration',
  [AppName.EXPLORE]: 'Photorama • Registration',
  [AppName.CREATE]: 'Photorama • Create',
  [AppName.PROFILE]: 'Photorama • Profile',
};
