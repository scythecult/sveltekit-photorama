export const IconName = {
  LIKE: 'like',
  COMMENT: 'comment',
} as const;

export type IconNameKey = keyof typeof IconName;
export type IconNameValue = (typeof IconName)[IconNameKey];

export const IconSize = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  INHERIT: 'inherit',
} as const;

export type IconSizeKey = keyof typeof IconSize;
export type IconSizeValue = (typeof IconSize)[IconSizeKey];
