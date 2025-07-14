import type { Actions } from '@sveltejs/kit';
import { HTTPMethod } from 'http-method-enum';
import { fetchData } from '$lib/api/fetchData';
import { FormActionName, InputName } from '$lib/constants/action';
import { AppTitle, PHOTORAMA_BASE_URL } from '$lib/constants/app';
import type { UserInfo } from '$lib/types/userInfo';

export const load = async () => {
  return {
    title: AppTitle.LOGIN,
  };
};

export const actions: Actions = {
  // TODO Add User Login Route
  [FormActionName.LOGIN]: async ({ request, cookies }) => {
    const data = await request.formData();
    const username = data.get(InputName.USERNAME) as string;
    const password = data.get(InputName.PASSWORD) as string;

    const {
      data: { user },
    } = await fetchData<{ user: UserInfo }>(`${PHOTORAMA_BASE_URL}/login`, HTTPMethod.POST, {
      cookies,
      params: {
        body: { username, password },
      },
    });

    // eslint-disable-next-line no-console
    console.info(user);

    // const response = await fetch(`${PHOTORAMA_BASE_URL}/login`, {
    //   method: 'POST',
    //   body: JSON.stringify({ username, password }),

    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    // console.log(response.headers);
    // const result = await response.json();
    // console.log({ result });
  },
};
