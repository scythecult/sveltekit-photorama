import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = () => {
  return json({ message: 'ok' });
};

export const POST: RequestHandler = async () => {
  // if (!data?.todo) {
  // компонент +error.svelte не будет работать, если ошибка возникла в API handler
  // будет работать только в load связанной с +layout.server.ts || +page.server.ts
  // error(400, { message: 'Fucked up' });
  // }

  return json({ message: 'ok from post' });
};
