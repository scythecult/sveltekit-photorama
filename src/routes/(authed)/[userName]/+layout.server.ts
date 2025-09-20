import { redirect } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';
import { AppRoute } from '$lib/constants/app';
import { CookieName } from '$lib/constants/request';

export const load = async ({ params, cookies }) => {
  const { userName = '' } = params;
  const sessionId = cookies.get(CookieName.USER_SESSION_ID);

  if (!sessionId && userName) {
    redirect(StatusCodes.SEE_OTHER, AppRoute.ROOT);
  }
};
