export const ActionMap = {
  LIKE: 'like',
  COMMENT_LIKE: 'comment-like',
  COMMENT: 'comment',
} as const;

export type ActionMapKey = keyof typeof ActionMap;
export type ActionMapValue = (typeof ActionMap)[ActionMapKey];

export const ActionNameMap = {
  PICTURE_LIKE_ID: 'pictureLikeId',
  IS_LIKED: 'isLiked',
  COMMENT_LIKE_ID: 'commentLikeId',
  COMMENT_ID: 'commentId',
} as const;

export const HASHTAG_REGEX = /#[a-zA-Z|а-яА-Я]+/gi;
