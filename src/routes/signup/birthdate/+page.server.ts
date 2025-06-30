import type { Actions } from '@sveltejs/kit';
import { FormActionName, InputName } from '$lib/constants/action';

export const actions: Actions = {
  [FormActionName.SIGNUP_BIRTHDATE]: async ({ request }) => {
    const data = await request.formData();
    const birthdate = data.get(InputName.BIRTHDATE) as string;

    // TODO Add server validation
    console.log({ birthdate });
  },
};
