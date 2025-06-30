import type { Actions } from '@sveltejs/kit';
import { HTTPMethod } from 'http-method-enum';
import { fetchData } from '$lib/api/fetchData.js';
import { FormActionName, InputName } from '$lib/constants/action';
import { AppPath, AppSearchParam, PHOTORAMA_BASE_URL } from '$lib/constants/app.js';
import type { ResponseSignupSuggestedUsernamePayload } from '$lib/types/responsePayload.js';

export const load = async ({ url }) => {
  const suggestedUserName = url.searchParams.get(AppSearchParam.SUGGESTED_USERNAME);

  if (suggestedUserName) {
    const {
      response,
      message,
      data: { isSuggestedUserNameAvailable },
    } = await fetchData<ResponseSignupSuggestedUsernamePayload>(
      `${PHOTORAMA_BASE_URL}${AppPath.SIGNUP_SUGGESTED_USERNAME}?${AppSearchParam.SUGGESTED_USERNAME}=${suggestedUserName}`,
      HTTPMethod.GET,
    );

    if (response.ok) {
      return {
        isLoading: false,
        isSuggestedUserNameAvailable,
        message,
      };
    }
  }

  return {
    isLoading: false,
    isSuggestedUserNameAvailable: false,
  };
};

export const actions: Actions = {
  [FormActionName.SIGNUP_USERNAME]: async ({ request }) => {
    const data = await request.formData();
    const username = data.get(InputName.USERNAME) as string;

    console.log({ username });
  },
};
