import type { Publication } from '$lib/types/publication';
import type { UserInfo } from '$lib/types/userInfo';

export type UserState = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  publications?: Publication[];
  noteMessage?: string;
  subscribedUsers?: string[];
};

const createUserStore = () => {
  const userStore = $state<UserState>({
    id: '',
    name: '',
    email: '',
    password: '',
    avatar: '/',
    noteMessage: 'Bla bla check',
    subscribedUsers: [],
  });

  return {
    get state() {
      return userStore;
    },

    setUserInfo(userInfo: UserInfo) {
      const { id, name, email, password, avatar, subscribedUsers, noteMessage } = userInfo;

      userStore.id = id;
      userStore.name = name;
      userStore.email = email;
      userStore.password = password;
      userStore.noteMessage = noteMessage;
      userStore.avatar = avatar;
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
