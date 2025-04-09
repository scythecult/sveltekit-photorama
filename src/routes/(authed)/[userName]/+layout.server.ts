import { redirect } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';
import { CookieName } from '$lib/constants/cookies.js';
import { AppRoute } from '$lib/constants/url.js';

export const load = async ({ params, cookies }) => {
  const { userName = '' } = params;
  const sessionId = cookies.get(CookieName.USER_SESSION_ID);

  if (!sessionId && userName) {
    redirect(StatusCodes.SEE_OTHER, AppRoute.ROOT);
  }

  // eslint-disable-next-line no-console
  console.log(`Do get request on server by current user ${params.userName}`);
};
