import { AppTitle } from '$lib/constants/app';

export const load = async () => {
  // eslint-disable-next-line no-console
  console.log('create page load');

  return {
    title: AppTitle.CREATE,
  };
};
