/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes';
import { PHOTORAMA_BASE_URL } from '$lib/constants/common';
import type { Publication } from '$lib/types/publication';
import type { UserInfo } from '$lib/types/userInfo';
import { clearDescriptionFromHashtags, extractHashtagsFromDescription } from '$lib/utils/utils';

export const load = async ({ fetch }) => {
  // TODO Auth

  // TODO
  // Пользователь заходит в приложение -> возвращаем картинки всех пользователей
  // Если пользователь авторизован/зарегестрирован -> даём возможность лайкать/комментировать
  // Во время лайка/комментирования отправляем id картинки/комментария + id пользователя который совершил действие
  // Обновляем счетчик лайков конкретной картинки, добавляем комментарий в комментарии публикации

  try {
    // Сервер пытается проверить знает ли он пользователя по куки
    // Нужно отсылать какой-то признак с бекенда, что бы тут проверять
    // если признака нет, то свелте редиректит на страницу логина
    // если есть то мы получаем публикации
    // const response = await fetch(`${PHOTORAMA_BASE_URL}`);
    // const sessionId = cookies.get(CookieName.USER_SESSION_ID);
    // const cookies = parseCookieHeaderValues(response.headers.getSetCookie());
    // console.log('cookies in LAYOUT', { sessionId });

    // console.log('???', response.headers.getSetCookie());
    // console.log('???', sessionIdEntity);
    // console.log('???', cookie);

    // console.log(!sessionId);

    // if (!sessionId) {
    //   return {
    //     userInfo: null,
    //   };
    // }
    // console.log('get user data, publications');

    // const userData: UserInfo = (await rawUserData.json()) || {};

    // if (!userData.name) {
    // TODO Move user to login page
    // return;
    // error(StatusCodes.NOT_FOUND, {
    //   code: StatusCodes.NOT_FOUND,
    //   message: 'No user info found',
    // });
    // }
    // TODO Картинки пренадлежат конкретному пользователю

    const rawPublicationData = await fetch(`${PHOTORAMA_BASE_URL}/publications`);
    const rawUserInfoData = await fetch(`${PHOTORAMA_BASE_URL}/accounts`);
    const rawPublications: Publication[] = (await rawPublicationData.json()) || [];
    const userInfo: UserInfo = (await rawUserInfoData.json()) || {};

    // if (!userInfo.name) {
    //   error(StatusCodes.NOT_FOUND, {
    //     code: StatusCodes.NOT_FOUND,
    //     message: 'No user info found',
    //   });
    // }

    // if (!rawPublications.length) {
    //   error(StatusCodes.NOT_FOUND, {
    //     code: StatusCodes.NOT_FOUND,
    //     message: 'No pictures found',
    //   });
    // }

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
