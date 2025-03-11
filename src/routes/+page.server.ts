/* eslint-disable no-console */
import { ActionMap, ActionNameMap } from '$lib/constants/action';
import { KEKSTAGRAM_BASE_URL } from '$lib/constants/kekstagram';
import { convertStringToBoolean } from '$lib/utils/utils';
import type { Actions } from './$types';

export const actions: Actions = {
  [ActionMap.LIKE]: async ({ request }) => {
    const data = await request.formData();
    const publicationLikeId = data.get(ActionNameMap.PUBLICATION_LIKE_ID) as string;
    const isLiked = data.get(ActionNameMap.IS_LIKED) as string;

    // get picture by id from db
    // update picture like count
    console.log('update picture like count', { publicationLikeId, isLiked });
    // set liked picture id to user likedPictureIds:[] field

    if (publicationLikeId && isLiked) {
      console.log('?');
      // TODO Abstract fetch
      const response = await fetch(`${KEKSTAGRAM_BASE_URL}/like`, {
        method: 'POST',
        body: JSON.stringify({ publicationLikeId, isLiked: convertStringToBoolean(isLiked) }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      console.log({ result });

      return { publicationLikeId };
    }
  },
  [ActionMap.COMMENT_LIKE]: async ({ request }) => {
    const data = await request.formData();
    const commentLikeId = data.get(ActionNameMap.COMMENT_LIKE_ID) as string;
    const isLiked = data.get(ActionNameMap.IS_LIKED) as string;

    console.log('update guest-users comment like count', {
      commentLikeId,
      isLiked,
    });

    if (commentLikeId) {
      return { commentLikeId };
    }
  },
  [ActionMap.COMMENT]: async ({ request }) => {
    const data = await request.formData();
    const commentId = data.get(ActionNameMap.COMMENT_ID) as string;

    console.log('do comment', { commentId });
  },
};
