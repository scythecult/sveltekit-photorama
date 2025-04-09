/* eslint-disable no-console */
import { ActionMap, ActionNameMap } from '$lib/constants/action';
import type { Actions } from './$types';

export const actions: Actions = {
  // TODO Add User Login Route
  [ActionMap.LOGIN]: async ({ request }) => {
    const data = await request.formData();
    const username = data.get(ActionNameMap.USERNAME) as string;
    const password = data.get(ActionNameMap.PASSWORD) as string;

    console.log({ username, password });

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
