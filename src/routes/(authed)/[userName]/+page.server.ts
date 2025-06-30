/* eslint-disable no-console */
import { FormActionName, InputName } from '$lib/constants/action';
import { AppTitle, PHOTORAMA_BASE_URL } from '$lib/constants/app';
import type { Actions } from './$types';

export const load = async () => {
  console.log('PROFILE page load');

  return {
    title: AppTitle.PROFILE,
  };
};

export const actions: Actions = {
  [FormActionName.CREATE_NOTE]: async ({ fetch, request }) => {
    const data = await request.formData();
    const userId = data.get(InputName.USER_ID) as string;
    const noteMessage = data.get(InputName.NOTE_MESSAGE) as string;

    console.log({ userId, noteMessage });

    const response = await fetch(`${PHOTORAMA_BASE_URL}/user/note`, {
      method: 'POST',
      body: JSON.stringify({ userId, noteMessage }),
    });

    console.log(response.headers);
    const result = await response.json();
    console.log({ result });
  },
};
