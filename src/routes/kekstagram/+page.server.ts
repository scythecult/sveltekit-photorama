import { error } from '@sveltejs/kit';
import { KEKSTAGRAM_BASE_URL } from '$lib/constants/kekstagram';
import type { Picture } from '$lib/types/picture';
import type { Actions, PageServerLoad } from './$types';
import { StatusCodes } from 'http-status-codes';
import { clearDescriptionFromHashtags, extractHashtagsFromDescription } from '$lib/utils/utils';
import { ActionMap, ActionNameMap } from '$lib/constants/action';

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
    const rawPictures: Picture[] = (await rawData.json()) || [];

    if (!rawPictures.length) {
      error(StatusCodes.NOT_FOUND, { code: StatusCodes.NOT_FOUND, message: 'No pictures found' });
    }

    const pictures = rawPictures.map((picture) => ({
      ...picture,
      hashtags: extractHashtagsFromDescription(picture.description),
      description: clearDescriptionFromHashtags(picture.description),
    }));

    return { pictures };
  } catch (error) {
    throw new Error(
      `${StatusCodes.INTERNAL_SERVER_ERROR}, Это сообщение не попадёт на клиент, тк может содержать чувствительную информацию`
    );
  }
};

export const actions: Actions = {
  [ActionMap.LIKE]: async ({ request }) => {
    const data = await request.formData();
    const pictureLikeId = data.get(ActionNameMap.PICTURE_LIKE_ID) as string;
    const isLiked = data.get(ActionNameMap.IS_LIKED) as string;

    // get picture by id from db
    // update picture like count
    console.log('update picture like count', { pictureLikeId, isLiked });

    if (pictureLikeId) {
      return { pictureLikeId };
    }
  },
  [ActionMap.COMMENT_LIKE]: async ({ request }) => {
    const data = await request.formData();
    const commentLikeId = data.get(ActionNameMap.COMMENT_LIKE_ID) as string;
    const isLiked = data.get(ActionNameMap.IS_LIKED) as string;

    console.log('update guest-users comment like count', { commentLikeId, isLiked });

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
