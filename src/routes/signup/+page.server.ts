/* eslint-disable no-console */
import { ActionMap, ActionNameMap } from '$lib/constants/action';
import { PHOTORAMA_BASE_URL } from '$lib/constants/common';
import { CookieName } from '$lib/constants/cookies';
import { getCookieByName, parseCookieHeaderValues } from '$lib/utils/utils';
import type { Actions } from './$types';

export const actions: Actions = {
  // TODO Add User Login Route
  // TODO Implement email confirmation service
  // Every form step is separate page
  [ActionMap.SIGNUP_EMAIL]: async ({ cookies, request }) => {
    const data = await request.formData();
    const email = data.get(ActionNameMap.EMAIL) as string;
    const password = data.get(ActionNameMap.PASSWORD) as string;

    console.log({ email, password });

    const response = await fetch(`${PHOTORAMA_BASE_URL}/accounts/signup`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),

      headers: {
        'Content-Type': 'application/json',
      },
    });

    const parsedCookies = parseCookieHeaderValues(response.headers.getSetCookie());
    const sessionId = getCookieByName(parsedCookies, CookieName.USER_SESSION_ID);

    if (sessionId) {
      cookies.set(CookieName.USER_SESSION_ID, sessionId, {
        path: '/',
      });
    }
    console.log('cookie in SIGNUP', { sessionId });

    const result = await response.json();
    console.log({ result });
  },
};
