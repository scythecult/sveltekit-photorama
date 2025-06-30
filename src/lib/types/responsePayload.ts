import type { UserInfo } from './userInfo';

export type ResponseSignupEmailPayload = {
  isEmailAvailable: boolean;
};

export type ResponseSignupSuggestedUsernamePayload = {
  isSuggestedUserNameAvailable: boolean;
  suggestedUserName: string;
};

export type ResponseSignupAvatarErrorInfoPayload = {
  validationResult: {
    isFileSizeValid: boolean;
    isFileTypeValid: boolean;
    isImageDimensionsValid: boolean;
  };
};

export type ResponseSignupConfirmPayload = {
  user: UserInfo;
};

export type ResponseSignupConfirmRequiredInfoPayload = {
  emptyFields: string[];
};

export type ResponseSignupAvatarPayload = {
  avatarUrl: string;
};
