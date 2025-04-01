import type { Handle, HandleFetch } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { PHOTORAMA_BASE_URL } from '$lib/constants/common';
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

export const handle: Handle = sequence(paraglideHandle);

export const handleFetch: HandleFetch = ({ event, request, fetch }) => {
  if (request.url.includes(PHOTORAMA_BASE_URL)) {
    request.headers.set('cookie', event.request.headers.get('cookie')!);
  }

  return fetch(request);
};
