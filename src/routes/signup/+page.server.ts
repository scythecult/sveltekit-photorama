/* eslint-disable no-console */
import { ActionMap, ActionNameMap } from '$lib/constants/action';
// import { PHOTORAMA_BASE_URL } from '$lib/constants/common';
import type { Actions } from './$types';

export const actions: Actions = {
  // TODO Add User Login Route
  [ActionMap.SIGNUP_EMAIL]: async ({ request }) => {
    const data = await request.formData();
    const email = data.get(ActionNameMap.EMAIL) as string;

    console.log({ email });

    // const response = await fetch(`${PHOTORAMA_BASE_URL}`, {
    //   method: 'POST',
    //   body: JSON.stringify({ username, password }),

    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    // const result = await response.json();
    // console.log({ result });
  },
};
