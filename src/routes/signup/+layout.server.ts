import { AppTitle } from '$lib/constants/app';
import { COOKIE_DEFAULT_PATH, CookieName } from '$lib/constants/request';

export const load = async ({ cookies }) => {
  const signupSessionId = cookies.get(CookieName.SIGNUP_SESSION_ID);
  const jwtToken = cookies.get(CookieName.USER_TOKEN);
  const sessionId = cookies.get(CookieName.USER_SESSION_ID);
  const isSignupSessionExists = Boolean(signupSessionId || (jwtToken && sessionId));

  if (!isSignupSessionExists) {
    cookies.set(CookieName.SIGNUP_SESSION_ID, crypto.randomUUID(), {
      path: COOKIE_DEFAULT_PATH,
    });
  }

  return {
    title: AppTitle.SIGNUP,
  };
};
