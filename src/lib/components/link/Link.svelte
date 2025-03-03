<script lang="ts">
  import type { Snippet } from 'svelte';

  type LinkProps = {
    className?: string;
    href: string;
    children: Snippet;
  };

  const { className = '', href, children }: LinkProps = $props();
</script>

<a class="link {className}" {href}>{@render children()}</a>

<style>
  .link {
    color: var(--theme-text-light);
    text-decoration: none;

    @media (prefers-color-scheme: dark) {
      color: var(--theme-text-dark);
    }

    &:hover {
      color: #000000;
      text-decoration: underline;

      @media (prefers-color-scheme: dark) {
        color: var(--theme-text-dark);
      }
    }
  }
</style>
