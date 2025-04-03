/* eslint-disable no-console */
import { ActionMap, ActionNameMap } from '$lib/constants/action';
import { PHOTORAMA_BASE_URL } from '$lib/constants/common';
import type { Actions } from './$types';

// export const load = async ({ cookies, fetch }) => {
// const response = await fetch(`${PHOTORAMA_BASE_URL}/login`, {
//   headers: {
//     Authorization: `Bearer ${cookies.get('user-check')}`,
//   },
// });
// cookies.get('user-check');
// const result = await response.json();
// console.log(response.headers);
// console.log(response.headers.getSetCookie());
// const [userCheck = ''] = response.headers.getSetCookie();
// const cookie = parseCookie(userCheck);
// cookies.set('cookie_check', cookie['cookie_check'], {
//   path: '/',
// });
// console.log('cookie_check', cookie);
// console.log('loading login data', { result });
// };

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
