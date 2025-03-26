/* eslint-disable no-console */
import { ActionMap, ActionNameMap } from '$lib/constants/action';
import { PHOTORAMA_BASE_URL } from '$lib/constants/common';
import { convertStringToBoolean } from '$lib/utils/utils';
import type { Actions } from './$types';

export const actions: Actions = {
  // TODO Add User Login Route
  [ActionMap.LOGIN]: async ({ request }) => {
    const data = await request.formData();
    const username = data.get(ActionNameMap.USERNAME) as string;
    const password = data.get(ActionNameMap.PASSWORD) as string;

    const response = await fetch(`${PHOTORAMA_BASE_URL}`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),

      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    console.log({ result });
  },
  [ActionMap.LIKE]: async ({ request }) => {
    const data = await request.formData();
    const publicationId = data.get(ActionNameMap.PUBLICATION_ID) as string;
    const isLiked = data.get(ActionNameMap.IS_LIKED) as string;

    // get picture by id from db
    // update picture like count
    console.log('update picture like count', { publicationId, isLiked });
    // set liked picture id to user likedPictureIds:[] field

    if (publicationId && isLiked) {
      // TODO Abstract fetch
      const response = await fetch(`${PHOTORAMA_BASE_URL}/publications/likes/${publicationId}`, {
        method: 'POST',
        body: JSON.stringify({ publicationId, isLiked: convertStringToBoolean(isLiked) }),

        headers: {
          'Content-Type': 'application/json',
        },
      });

      // TODO Add error handling
      if (!response.ok) {
        console.log('not OK');
      }

      const result = await response.json();

      console.log({ result });

      return { publicationId };
    }
  },
  [ActionMap.COMMENT_LIKE]: async ({ request }) => {
    const data = await request.formData();
    const commentId = data.get(ActionNameMap.COMMENT_ID) as string;
    const isLiked = data.get(ActionNameMap.IS_LIKED) as string;

    console.log('update guest-users comment like count', {
      commentId,
      isLiked,
    });

    if (commentId) {
      return { commentId };
    }
  },
  [ActionMap.COMMENT]: async ({ request }) => {
    const data = await request.formData();
    const commentId = data.get(ActionNameMap.COMMENT_ID) as string;

    console.log('do comment', { commentId });
  },
  [ActionMap.COMMENT_MESSAGE]: async ({ request }) => {
    const data = await request.formData();
    const userId = data.get(ActionNameMap.USER_ID) as string;
    const publicationId = data.get(ActionNameMap.PUBLICATION_ID) as string;
    const message = data.get(ActionNameMap.MESSAGE) as string;

    // TODO mb should validate comment message?
    if (publicationId && userId && message) {
      // TODO Abstract fetch
      const response = await fetch(`${PHOTORAMA_BASE_URL}/publications/comments`, {
        method: 'POST',
        body: JSON.stringify({ publicationId, userId, message }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      console.log({ result });

      return { userId, message };
    }

    console.log('success', { userId, message });
  },
};
