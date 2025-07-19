import { type Actions, fail } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';
import { FormActionName, InputName } from '$lib/constants/action';
import { checkIsFullnameValid } from '$lib/utils/validation';

export const actions: Actions = {
  [FormActionName.SIGNUP_FULLNAME]: async ({ request }) => {
    const data = await request.formData();
    const fullname = data.get(InputName.FULLNAME) as string;
    const isValid = checkIsFullnameValid(fullname);

    if (!isValid) {
      return fail(StatusCodes.UNPROCESSABLE_ENTITY, {
        isValid,
      });
    }
  },
};
