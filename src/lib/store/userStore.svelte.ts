import type { Publication } from '$lib/types/publication';
import type { UserInfo } from '$lib/types/userInfo';

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
    avatar: '/',
    subscribedUsers: ['user1', 'user2'],
  });

  return {
    get state() {
      return userSlice;
    },

    setUserInfo(userInfo: UserInfo) {
      const { name, email, password, avatar, subscribedUsers } = userInfo;

      userSlice.name = name;
      userSlice.email = email;
      userSlice.password = password;
      userSlice.avatar = avatar;
      userSlice.subscribedUsers = subscribedUsers;
    },

    getUserInfo() {
      return userSlice;
    },
    getContacts() {
      return userSlice.subscribedUsers;
    },
  };
};

export const userSlice = createUserSlice();
