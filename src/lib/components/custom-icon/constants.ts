export const IconName = {
  LIKE: 'like',
  COMMENT: 'comment',
  HOME: 'home',
  SEACH: 'search',
  ADD: 'add',
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

export type IconProps = {
  fill?: string;
  stroke?: string;
};
