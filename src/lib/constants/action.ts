export const FormActionName = {
  LOGIN: 'login',
  LIKE: 'like',
  SIGNUP_EMAIL: 'signup-email',
  SIGNUP_FULLNAME: 'signup-fullname',
  SIGNUP_PASSWORD: 'signup-password',
  SIGNUP_BIRTHDATE: 'signup-birthdate',
  SIGNUP_USERNAME: 'signup-username',
  SIGNUP_DEFAULT_AVATAR: 'signup-default-avatar',
  SIGNUP_AVATAR: 'signup-avatar',
  SIGNUP_AVATAR_DEFAULT: 'signup-avatar-default',
  SIGNUP_CONFIRM: 'signup-confirm',
  COMMENT_LIKE: 'comment-like',
  COMMENT: 'comment',
  COMMENT_MESSAGE: 'comment-message',
  CREATE_NOTE: 'create-note',
} as const;

export type ActionMapKey = keyof typeof FormActionName;
export type ActionMapValue = (typeof FormActionName)[ActionMapKey];

export const InputName = {
  USERNAME: 'username',
  PASSWORD: 'password',
  EMAIL: 'email',
  USER_ID: 'user-id',
  PUBLICATION_ID: 'publication-id',
  IS_LIKED: 'is-liked',
  COMMENT_ID: 'comment-id',
  COMMENT_MESSAGE: 'comment-message',
  NOTE_MESSAGE: 'note-message',
  FULLNAME: 'fullname',
  BIRTHDATE: 'birthdate',
  PICTURE: 'picture',
  AVATAR: 'avatar',
  AVATAR_URL: 'avatar-url',
  BUBBLE: 'bubble',
  AUDITORY: 'auditory',
} as const;
