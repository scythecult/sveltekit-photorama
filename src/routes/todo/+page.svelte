<script lang="ts">
  import Button from '$lib/components/button/Button.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import Input from '$lib/components/input/Input.svelte';
  import { FormActionMap, FormTypeMap } from '$lib/constants/form.js';

  const { data } = $props();
  const todos = $derived(data.todos);
  const totalActive = $derived(todos.filter((todo) => !todo.completed).length);
  const totalCompleted = $derived(todos.filter((todo) => todo.completed).length);
</script>

<section class="todo">
  <div class="todo__container">
    <h2 class="todo__title">Active {totalActive} {totalActive > 1 ? 'todos' : 'todo'}</h2>
    <ul class="todo__list">
      {#each todos as { id, title, completed } (id)}
        {#if !completed}
          <li class="todo__item">
            <p class="todo__text">
              {id}
              {title}
            </p>
            <Form actionUrl={FormActionMap.COMPLETE} formType={FormTypeMap.COMPLETE}>
              {#snippet input(disabled)}
                <Input {disabled} type="hidden" required name="id" value={id} placeholder="ID" />
              {/snippet}
              {#snippet button(text)}
                <Button>{text}</Button>
              {/snippet}
            </Form>
          </li>
        {/if}
      {:else}
        <p>No tasks</p>
      {/each}
    </ul>
  </div>
  <div class="todo__container todo__container--completed">
    <h2 class="todo__title">Completed {totalCompleted}</h2>
    <ul class="todo__list todo__list--completed">
      {#each todos as { id, title, completed } (id)}
        {#if completed}
          <li class="todo__item">
            <p class="todo__text">
              {id}
              {title}
            </p>
            <div class="todo__buttons">
              <Form actionUrl={FormActionMap.COMPLETE} formType={FormTypeMap.UNCOMPLETE}>
                {#snippet input(disabled)}
                  <Input {disabled} type="hidden" required name="id" value={id} placeholder="ID" />
                {/snippet}
                {#snippet button(text)}
                  <Button>{text}</Button>
                {/snippet}
              </Form>
              <Form actionUrl={FormActionMap.DELETE} formType={FormTypeMap.DELETE}>
                {#snippet input(disabled)}
                  <Input {disabled} type="hidden" required name="id" value={id} placeholder="ID" />
                {/snippet}
                {#snippet button(text)}
                  <Button>{text}</Button>
                {/snippet}
              </Form>
            </div>
          </li>
        {/if}
      {:else}
        <p>Do something!</p>
      {/each}
    </ul>
  </div>

  <Form actionUrl={FormActionMap.CREATE} formType={FormTypeMap.CREATE}>
    {#snippet input(disabled)}
      <Input {disabled} required name="title" placeholder="Title" />
    {/snippet}
    {#snippet button(text)}
      <Button>{text}</Button>
    {/snippet}
  </Form>
</section>

<style>
  .todo {
    display: grid;
    grid-template-columns: 1fr 400px;
    grid-template-rows: 1fr auto;
    gap: 14px;
    padding: 12px;
    border-radius: 14px;
    background-color: #e9e8e8;
  }

  .todo__container {
    min-height: 190px;
    padding: 12px;
    border: 1px solid darkgray;
    border-radius: inherit;
  }

  .todo__container--completed {
    grid-row: 2 / 3;
  }

  .todo__list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .todo__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .todo__buttons {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
</style>
