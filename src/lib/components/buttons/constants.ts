export const LikeTypeMap = {
  ACTIONS: 'actions',
  COMMENT: 'comment',
  PICTURE: 'picture',
} as const;

export type LikeTypeMapKey = keyof typeof LikeTypeMap;
export type LikeTypeMapValue = (typeof LikeTypeMap)[LikeTypeMapKey];
