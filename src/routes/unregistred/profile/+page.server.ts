import { AppTitle } from '$lib/constants/app';

export const load = async () => {
  // eslint-disable-next-line no-console
  console.log('STUB PROFILE page load');

  return {
    title: AppTitle.PROFILE,
  };
};
