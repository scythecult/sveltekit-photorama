import { PHOTORAMA_BASE_URL } from '$lib/constants/app';

export const MOCK_TOPICS = [
  { id: '7', topic: 'haircuts', items: [] },
  { id: '8', topic: 'cites', items: [] },
  { id: '9', topic: 'photos', items: [] },
  { id: '10', topic: 'tvshows', items: [] },
  {
    id: '1',
    topic: 'nature',
    items: [
      {
        id: crypto.randomUUID(),
        relatesToId: '1',
        topic: 'lions',
        picture: `${PHOTORAMA_BASE_URL}/feed/user/images/2.jpg`,
        userName: 'raz-dva',
      },
      {
        id: crypto.randomUUID(),
        relatesToId: '1',
        topic: 'desert',
        picture: `${PHOTORAMA_BASE_URL}/feed/user/images/3.jpg`,
        userName: 'pirog',
      },
      {
        id: crypto.randomUUID(),
        relatesToId: '1',
        topic: 'whales',
        picture: `${PHOTORAMA_BASE_URL}/feed/user/images/4.jpg`,
        userName: 'kot',
      },
      {
        id: crypto.randomUUID(),
        relatesToId: '1',
        topic: 'tigers',
        picture: `${PHOTORAMA_BASE_URL}/feed/user/images/5.jpg`,
        userName: 'zalupa',
      },
      {
        id: crypto.randomUUID(),
        relatesToId: '1',
        topic: 'bear',
        picture: `${PHOTORAMA_BASE_URL}/feed/user/images/6.jpg`,
        userName: 'rus',
      },
      {
        id: crypto.randomUUID(),
        relatesToId: '1',
        topic: 'fox',
        picture: `${PHOTORAMA_BASE_URL}/feed/user/images/7.jpg`,
        userName: 'drusik',
      },
    ],
  },
  {
    id: '2',
    topic: 'people',
    items: [
      {
        id: crypto.randomUUID(),
        relatesToId: '2',
        topic: 'famous',
        picture: `${PHOTORAMA_BASE_URL}/feed/user/images/8.jpg`,
        userName: 'raz-dva',
      },
      {
        id: crypto.randomUUID(),
        relatesToId: '2',
        topic: 'stars',
        picture: `${PHOTORAMA_BASE_URL}/feed/user/images/9.jpg`,
        userName: 'pirog',
      },
      {
        id: crypto.randomUUID(),
        relatesToId: '2',
        topic: 'glorius',
        picture: `${PHOTORAMA_BASE_URL}/feed/user/images/10.jpg`,
        userName: 'kot',
      },
      {
        id: crypto.randomUUID(),
        relatesToId: '2',
        topic: 'popular',
        picture: `${PHOTORAMA_BASE_URL}/feed/user/images/11.jpg`,
        userName: 'zalupa',
      },
      {
        id: crypto.randomUUID(),
        relatesToId: '2',
        topic: 'check',
        picture: `${PHOTORAMA_BASE_URL}/feed/user/images/12.jpg`,
        userName: 'zalupa',
      },
    ],
  },
  {
    id: '4',
    topic: 'places',
    items: [
      {
        id: crypto.randomUUID(),
        relatesToId: '4',
        topic: 'thailand',
        picture: `${PHOTORAMA_BASE_URL}/feed/user/images/13.jpg`,
        userName: 'zalupa',
      },
      {
        id: crypto.randomUUID(),
        relatesToId: '4',
        topic: 'beach',
        picture: `${PHOTORAMA_BASE_URL}/feed/user/images/14.jpg`,
        userName: 'drusik',
      },
      {
        id: crypto.randomUUID(),
        relatesToId: '4',
        topic: 'vietnam',
        picture: `${PHOTORAMA_BASE_URL}/feed/user/images/15.jpg`,
        userName: 'usa',
      },
    ],
  },
  {
    id: '5',
    topic: 'tattoos',
    items: [
      {
        id: crypto.randomUUID(),
        relatesToId: '5',
        topic: 'oldschool',
        picture: `${PHOTORAMA_BASE_URL}/feed/user/images/16.jpg`,
        userName: 'rus',
      },
      {
        id: crypto.randomUUID(),
        relatesToId: '5',
        topic: 'tribal',
        picture: `${PHOTORAMA_BASE_URL}/feed/user/images/17.jpg`,
        userName: 'kot',
      },
    ],
  },
  {
    id: '6',
    topic: 'cars',
    items: [
      {
        id: crypto.randomUUID(),
        relatesToId: '6',
        topic: 'expensive',
        picture: `${PHOTORAMA_BASE_URL}/feed/user/images/18.jpg`,
        userName: 'kot',
      },
    ],
  },
];
