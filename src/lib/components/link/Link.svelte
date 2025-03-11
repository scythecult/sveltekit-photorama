<script lang="ts">
  import './styles.css';
  import type { Snippet } from 'svelte';
  import { afterNavigate, goto } from '$app/navigation';

  type LinkProps = {
    href: string;
    target?: string;
    children: Snippet;
    className?: ((isActive: boolean) => string | string[]) | string;
  };

  const { href, children, target = '_top', className }: LinkProps = $props();
  let isActive = $state(false);

  afterNavigate(() => {
    isActive = location.pathname === href.replace(/\?.+/g, '');
  });

  $effect(() => {
    isActive = location.pathname === href.replace(/\?.+/g, '');
  });

  const handleLinkClick = async (evt: MouseEvent) => {
    evt.preventDefault();

    await goto(href);
  };
</script>

<a
  class={['link', typeof className === 'string' ? className : className?.(isActive)]}
  {href}
  {target}
  onclick={handleLinkClick}>{@render children()}</a
>
