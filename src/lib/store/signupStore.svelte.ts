export type SignupState = {
  username: string;
  password: string;
  email?: string;
  phone?: string;
  fullname: string;
  birthdate: string;
};

const initialState: SignupState = {
  username: '',
  password: '',
  email: '',
  phone: '',
  fullname: '',
  birthdate: '',
};

type PropName = keyof typeof initialState;

const createSignupStore = () => {
  const signupStore = $state<SignupState>(initialState);

  return {
    get state() {
      return signupStore;
    },

    setProperty(propName: PropName, value: string) {
      signupStore[propName] = value;
    },

    getProperty(propName: PropName) {
      return signupStore[propName];
    },
  };
};

export const signupStore = createSignupStore();
