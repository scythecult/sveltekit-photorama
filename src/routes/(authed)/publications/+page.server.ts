/* eslint-disable no-console */
import { fail } from '@sveltejs/kit';
import { HTTPMethod } from 'http-method-enum';
import { StatusCodes } from 'http-status-codes';
import { fetchData } from '$lib/api/fetchData';
import { FormActionName, InputName } from '$lib/constants/action';
import { AppPath, PHOTORAMA_BASE_URL } from '$lib/constants/app';
import { convertStringToBoolean } from '$lib/utils/utils';
import type { Actions } from '../../$types';

export const actions: Actions = {
  [FormActionName.LIKE]: async ({ request, cookies }) => {
    const data = await request.formData();
    const publicationId = data.get(InputName.PUBLICATION_ID) as string;
    const isLiked = data.get(InputName.IS_LIKED) as string;

    if (publicationId && isLiked) {
      const { data } = await fetchData(`${PHOTORAMA_BASE_URL}${AppPath.LIKE}/${publicationId}`, HTTPMethod.POST, {
        cookies,
        params: {
          body: { publicationId, isLiked: convertStringToBoolean(isLiked) },
        },
      });

      console.log({ data });

      return { publicationId };
    }

    fail(StatusCodes.UNPROCESSABLE_ENTITY, {
      description: `[${publicationId}] and [${isLiked}] is requred!`,
    });
  },
  [FormActionName.COMMENT_LIKE]: async ({ request }) => {
    const data = await request.formData();
    const commentId = data.get(InputName.COMMENT_ID) as string;
    const isLiked = data.get(InputName.IS_LIKED) as string;

    console.log('update guest-users comment like count', {
      commentId,
      isLiked,
    });

    if (commentId) {
      return { commentId };
    }
  },
  [FormActionName.COMMENT]: async ({ request }) => {
    const data = await request.formData();
    const commentId = data.get(InputName.COMMENT_ID) as string;

    console.log('do comment', { commentId });
  },
  [FormActionName.COMMENT_MESSAGE]: async ({ request, cookies }) => {
    const data = await request.formData();
    const userId = data.get(InputName.USER_ID) as string;
    const publicationId = data.get(InputName.PUBLICATION_ID) as string;
    const message = data.get(InputName.MESSAGE) as string;

    if (publicationId && userId && message) {
      const { data } = await fetchData(`${PHOTORAMA_BASE_URL}${AppPath.COMMENT_MESSAGE}`, HTTPMethod.POST, {
        cookies,
        params: {
          body: { publicationId, userId, message },
        },
      });

      console.log({ data });

      return { userId, message };
    }

    fail(StatusCodes.UNPROCESSABLE_ENTITY, {
      description: `[${publicationId}], [${message}] and [${userId}] is requred!`,
    });
  },
};
