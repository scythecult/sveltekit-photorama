import type { Actions } from '@sveltejs/kit';
import { FormActionName, InputName } from '$lib/constants/action';

export const actions: Actions = {
  [FormActionName.SIGNUP_FULLNAME]: async ({ request }) => {
    const data = await request.formData();
    const fullname = data.get(InputName.FULLNAME) as string;
    // TODO Send fullname to server to verificate user exists or not
    // eslint-disable-next-line no-console
    console.log({ fullname });
  },
};
