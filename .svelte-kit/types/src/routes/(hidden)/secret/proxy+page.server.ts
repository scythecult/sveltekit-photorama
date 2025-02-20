// @ts-nocheck
import { type Actions,redirect } from '@sveltejs/kit';

export const actions = {
  logout: async ({ cookies }: import('./$types').RequestEvent) => {
    cookies.delete('token', {
      path: '/'
    });

    redirect(303, '/');
  }
};
;null as any as Actions;