import type { Publication } from './publication';

export type User = {
  email: string;
  password: string;
  birthdate: string;
  fullname: string;
  username: string;
};

export type Auditory = 'subscribed' | 'friends';

export type Note = {
  message: string;
  auditory: Auditory;
};

export type UserInfo = User & {
  id: string;
  avatarUrl: string;
  note: Note;
  publications?: Publication[];
  subscribedUsers?: string[];
};
