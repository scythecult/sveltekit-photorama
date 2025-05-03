import { PHOTORAMA_BASE_URL } from '$lib/constants/app';
import type { Publication } from '$lib/types/publication';
import type { UserInfo } from '$lib/types/userInfo.js';
import { clearDescriptionFromHashtags, extractHashtagsFromDescription } from '$lib/utils/utils';

export const load = async ({ fetch }) => {
  const rawUserInfoData = await fetch(`${PHOTORAMA_BASE_URL}/user`);

  if (!rawUserInfoData.ok) {
    return;
  }

  const { data: userData } = (await rawUserInfoData.json()) || {};
  const userInfo: UserInfo = userData.userInfo || {};
  const { name } = userInfo;

  // TODO Prepare publications request params;

  const rawPublicationsData = await fetch(`${PHOTORAMA_BASE_URL}/publications?userName=${name}`);

  if (!rawPublicationsData.ok) {
    return;
  }

  const { data: publicationsData } = (await rawPublicationsData.json()) || {};
  const rawPublications: Publication[] = publicationsData.publications || [];

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
  const publications = rawPublications.map((publication) => ({
    ...publication,
    hashtags: extractHashtagsFromDescription(publication.description),
    description: clearDescriptionFromHashtags(publication.description),
  }));

  return { userInfo, publications };
};
