import { type Actions, fail } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';
import { FormActionName, InputName } from '$lib/constants/action';
import { getDate } from '$lib/utils/common';
import { checkIsBirthdateValid } from '$lib/utils/validation';

export const actions: Actions = {
  [FormActionName.SIGNUP_BIRTHDATE]: async ({ request }) => {
    const data = await request.formData();
    const birthdate = data.get(InputName.BIRTHDATE) as string;
    const userYearsOld = getDate().calculateYears(birthdate);
    const isValid = checkIsBirthdateValid(userYearsOld);

    if (!isValid) {
      return fail(StatusCodes.UNPROCESSABLE_ENTITY, {
        isValid,
      });
    }
  },
};
