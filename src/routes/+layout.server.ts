import { error, redirect } from '@sveltejs/kit';
import HTTPMethod from 'http-method-enum';
import { StatusCodes } from 'http-status-codes';
import {
  AppPath,
  AppRoute,
  AppSearchParam,
  AUTHED_FORBIDDEN_URLS,
  PHOTORAMA_BASE_URL,
  UNAUTHED_FORBIDDEN_URLS,
} from '$lib/constants/app';
import { COOKIE_DEFAULT_PATH, CookieName } from '$lib/constants/request';
import type { PublicationsPayload, ResponsePayload, UserPayload } from '$lib/types/responsePayload.js';
import { clearDescriptionFromHashtags, extractHashtagsFromDescription } from '$lib/utils/common';

export const load = async ({ fetch, cookies, url }) => {
  const { pathname } = url;
  const sessionId = cookies.get(CookieName.USER_SESSION_ID);

  // Guard for registered users
  if (sessionId && AUTHED_FORBIDDEN_URLS.includes(pathname)) {
    redirect(StatusCodes.PERMANENT_REDIRECT, AppRoute.PUBLICATIONS);
  }

  // Guard for unregistered users
  if (!sessionId && !pathname.includes(AppRoute.UNREGISTRED) && UNAUTHED_FORBIDDEN_URLS.includes(pathname)) {
    const targetUrl = pathname.includes(AppRoute.PUBLICATIONS) ? AppRoute.ROOT : `${AppRoute.UNREGISTRED}${pathname}`;

    redirect(StatusCodes.SEE_OTHER, targetUrl);
  }

  if (!sessionId) {
    return;
  }

  // TODO Refactor below mb should use Promise static methods?
  // Check for sessionId or JWT?
  const userResponse = await fetch(`${PHOTORAMA_BASE_URL}${AppPath.USER}`, {
    method: HTTPMethod.GET,
  });

  if (!userResponse.ok) {
    if (userResponse.status === StatusCodes.UNAUTHORIZED) {
      cookies.delete(CookieName.USER_SESSION_ID, {
        path: COOKIE_DEFAULT_PATH,
      });

      cookies.delete(CookieName.USER_TOKEN, {
        path: COOKIE_DEFAULT_PATH,
      });

      return;
    }

    error(StatusCodes.INTERNAL_SERVER_ERROR);
  }

  const {
    data: { user },
  }: ResponsePayload<UserPayload> = await userResponse.json();
  const { username } = user;

  const publicationsResponse = await fetch(
    `${PHOTORAMA_BASE_URL}${AppPath.PUBLICATIONS}?${AppSearchParam.USERNAME}=${username}`,
    {
      method: HTTPMethod.GET,
    },
  );

  if (!publicationsResponse.ok) {
    error(StatusCodes.INTERNAL_SERVER_ERROR);
  }

  const {
    data: { publications },
  }: ResponsePayload<PublicationsPayload> = await publicationsResponse.json();

  // TODO Transform publications
  return {
    user,
    publications: publications.map((publication) => ({
      ...publication,
      hashtags: extractHashtagsFromDescription(publication.description),
      description: clearDescriptionFromHashtags(publication.description),
    })),
  };
};
