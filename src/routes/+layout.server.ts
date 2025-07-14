import { redirect } from '@sveltejs/kit';
import HTTPMethod from 'http-method-enum';
import { StatusCodes } from 'http-status-codes';
import { fetchData } from '$lib/api/fetchData';
import {
  AppPath,
  AppRoute,
  AppSearchParam,
  AUTHED_FORBIDDEN_URLS,
  PHOTORAMA_BASE_URL,
  UNAUTHED_FORBIDDEN_URLS,
} from '$lib/constants/app';
import { CookieName } from '$lib/constants/request';
import type { Publication } from '$lib/types/publication';
import type { UserInfo } from '$lib/types/userInfo';
import { clearDescriptionFromHashtags, extractHashtagsFromDescription } from '$lib/utils/utils';

export const load = async ({ cookies, url }) => {
  const { pathname } = url;
  const sessionId = cookies.get(CookieName.USER_SESSION_ID);

  if (sessionId && AUTHED_FORBIDDEN_URLS.includes(pathname)) {
    redirect(StatusCodes.PERMANENT_REDIRECT, AppRoute.PUBLICATIONS);
  }

  if (!sessionId && !pathname.includes(AppRoute.UNREGISTRED) && UNAUTHED_FORBIDDEN_URLS.includes(pathname)) {
    const targetUrl = pathname.includes(AppRoute.PUBLICATIONS) ? AppRoute.ROOT : `${AppRoute.UNREGISTRED}${pathname}`;

    redirect(StatusCodes.SEE_OTHER, targetUrl);
  }

  // TODO Refactor below
  if (sessionId) {
    const { data: userData } = await fetchData<{ user: UserInfo }>(
      `${PHOTORAMA_BASE_URL}${AppPath.USER}`,
      HTTPMethod.GET,
      {
        cookies,
      },
    );

    const userInfo = userData.user;
    const { username } = userInfo;

    const { data: publicationsData } = await fetchData<{ publications: Publication[] }>(
      `${PHOTORAMA_BASE_URL}${AppPath.PUBLICATIONS}?${AppSearchParam.USERNAME}=${username}`,
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

    const publications = publicationsData.publications.map((publication) => ({
      ...publication,
      hashtags: extractHashtagsFromDescription(publication.description),
      description: clearDescriptionFromHashtags(publication.description),
    }));

    return { userInfo, publications };
  }
};
