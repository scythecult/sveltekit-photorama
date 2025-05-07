import { HTTPMethod } from 'http-method-enum';
import { fetchData } from '$lib/api/fetchData.js';
import { AppPath, PHOTORAMA_BASE_URL } from '$lib/constants/app';
import type { Publication } from '$lib/types/publication';
import type { UserInfo } from '$lib/types/userInfo.js';
import { clearDescriptionFromHashtags, extractHashtagsFromDescription } from '$lib/utils/utils';

export const load = async ({ cookies }) => {
  const { data: userData } = await fetchData<{ user: UserInfo }>(
    `${PHOTORAMA_BASE_URL}${AppPath.USER}`,
    HTTPMethod.GET,
    {
      cookies,
    },
  );

  const userInfo = userData.user;
  const { name } = userInfo;

  const { data: publicationsData } = await fetchData<{ publications: Publication[] }>(
    `${PHOTORAMA_BASE_URL}${AppPath.PUBLICATIONS}?userName=${name}`,
    HTTPMethod.GET,
    { cookies },
  );

  // if (!rawPublicationsData.ok) {

  //   error(StatusCodes.NOT_FOUND, {
  //     code: StatusCodes.NOT_FOUND,
  //     message: 'No pictures found',
  //   });
  // }
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
  const publications = publicationsData.publications.map((publication) => ({
    ...publication,
    hashtags: extractHashtagsFromDescription(publication.description),
    description: clearDescriptionFromHashtags(publication.description),
  }));

  return { userInfo, publications };
};
