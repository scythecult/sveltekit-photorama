import { redirect } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';
import { AppRoute, AUTHED_FORBIDDEN_URLS, UNAUTHED_FORBIDDEN_URLS } from '$lib/constants/app';
import { CookieName } from '../lib/constants/common.js';

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
};
