import { type Actions, fail } from '@sveltejs/kit';
import { parse } from 'cookie';
import { HTTPMethod } from 'http-method-enum';
import { StatusCodes } from 'http-status-codes';
import { fetchData } from '$lib/api/fetchData';
import { FormActionName, InputName } from '$lib/constants/action';
import { AppPath, PHOTORAMA_BASE_URL } from '$lib/constants/app';
import { COOKIE_DEFAULT_PATH, CookieName } from '$lib/constants/request';
import type { ResponseSignupConfirmPayload } from '$lib/types/responsePayload';

export const actions: Actions = {
  [FormActionName.SIGNUP_CONFIRM]: async ({ request, cookies }) => {
    const data = await request.formData();

    const emptyFields = [...data.entries()].map(([key, value]) => (!value ? key : null)).filter(Boolean);

    if (emptyFields.length) {
      return fail(StatusCodes.UNPROCESSABLE_ENTITY, {
        emptyFields,
      });
    }

    // TODO Implement util-function to create resquest body object from FormData
    // with 2 params: formData and array/object of fields expected in formData
    const username = data.get(InputName.USERNAME) as string;
    const fullname = data.get(InputName.FULLNAME) as string;
    const birthdate = data.get(InputName.BIRTHDATE) as string;
    const email = data.get(InputName.EMAIL) as string;
    const password = data.get(InputName.PASSWORD) as string;

    const {
      response,
      message,
      jwtToken,
      data: { user },
    } = await fetchData<ResponseSignupConfirmPayload>(
      `${PHOTORAMA_BASE_URL}${AppPath.SIGNUP_CONFIRM}`,
      HTTPMethod.POST,
      {
        cookies,
        params: {
          body: { username, fullname, birthdate, email, password },
        },
      },
    );

    const parsedCookies = parse(response.headers.getSetCookie().join('; '));
    const sessionId = parsedCookies[CookieName.USER_SESSION_ID];
    const signupSessionId = cookies.get(CookieName.SIGNUP_SESSION_ID);

    if (jwtToken) {
      cookies.set(CookieName.USER_JWT_TOKEN, jwtToken, {
        path: COOKIE_DEFAULT_PATH,
      });
    }

    if (sessionId) {
      cookies.set(CookieName.USER_SESSION_ID, sessionId, {
        path: COOKIE_DEFAULT_PATH,
      });
    }

    if (signupSessionId) {
      cookies.delete(CookieName.SIGNUP_SESSION_ID, {
        path: COOKIE_DEFAULT_PATH,
      });
    }

    if (response.ok) {
      return {
        isLoading: false,
        user,
        message,
      };
    }
  },
};
