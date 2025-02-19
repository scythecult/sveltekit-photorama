// @ts-nocheck
import type { TodoItem } from '$lib/types/todo';
import { todos } from '../../../mocks/data';
import type { PageServerLoad, Actions } from './$types';

export const load = async () => {
  const todoItems = await new Promise<TodoItem[]>((resolve) => {
    setTimeout(() => {
      resolve(todos);
    }, 2000);
  });

  return {
    todos: todoItems
  };
};

export const actions = {
  create: async ({ request }: import('./$types').RequestEvent) => {
    const data = await request.formData();
    const todo = data.get('title') as string;

    if (todo) {
      todos.push({
        id: crypto.randomUUID(),
        title: todo,
        completed: false
      });

      return {
        todos
      };
    }
  },
  complete: async ({ request }: import('./$types').RequestEvent) => {
    const data = await request.formData();
    const id = data.get('id') as string;

    if (id) {
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }

        return todo;
      });

      return {
        todos
      };
    }
  },

  delete: async ({ request }: import('./$types').RequestEvent) => {
    const data = await request.formData();
    const id = data.get('id') as string;

    if (id) {
      const newTodos = todos.filter((todo) => todo.id !== id);

      todos.splice(0, todos.length, ...newTodos);

      return {
        todos
      };
    }
  }
};
;null as any as PageServerLoad;;null as any as Actions;