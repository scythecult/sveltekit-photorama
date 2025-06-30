import { CookieName } from '$lib/constants/request';

export const load = async ({ cookies }) => {
  const signupSessionId = cookies.get(CookieName.SIGNUP_SESSION_ID);
  const jwtToken = cookies.get(CookieName.USER_JWT_TOKEN);
  const sessionId = cookies.get(CookieName.USER_SESSION_ID);

  if (!signupSessionId && !jwtToken && !sessionId) {
    cookies.set(CookieName.SIGNUP_SESSION_ID, crypto.randomUUID(), {
      path: '/',
    });
  }
};
