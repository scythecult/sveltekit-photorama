import type { HandleServerError } from '@sveltejs/kit';
import { type Handle, type HandleFetch } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { StatusCodes } from 'http-status-codes';
import { PHOTORAMA_BASE_URL } from '$lib/constants/app';
import { COOKIE_DEFAULT_PATH, CookieName } from '$lib/constants/request';
import HttpError from '$lib/dto/HttpError';
import { paraglideMiddleware } from '$lib/paraglide/server';

const paraglideHandle: Handle = ({ event, resolve }) =>
  paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
    event.request = localizedRequest;
    return resolve(event, {
      transformPageChunk: ({ html }) => {
        return html.replace('%lang%', locale);
      },
    });
  });

const logger: Handle = ({ event, resolve }) => {
  // console.log(event.request);

  return resolve(event);
};

export const handle: Handle = sequence(logger, paraglideHandle);

export const handleError: HandleServerError = async ({ event, status, error }) => {
  // TODO Refactor
  // eslint-disable-next-line no-console
  console.info('HANDLE ERROR HOOK IS CALLED', { status, error });

  const isGlobalServerError = error instanceof HttpError;
  const serverErrorStatus = isGlobalServerError ? error.status : undefined;
  const serverErrorMessage = isGlobalServerError ? error.originalMessage : undefined;
  const message = serverErrorMessage ? serverErrorMessage : 'Whoops';

  if (isGlobalServerError && serverErrorStatus === StatusCodes.UNAUTHORIZED) {
    event.cookies.delete(CookieName.USER_SESSION_ID, {
      path: COOKIE_DEFAULT_PATH,
    });

    event.cookies.delete(CookieName.USER_TOKEN, {
      path: COOKIE_DEFAULT_PATH,
    });
  }

  return {
    message,
    code: status,
  };
};

export const handleFetch: HandleFetch = ({ event, request, fetch }) => {
  const isGlobalBackendUrl = request.url.includes(PHOTORAMA_BASE_URL);

  if (isGlobalBackendUrl) {
    request.headers.set('cookie', event.request.headers.get('cookie') || '');
    request.headers.set('credentials', 'include');
    request.headers.set('Content-Type', 'application/json');
  }

  return fetch(request);
};
