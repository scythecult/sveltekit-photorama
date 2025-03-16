import type { Publication } from './publication';

export type UserInfo = {
  name: string;
  email: string;
  password: string;
  avatar: string;
  publications?: Publication[];
  subscribedUsers?: string[];
};
