import { type Actions, error, fail } from '@sveltejs/kit';
import { HTTPMethod } from 'http-method-enum';
import { StatusCodes } from 'http-status-codes';
import { FormActionName, InputName } from '$lib/constants/action';
import { AppPath, PHOTORAMA_BASE_URL } from '$lib/constants/app';
import type { EmailPayload, ResponsePayload } from '$lib/types/responsePayload';
import { checkIsEmailValid } from '$lib/utils/validation';

export const actions: Actions = {
  // TODO Implement email confirmation service
  [FormActionName.SIGNUP_EMAIL]: async ({ fetch, request }) => {
    const formData = await request.formData();
    const email = formData.get(InputName.EMAIL) as string;
    const isValid = checkIsEmailValid(email);

    if (!isValid) {
      return fail(StatusCodes.UNPROCESSABLE_ENTITY, {
        isValid,
      });
    }

    const response = await fetch(`${PHOTORAMA_BASE_URL}${AppPath.SIGNUP_EMAIL}`, {
      method: HTTPMethod.POST,
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      const {
        data: { isAvailable },
      }: ResponsePayload<EmailPayload> = await response.json();

      return { isAvailable };
    }

    error(StatusCodes.INTERNAL_SERVER_ERROR);
  },
};
