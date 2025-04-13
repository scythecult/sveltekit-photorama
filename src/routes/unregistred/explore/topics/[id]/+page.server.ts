// Массив из объектов в котором содержатся фотографии по хештегу (id) со ссылками на авторов

import { MOCK_TOPICS } from '../../mocks/mocks';

export const load = async ({ params }) => {
  // eslint-disable-next-line no-console
  console.log('STUB TOPIC page load', params?.id);

  return {
    topic: MOCK_TOPICS.find((topic) => topic.id === params?.id),
  };
};
