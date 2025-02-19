<script lang="ts">
  import { enhance } from '$app/forms';
  import type { FormActionMapValue, FormTypeMapValue } from '$lib/constants/form';
  import type { Snippet } from 'svelte';

  const Intl = {
    create: { loadingText: 'Adding...', buttonText: 'Add +' },
    update: { loadingText: 'Updating...', buttonText: 'Update' },
    delete: { loadingText: 'Deleteing...', buttonText: 'Delete -' },
    complete: { loadingText: 'Completing...', buttonText: 'Complete' },
    uncomplete: { loadingText: 'Uncompleting...', buttonText: 'Uncomplete' },
  };

  type FormProps = {
    actionUrl: FormActionMapValue;
    formType: FormTypeMapValue;
    input: Snippet<[boolean]>;
    button: Snippet<[string]>;
  };

  const { actionUrl, formType, input, button }: FormProps = $props();
  const intlText = Intl[formType];
  const { loadingText, buttonText } = intlText;
  let pending = $state(false);
</script>

<form
  class="form"
  method="POST"
  action="?{actionUrl}"
  use:enhance={() => {
    pending = true;

    return async ({ update }) => {
      await update();

      pending = false;
    };
  }}
>
  {@render input(pending)}

  {#if pending}
    <p>{loadingText}</p>
  {:else}
    {@render button(buttonText)}
  {/if}
</form>

<style>
  .form {
    display: grid;
    grid-template-columns: 1fr;
    align-content: start;
    row-gap: 14px;
  }
</style>
