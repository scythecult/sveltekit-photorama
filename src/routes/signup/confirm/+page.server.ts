import { type Actions, error, fail } from '@sveltejs/kit';
import { parse } from 'cookie';
import { HTTPMethod } from 'http-method-enum';
import { StatusCodes } from 'http-status-codes';
import { FormActionName, InputName } from '$lib/constants/action';
import { AppPath, PHOTORAMA_BASE_URL } from '$lib/constants/app';
import { COOKIE_DEFAULT_PATH, CookieName } from '$lib/constants/request';
import type { ConfirmPayload, ResponsePayload } from '$lib/types/responsePayload';
import { getDate } from '$lib/utils/common';
import {
  checkIsBirthdateValid,
  checkIsEmailValid,
  checkIsFullnameValid,
  checkIsPasswordValid,
  checkIsUsernameValid,
} from '$lib/utils/validation';

export const actions: Actions = {
  [FormActionName.SIGNUP_CONFIRM]: async ({ fetch, request, cookies }) => {
    const data = await request.formData();
    const username = data.get(InputName.USERNAME) as string;
    const fullname = data.get(InputName.FULLNAME) as string;
    const birthdate = data.get(InputName.BIRTHDATE) as string;
    const email = data.get(InputName.EMAIL) as string;
    const password = data.get(InputName.PASSWORD) as string;

    const validationResult = {
      username: checkIsUsernameValid(username),
      fullname: checkIsFullnameValid(fullname),
      birthdate: checkIsBirthdateValid(getDate().calculateYears(birthdate)),
      email: checkIsEmailValid(email),
      password: checkIsPasswordValid(password),
    };

    const emptyFields = [...Object.entries(validationResult)]
      .map(([key, value]) => (!value ? key : null))
      .filter(Boolean);
    const isValid = !emptyFields.length;

    if (!isValid) {
      return fail(StatusCodes.UNPROCESSABLE_ENTITY, {
        isValid,
        emptyFields,
      });
    }

    const response = await fetch(`${PHOTORAMA_BASE_URL}${AppPath.SIGNUP_CONFIRM}`, {
      method: HTTPMethod.POST,
      body: JSON.stringify({ username, fullname, birthdate, email, password }),
    });

    if (response.ok) {
      const {
        data: { jwtToken },
      }: ResponsePayload<ConfirmPayload> = await response.json();
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

      // TODO Clear browser history?
      return {
        isLoading: false,
      };
    }

    error(StatusCodes.INTERNAL_SERVER_ERROR);
  },
};
