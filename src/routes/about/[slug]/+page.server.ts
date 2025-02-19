import { error } from '@sveltejs/kit';
import { about } from '../../../../mocks/data';

export function load({ params }) {
  const info = about.find(({ slug }) => slug === params.slug);

  if (!info) {
    error(404);
  }

  return {
    info
  };
}
