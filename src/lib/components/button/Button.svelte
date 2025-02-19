<script lang="ts">
  import type { Snippet } from 'svelte';

  type ButtonProps = {
    className?: string;
    disabled?: boolean;
    onClick?: (evt: Event) => void;
    children: Snippet;
  };

  const { className = '', disabled, children, onClick }: ButtonProps = $props();
</script>

<button class="button {className}" onclick={onClick} {disabled}>{@render children()}</button>

<style>
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 12px;
    font-weight: 700;
    line-height: 1;
    color: #ffffff;
    border: 0;
    border-radius: 3em;
    background-color: tomato;
    cursor: pointer;

    &:active {
      background-color: red;
    }
  }
</style>
