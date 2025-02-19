export const FormActionMap = {
  LIKE: 'like',
  COMMENT: 'comment',
  COMMENT_LIKE: 'comment-like',
} as const;

export type FormActionMapKey = keyof typeof FormActionMap;
export type FormActionMapValue = (typeof FormActionMap)[FormActionMapKey];

export const FormTypeMap = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  COMPLETE: 'complete',
  UNCOMPLETE: 'uncomplete',
} as const;

export type FormTypeMapKey = keyof typeof FormTypeMap;
export type FormTypeMapValue = (typeof FormTypeMap)[FormTypeMapKey];

export const FormNameMap = {
  COMMENT_ID: 'commentId',
  PICTURE_ID: 'pictureId',
} as const;

export type FormNameMapKey = keyof typeof FormNameMap;
export type FormNameMapValue = (typeof FormNameMap)[FormNameMapKey];
