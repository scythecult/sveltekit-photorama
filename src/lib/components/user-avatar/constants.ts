export const UserAvatarSize = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  XLARGE: 'xlarge',
  INHERIT: 'inherit',
} as const;

export type UserAvatarSizeKey = keyof typeof UserAvatarSize;
export type UserAvatarSizeValue = (typeof UserAvatarSize)[UserAvatarSizeKey];
