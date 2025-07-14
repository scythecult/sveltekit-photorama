export const UserAvatarSize = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  XLARGE: 'xlarge',
  INHERIT: 'inherit',
} as const;

export type UserAvatarSizeKey = keyof typeof UserAvatarSize;
export type UserAvatarSizeValue = (typeof UserAvatarSize)[UserAvatarSizeKey];

export const UserAvatarMode = {
  IMAGE: 'image',
  CAPTION: 'caption',
  FULL: 'full',
} as const;

export type UserAvatarModeKey = keyof typeof UserAvatarMode;
export type UserAvatarModeValue = (typeof UserAvatarMode)[UserAvatarModeKey];
