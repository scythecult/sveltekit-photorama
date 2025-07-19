import { type Actions, fail } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';
import { FormActionName, InputName } from '$lib/constants/action';
import { checkIsPasswordValid } from '$lib/utils/validation';

export const actions: Actions = {
  [FormActionName.SIGNUP_PASSWORD]: async ({ request }) => {
    const data = await request.formData();
    const password = data.get(InputName.PASSWORD) as string;
    const isValid = checkIsPasswordValid(password);

    if (!isValid) {
      return fail(StatusCodes.UNPROCESSABLE_ENTITY, {
        isValid,
      });
    }
  },
};
