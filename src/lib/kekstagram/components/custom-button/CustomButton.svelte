<script lang="ts">
  import { CustomComponentType, type CustomComponentTypeValue } from '$lib/constants/kekstagram';
  import type { Snippet } from 'svelte';

  const CustomButtonType = {
    [CustomComponentType.USER_ACTION]: 'user-action',
  };

  type CustomButtonProps = {
    children: Snippet;
    onclick?: () => void;
    type?: CustomComponentTypeValue;
    formaction?: string;
  };

  let disabled = $state(false);
  const { formaction, children, onclick, type = '' }: CustomButtonProps = $props();
  const className = CustomButtonType[type] || '';

  const handleOnClick = async (evt?: Event) => {
    disabled = !disabled;

    setTimeout(async () => {
      await onclick?.();
      disabled = !disabled;
    }, 1000);
  };
</script>

<button class="button {className}" onclick={handleOnClick} {disabled} {formaction}>{@render children()}</button>

<style>
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    border: none;
    background-color: transparent;
  }

  .button:active {
    opacity: 0.7;
  }

  :global(.user-action) {
    width: var(--width-button-user-action);
    height: var(--height-button-user-action);
  }
</style>
