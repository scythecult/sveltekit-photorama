import { headerNavItems } from '../../mocks/data';

export function load() {
  // const user = cookies.get('userId');

  // if (!user) {
  //   error(401, { message: 'No such user' });
  // }

  return { navItems: headerNavItems };
}
