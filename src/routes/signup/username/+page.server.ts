import { type Actions, error, fail } from '@sveltejs/kit';
import { HTTPMethod } from 'http-method-enum';
import { StatusCodes } from 'http-status-codes';
import { FormActionName, InputName } from '$lib/constants/action';
import { AppPath, AppSearchParam, PHOTORAMA_BASE_URL } from '$lib/constants/app.js';
import type { ResponsePayload, UsernamePayload } from '$lib/types/responsePayload.js';
import { checkIsUsernameValid } from '$lib/utils/validation.js';

export const load = async ({ fetch, url }) => {
  const username = url.searchParams.get(AppSearchParam.NAME) || '';
  const isValid = checkIsUsernameValid(username);

  if (!isValid) {
    return {
      username,
      isValid: false,
      isAvailable: true,
      isLoading: false,
    };
  }

  const response = await fetch(
    `${PHOTORAMA_BASE_URL}${AppPath.SIGNUP_SUGGESTED}?${AppSearchParam.USERNAME}=${username}`,
    {
      method: HTTPMethod.GET,
    },
  );

  if (response.ok) {
    const {
      data: { isAvailable, username },
    }: ResponsePayload<UsernamePayload> = await response.json();

    return {
      username,
      isValid,
      isAvailable,
      isLoading: false,
    };
  }

  error(StatusCodes.INTERNAL_SERVER_ERROR);
};

export const actions: Actions = {
  [FormActionName.SIGNUP_USERNAME]: async ({ request }) => {
    const data = await request.formData();
    const username = data.get(InputName.USERNAME) as string;
    const isValid = checkIsUsernameValid(username);

    if (!isValid) {
      return fail(StatusCodes.UNPROCESSABLE_ENTITY, {
        isValid,
      });
    }
  },
};
