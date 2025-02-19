import { redirect } from '@sveltejs/kit';

export const load = ({ cookies, url }) => {
  if (!cookies.get('token')) {
    // второй аргумент в redirec попадает в url, который можно получить в login/+page.server.ts
    redirect(301, `/login?redirectTo=${url.pathname}`);
  }
};
