export const ActionMap = {
  LOGIN: 'login',
  LIKE: 'like',
  SIGNUP_EMAIL: 'signup-email',
  COMMENT_LIKE: 'comment-like',
  COMMENT: 'comment',
  COMMENT_MESSAGE: 'comment-message',
  CREATE_NOTE: 'create-note',
} as const;

export type ActionMapKey = keyof typeof ActionMap;
export type ActionMapValue = (typeof ActionMap)[ActionMapKey];

export const ActionNameMap = {
  USERNAME: 'username',
  PASSWORD: 'password',
  EMAIL: 'email',
  USER_ID: 'userId',
  PUBLICATION_ID: 'publicationId',
  IS_LIKED: 'isLiked',
  COMMENT_ID: 'commentId',
  MESSAGE: 'message',
  NOTE_MESSAGE: 'note-message',
} as const;

export const HASHTAG_REGEX = /#[a-zA-Z|а-яА-Я]+/gi;
