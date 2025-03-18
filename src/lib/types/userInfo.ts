import type { Publication } from './publication';

export type UserInfo = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  publications?: Publication[];
  subscribedUsers?: string[];
};
