<script lang="ts">
  import type { Snippet } from 'svelte';
  import { CustomComponentType } from '$lib/constants/kekstagram';

  const CustomLinkType = {
    [CustomComponentType.HASHTAG]: 'hashtag',
    [CustomComponentType.USER_NAME]: 'user-name',
  };

  type CustomLinkProps = {
    href: string;
    type?: string;
    children?: Snippet;
    target?: string;
  };

  const { href, children, type = '', target = '_top' }: CustomLinkProps = $props();
  const className = CustomLinkType[type] || '';
</script>

<a class="link {className}" {href} {target} rel="noopener noreferrer">{@render children?.()}</a>

<style>
  .link {
    color: inherit;
    text-decoration: none;
    overflow-wrap: anywhere;
    text-wrap: balance;
  }

  :global(.user-name) {
    font-weight: 700;
  }

  :global(.hashtag) {
    color: var(--text-link-hashtag);
  }
</style>
