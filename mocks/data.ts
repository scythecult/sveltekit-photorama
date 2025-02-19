import type { BreadcrumbItem, HeaderNavItem } from '$lib/types/navigation';
import type { TodoItem } from '$lib/types/todo';

export const headerNavItems: HeaderNavItem[] = [
  {
    href: '/',
    title: 'Main',
  },
  {
    href: '/about',
    title: 'About',
  },
  {
    href: '/todo',
    title: 'Todo',
  },
  {
    href: '/secret',
    title: 'Secret',
  },
  {
    href: '/kekstagram',
    title: 'kekstagram',
  },
];

export const about: BreadcrumbItem[] = [
  {
    slug: 'me',
    title: 'Info about me',
    content:
      '<p>We hope your brief detention in the relaxation vault has been a pleasant one.</p><p>Your specimen has been processed and we are now ready to begin the test proper.</p>',
  },

  {
    slug: 'family',
    title: 'info about my family',
    content:
      '<p>While safety is one of many Enrichment Center Goals, the Aperture Science High Energy Pellet, seen to the left of the chamber, can and has caused permanent disabilities, such as vaporization. Please be careful.</p>',
  },

  {
    slug: 'work',
    title: 'info about work',
    content: "<p>I'm making a note here: HUGE SUCCESS.</p>",
  },
];

export const todos: TodoItem[] = [
  {
    id: crypto.randomUUID(),
    title: 'Todo 1',
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    title: 'Todo 2',
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    title: 'Todo 3',
    completed: false,
  },
];

export const updateTodos = (newTodo: TodoItem) => todos.push(newTodo);
