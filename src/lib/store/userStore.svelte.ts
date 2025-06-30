import type { Publication } from '$lib/types/publication';
import type { UserInfo } from '$lib/types/userInfo';

export type UserState = {
  id: string;
  username: string;
  email: string;
  password: string;
  avatarUrl: string;
  publications?: Publication[];
  noteMessage?: string;
  subscribedUsers?: string[];
};

const createUserStore = () => {
  const userStore = $state<UserState>({
    id: '',
    username: '',
    email: '',
    password: '',
    avatarUrl: '/',
    noteMessage: '',
    subscribedUsers: [],
  });

  return {
    get state() {
      return userStore;
    },

    setUserInfo(userInfo: UserInfo) {
      const { id, username, email, password, avatarUrl, subscribedUsers, noteMessage } = userInfo;

      userStore.id = id;
      userStore.username = username;
      userStore.email = email;
      userStore.password = password;
      userStore.noteMessage = noteMessage;
      userStore.avatarUrl = avatarUrl;
      userStore.subscribedUsers = subscribedUsers;
    },

    getUserInfo() {
      return userStore;
    },
    getContacts() {
      return userStore.subscribedUsers;
    },
  };
};

export const userStore = createUserStore();
