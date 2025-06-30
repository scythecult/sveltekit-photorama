import type { Actions } from '@sveltejs/kit';
import { FormActionName, InputName } from '$lib/constants/action';

export const actions: Actions = {
  [FormActionName.SIGNUP_PASSWORD]: async ({ request }) => {
    const data = await request.formData();
    const password = data.get(InputName.PASSWORD) as string;

    // TODO Add server validation
    console.log({ password });
  },
};
