/* eslint-disable no-console */
import { error } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';
import { ActionMap, ActionNameMap } from '$lib/constants/action';
import { KEKSTAGRAM_BASE_URL } from '$lib/constants/kekstagram';
import type { Publication } from '$lib/types/publication';
import { clearDescriptionFromHashtags, convertStringToBoolean, extractHashtagsFromDescription } from '$lib/utils/utils';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // TODO Auth

  // TODO
  // Пользователь заходит в приложение -> возвращаем картинки всех пользователей
  // Если пользователь авторизован/зарегестрирован -> даём возможность лайкать/комментировать
  // Во время лайка/комментирования отправляем id картинки/комментария + id пользователя который совершил действие
  // Обновляем счетчик лайков конкретной картинки, добавляем комментарий в комментарии публикации
  try {
    const rawData = await fetch(KEKSTAGRAM_BASE_URL);
    // TODO Картинки пренадлежат конкретному пользователю
    const rawPublication: Publication[] = (await rawData.json()) || [];

    if (!rawPublication.length) {
      error(StatusCodes.NOT_FOUND, {
        code: StatusCodes.NOT_FOUND,
        message: 'No pictures found',
      });
    }

    // TODO Проверить если Publication.likes.user.id === currentUser.id => Publication.isLiked = true
    const publications = rawPublication.map((publication) => ({
      ...publication,
      hashtags: extractHashtagsFromDescription(publication.description),
      description: clearDescriptionFromHashtags(publication.description),
    }));

    console.log('"load" auto exec');

    return { publications };
  } catch (error) {
    throw new Error(
      `${StatusCodes.INTERNAL_SERVER_ERROR}, Это сообщение не попадёт на клиент, тк может содержать чувствительную информацию`,
    );
  }
};

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
