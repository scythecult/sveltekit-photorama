import type { Publication } from './publication';

export type UserInfo = {
  id: string;
  username: string;
  fullname: string;
  birthdate: string;
  email: string;
  password: string;
  avatarUrl: string;
  noteMessage?: string;
  publications?: Publication[];
  subscribedUsers?: string[];
};

export type SignupUserInfo = Pick<UserInfo, 'email' | 'password'> & {
  birthdate: string;
  fullname: string;
  username: string;
};
