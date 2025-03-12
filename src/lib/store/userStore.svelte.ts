import type { Publication } from '$lib/types/publication';

export type UserState = {
  name: string;
  email: string;
  password: string;
  avatar: string;
  publications?: Publication[];
  subscribedUsers?: string[];
};

const createUserSlice = () => {
  const userSlice = $state<UserState>({
    name: 'UsernameUsernameUsername',
    email: '',
    password: '',
    avatar: '',
    subscribedUsers: ['user1', 'user2'],
  });

  return {
    get state() {
      return userSlice;
    },

    getContacts() {
      return userSlice.subscribedUsers;
    },
  };
};

export const userSlice = createUserSlice();
