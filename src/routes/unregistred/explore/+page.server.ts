import { AppTitle } from '$lib/constants/app';
import { MOCK_TOPICS } from './mocks/mocks';

export const load = async () => {
  // eslint-disable-next-line no-console
  console.log('STUB EXPLORE page load top 10 categories of posts');

  return {
    topics: MOCK_TOPICS,
    title: AppTitle.EXPLORE,
  };
};
