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
    color: var(--text-theme-light);
    text-decoration: none;

    @media (prefers-color-scheme: dark) {
      color: var(--text-theme-dark);
    }

    &:hover {
      color: #000000;
      text-decoration: underline;

      @media (prefers-color-scheme: dark) {
        color: var(--text-theme-dark);
      }
    }
  }
</style>
