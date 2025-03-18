export const ActionMap = {
  LIKE: 'like',
  COMMENT_LIKE: 'comment-like',
  COMMENT: 'comment',
  COMMENT_MESSAGE: 'comment-message',
} as const;

export type ActionMapKey = keyof typeof ActionMap;
export type ActionMapValue = (typeof ActionMap)[ActionMapKey];

export const ActionNameMap = {
  USER_ID: 'userId',
  PUBLICATION_ID: 'publicationId',
  PUBLICATION_LIKE_ID: 'publicationLikeId',
  IS_LIKED: 'isLiked',
  COMMENT_LIKE_ID: 'commentLikeId',
  COMMENT_ID: 'commentId',
  COMMENT_MESSAGE: 'commentMessage',
} as const;

export const HASHTAG_REGEX = /#[a-zA-Z|а-яА-Я]+/gi;
