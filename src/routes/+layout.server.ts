/* eslint-disable no-console */
import { error } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';
import { KEKSTAGRAM_BASE_URL } from '$lib/constants/common';
import type { Publication } from '$lib/types/publication';
import type { UserInfo } from '$lib/types/userInfo';
import { clearDescriptionFromHashtags, extractHashtagsFromDescription } from '$lib/utils/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // TODO Auth

  // TODO
  // Пользователь заходит в приложение -> возвращаем картинки всех пользователей
  // Если пользователь авторизован/зарегестрирован -> даём возможность лайкать/комментировать
  // Во время лайка/комментирования отправляем id картинки/комментария + id пользователя который совершил действие
  // Обновляем счетчик лайков конкретной картинки, добавляем комментарий в комментарии публикации
  try {
    const rawPublicationData = await fetch(KEKSTAGRAM_BASE_URL);
    const rawUserInfoData = await fetch(`${KEKSTAGRAM_BASE_URL}/user`);
    // TODO Картинки пренадлежат конкретному пользователю
    const rawPublications: Publication[] = (await rawPublicationData.json()) || [];
    const userInfo: UserInfo = (await rawUserInfoData.json()) || {};

    if (!userInfo.name) {
      error(StatusCodes.NOT_FOUND, {
        code: StatusCodes.NOT_FOUND,
        message: 'No user info found',
      });
    }

    if (!rawPublications.length) {
      error(StatusCodes.NOT_FOUND, {
        code: StatusCodes.NOT_FOUND,
        message: 'No pictures found',
      });
    }

    // TODO Проверить если Publication.likes.user.id === currentUser.id => Publication.isLiked = true
    const publications = rawPublications.map((publication) => ({
      ...publication,
      hashtags: extractHashtagsFromDescription(publication.description),
      description: clearDescriptionFromHashtags(publication.description),
    }));

    return { publications, userInfo };
  } catch (error) {
    console.log({ error });

    throw new Error(
      `${StatusCodes.INTERNAL_SERVER_ERROR}, Это сообщение не попадёт на клиент, тк может содержать чувствительную информацию`,
    );
  }
};
