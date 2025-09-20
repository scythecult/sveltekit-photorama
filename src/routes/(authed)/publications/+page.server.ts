import { type Actions, error } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { HTTPMethod } from 'http-method-enum';
import { StatusCodes } from 'http-status-codes';
import { FormActionName, InputName } from '$lib/constants/action';
import { AppPath, PHOTORAMA_BASE_URL } from '$lib/constants/app';
import { convertStringToBoolean } from '$lib/utils/common';

export const actions: Actions = {
  [FormActionName.LIKE]: async ({ fetch, request }) => {
    const formData = await request.formData();
    const publicationId = formData.get(InputName.PUBLICATION_ID) as string;
    const isLiked = formData.get(InputName.IS_LIKED) as string;
    const isAllDataProvided = Boolean(publicationId && isLiked);

    if (!isAllDataProvided) {
      return fail(StatusCodes.UNPROCESSABLE_ENTITY, {
        message: `[${publicationId}] and [${isLiked}] is requred!`,
      });
    }

    const response = await fetch(`${PHOTORAMA_BASE_URL}${AppPath.LIKES}`, {
      method: HTTPMethod.POST,
      body: JSON.stringify({ id: publicationId, isLiked: convertStringToBoolean(isLiked) }),
    });

    if (response.ok) {
      return { publicationId };
    }

    // TODO Add custom error messages from "m"
    error(StatusCodes.INTERNAL_SERVER_ERROR, {
      message: 'Something went wrong',
      code: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  },

  [FormActionName.COMMENT_MESSAGE]: async ({ fetch, request }) => {
    const formData = await request.formData();
    const userId = formData.get(InputName.USER_ID) as string;
    const publicationId = formData.get(InputName.PUBLICATION_ID) as string;
    const message = formData.get(InputName.COMMENT_MESSAGE) as string;
    const isAllDataProvided = Boolean(publicationId && userId && message);

    if (!isAllDataProvided) {
      return fail(StatusCodes.UNPROCESSABLE_ENTITY, {
        message: `[${publicationId}] and [${userId}] and [${message}] is requred!`,
      });
    }

    const response = await fetch(`${PHOTORAMA_BASE_URL}${AppPath.COMMENT_MESSAGE}`, {
      method: HTTPMethod.POST,
      body: JSON.stringify({ id: publicationId, userId, message }),
    });

    if (response.ok) {
      return { userId, message };
    }

    error(StatusCodes.INTERNAL_SERVER_ERROR);
  },

  [FormActionName.COMMENT_LIKE]: async ({ request }) => {
    const data = await request.formData();
    const commentId = data.get(InputName.COMMENT_ID) as string;
    const isLiked = data.get(InputName.IS_LIKED) as string;
    const isAlldataProvided = Boolean(commentId && isLiked);

    if (!isAlldataProvided) {
      return fail(StatusCodes.UNPROCESSABLE_ENTITY, {
        message: `[${commentId}] and [${isLiked}] is requred!`,
      });
    }
    // eslint-disable-next-line no-console
    console.log('update guest-users comment like count', {
      commentId,
      isLiked,
    });

    if (commentId) {
      return { commentId };
    }
  },
};
