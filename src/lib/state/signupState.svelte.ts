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

const createSignupState = () => {
  const signupState = $state<SignupState>(initialState);

  return {
    get state() {
      return signupState;
    },

    setProperty(propName: PropName, value: string) {
      signupState[propName] = value;
    },

    getProperty(propName: PropName) {
      return signupState[propName];
    },
  };
};

export const signupState = createSignupState();
