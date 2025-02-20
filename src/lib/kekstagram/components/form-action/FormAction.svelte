<script lang="ts">
  import type { SubmitFunction } from '@sveltejs/kit';
  import type { Snippet } from 'svelte';
  import { enhance } from '$app/forms';

  type FormActionProps = {
    actionSegment: string;
    onSubmit?: () => void;
    name: string;
    value: string;
    children: Snippet;
  };

  const { actionSegment, name, value, children, onSubmit }: FormActionProps = $props();

  const handleSubmit: SubmitFunction = async () => {
    onSubmit?.();

    return async ({ update }) => {
      await update();
    };
  };
</script>

<form action="?/{actionSegment}" method="POST" use:enhance={handleSubmit}>
  <button class="button user-action-button" type="submit">
    {@render children()}
  </button>
  <input type="hidden" {name} {value} />
</form>
