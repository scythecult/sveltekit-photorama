import { error, fail } from '@sveltejs/kit';
import { HTTPMethod } from 'http-method-enum';
import { StatusCodes } from 'http-status-codes';
import { FormActionName, InputName } from '$lib/constants/action';
import { AppPath, AppTitle, PHOTORAMA_BASE_URL } from '$lib/constants/app';
import type { ResponsePayload, UserNotePayload } from '$lib/types/responsePayload';
import type { Auditory } from '$lib/types/user';
import type { Actions } from './$types';

export const load = async () => {
  return {
    title: AppTitle.PROFILE,
  };
};

export const actions: Actions = {
  [FormActionName.CREATE_NOTE]: async ({ fetch, request }) => {
    const formData = await request.formData();
    const userId = formData.get(InputName.USER_ID) as string;
    const noteMessage = formData.get(InputName.NOTE_MESSAGE) as string;
    const auditory = formData.get(InputName.AUDITORY) as Auditory;
    const isAllDataProvided = Boolean(userId && noteMessage && auditory);

    if (!isAllDataProvided) {
      return fail(StatusCodes.UNPROCESSABLE_ENTITY, {
        message: `[${userId}] and [${noteMessage}] and [${auditory}] is requred!`,
      });
    }

    const response = await fetch(`${PHOTORAMA_BASE_URL}${AppPath.USER_NOTE}`, {
      method: HTTPMethod.POST,
      body: JSON.stringify({ userId, noteMessage, auditory }),
    });

    if (response.ok) {
      const { data }: ResponsePayload<UserNotePayload> = await response.json();

      return { ...data };
    }

    error(StatusCodes.INTERNAL_SERVER_ERROR);
  },
};
