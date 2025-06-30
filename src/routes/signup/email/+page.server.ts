import { type Actions } from '@sveltejs/kit';
import { HTTPMethod } from 'http-method-enum';
import { fetchData } from '$lib/api/fetchData';
import { FormActionName, InputName } from '$lib/constants/action';
import { AppPath, PHOTORAMA_BASE_URL } from '$lib/constants/app';
import type { ResponseSignupEmailPayload } from '$lib/types/responsePayload';

export const actions: Actions = {
  // TODO Add User Login Route
  // TODO Implement email confirmation service
  [FormActionName.SIGNUP_EMAIL]: async ({ cookies, request }) => {
    const data = await request.formData();
    const email = data.get(InputName.EMAIL) as string;

    const {
      response,
      message,
      data: { isEmailAvailable },
    } = await fetchData<ResponseSignupEmailPayload>(`${PHOTORAMA_BASE_URL}${AppPath.SIGNUP_EMAIL}`, HTTPMethod.POST, {
      cookies,
      params: {
        body: { email },
      },
    });

    if (response.ok) {
      return {
        isEmailAvailable,
        message,
      };
    }
  },
};
