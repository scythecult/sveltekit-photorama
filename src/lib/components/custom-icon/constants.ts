export const IconName = {
  LIKE: 'like',
  PICTURE_LIKE: 'picture-like',
  DISLIKE: 'dislike',
  COMMENT: 'comment',
  HOME: 'home',
  SEACH: 'search',
  ADD: 'add',
  SHARE: 'share',
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

export type IconProps = { className?: string | string[] };
