import { redirect } from '@sveltejs/kit';
import { parse } from 'cookie';
import { HTTPMethod } from 'http-method-enum';
import { StatusCodes } from 'http-status-codes';
import { fetchData } from '$lib/api/fetchData';
import { ActionMap, ActionNameMap } from '$lib/constants/action';
import { AppPath, AppRoute, PHOTORAMA_BASE_URL } from '$lib/constants/app';
import { CookieName } from '$lib/constants/request';
import type { Actions } from './$types';

export const actions: Actions = {
  // TODO Add User Login Route
  // TODO Implement email confirmation service
  // Every form step is separate page
  [ActionMap.SIGNUP_EMAIL]: async ({ cookies, request }) => {
    const data = await request.formData();
    const email = data.get(ActionNameMap.EMAIL) as string;
    const password = data.get(ActionNameMap.PASSWORD) as string;

    const { response, jwtToken } = await fetchData(`${PHOTORAMA_BASE_URL}${AppPath.SIGNUP}`, HTTPMethod.POST, {
      cookies,
      params: {
        body: { email, password },
      },
    });

    if (response.ok) {
      const parsedCookies = parse(response.headers.getSetCookie().join('; '));
      const sessionId = parsedCookies[CookieName.USER_SESSION_ID];

      if (jwtToken) {
        cookies.set(CookieName.USER_JWT_TOKEN, jwtToken, {
          path: '/',
        });
      }

      if (sessionId) {
        cookies.set(CookieName.USER_SESSION_ID, sessionId, {
          path: '/',
        });

        redirect(StatusCodes.PERMANENT_REDIRECT, AppRoute.PUBLICATIONS);
      }
    }
  },
};
