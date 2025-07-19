import type { Publication } from './publication';
import type { Auditory, UserInfo } from './user';

export type ResponsePayload<Payload> = {
  data: Payload;
  isLoading?: boolean;
  message?: string;
};

export type EmailPayload = {
  isAvailable: boolean;
};

export type UsernamePayload = {
  isAvailable: boolean;
  username: string;
};

export type UserPayload = {
  user: UserInfo;
};

export type PublicationsPayload = {
  publications: Publication[];
};

export type AvatarPayload = {
  avatarUrl: string;
};

export type PublicationsLikePayload = {
  publications: Publication[];
};

export type PublicationsCommentPayload = {
  userId: string;
  message: string;
};

export type ConfirmPayload = {
  jwtToken: string;
  user: UserInfo;
};

export type UserNotePayload = {
  note: {
    message: string;
    auditory: Auditory;
  };
};
