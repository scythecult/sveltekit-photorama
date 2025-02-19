import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
  // default action работает если в форме в +page.svelte нет action
  // если в форме в +page.svelte есть action, то в +page.server.ts нужно определить аналогичный
  // в таком случае default action не будет работать
  default: ({ cookies, url }) => {
    cookies.set('token', '123', {
      path: '/'
    });

    redirect(303, url.searchParams.get('redirectTo') ?? '/');
  }
};
