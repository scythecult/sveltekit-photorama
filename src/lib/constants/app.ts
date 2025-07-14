// TODO Check for names usage
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
  LOGIN: 'LOGIN',
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
  EMAIL: 'EMAIL',
  PHONE: 'PHONE',
  USERNAME: 'USERNAME',
  PASSWORD: 'PASSWORD',
  BIRTHDATE: 'BIRTHDATE',
  FULLNAME: 'FULLNAME',
  PICTURE: 'PICTURE',
  AVATAR: 'AVATAR',
  CONFIRM: 'CONFIRM',
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
  [AppName.LOGIN]: '/login',
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
  [AppName.EMAIL]: '/email',
  [AppName.PHONE]: '/phone',
  [AppName.USERNAME]: '/username',
  [AppName.FULLNAME]: '/fullname',
  [AppName.PASSWORD]: '/password',
  [AppName.BIRTHDATE]: '/birthdate',
  [AppName.PICTURE]: '/picture',
  [AppName.AVATAR]: '/avatar',
  [AppName.CONFIRM]: '/confirm',
};

export const AUTHED_FORBIDDEN_URLS = [AppRoute.ROOT, AppRoute.SIGNUP, AppRoute.LOGIN];
export const UNAUTHED_FORBIDDEN_URLS = [AppRoute.PUBLICATIONS, AppRoute.CREATE, AppRoute.PROFILE, AppRoute.EXPLORE];

export const AppPath = {
  COMMENT_MESSAGE: '/publications/comments',
  LIKE: '/publications/likes',
  SIGNUP: '/accounts/signup',
  SIGNUP_EMAIL: '/accounts/signup/email',
  SIGNUP_SUGGESTED_USERNAME: '/accounts/signup/suggested-username',
  SIGNUP_CONFIRM: '/accounts/signup/confirm',
  USER: '/user',
  EMAIL: '/email',
  PUBLICATIONS: '/publications',
  IMAGES: '/images/signup',
} as const;

// TODO Change to kebab-case
export const AppSearchParam = {
  SUGGESTED_USERNAME: 'suggestedUserName',
  USERNAME: 'userName',
} as const;

export const AppTitle = {
  [AppName.DEFAULT]: 'Photorama',
  [AppName.SIGNUP]: 'Registration • Photorama',
  [AppName.LOGIN]: 'Login • Photorama',
  [AppName.EXPLORE]: 'Registration • Photorama',
  [AppName.CREATE]: 'Create • Photorama',
  [AppName.PROFILE]: 'Profile • Photorama',
};
