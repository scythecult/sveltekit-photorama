import { AppTitle } from '$lib/constants/app';

export const load = async () => {
  // eslint-disable-next-line no-console
  console.log('PROFILE page load');

  return {
    title: AppTitle.PROFILE,
  };
};
