import { redirect } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';
import { AppRoute } from '$lib/constants/common';
import { CookieName } from '$lib/constants/cookies';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
  const sessionId = cookies.get(CookieName.USER_SESSION_ID);

  if (!sessionId) {
    const targetUrl = url.pathname.includes(AppRoute.PUBLICATIONS)
      ? AppRoute.ROOT
      : `${AppRoute.UNREGISTRED}${url.pathname}`;

    redirect(StatusCodes.SEE_OTHER, targetUrl);
  }
};
