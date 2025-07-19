import type { Actions } from '@sveltejs/kit';
import { HTTPMethod } from 'http-method-enum';
import { FormActionName, InputName } from '$lib/constants/action';
import { AppPath, AppTitle, PHOTORAMA_BASE_URL } from '$lib/constants/app';
import type { ResponsePayload, UserPayload } from '$lib/types/responsePayload';

export const load = async () => {
  return {
    title: AppTitle.LOGIN,
  };
};

export const actions: Actions = {
  // TODO Add User Login Route
  [FormActionName.LOGIN]: async ({ fetch, request }) => {
    const data = await request.formData();
    const username = data.get(InputName.USERNAME) as string;
    const password = data.get(InputName.PASSWORD) as string;

    const response = await fetch(`${PHOTORAMA_BASE_URL}${AppPath.LOGIN}`, {
      method: HTTPMethod.POST,
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const {
        data: { user },
      }: ResponsePayload<UserPayload> = await response.json();

      // eslint-disable-next-line no-console
      console.info(user);
    }
  },
};
