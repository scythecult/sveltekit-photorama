<script lang="ts">
  import './styles.css';
  import type { Snippet } from 'svelte';
  import { afterNavigate, goto } from '$app/navigation';
  import { QUERY_REGEXP } from '../buttons/constants';

  type LinkProps = {
    href: string;
    target?: string;
    children: Snippet;
    className?: ((isActive: boolean) => string | string[]) | string;
  };

  const { href, children, target = '_top', className }: LinkProps = $props();
  let isActive = $state(false);

  afterNavigate(() => {
    isActive = location.pathname === href.replace(QUERY_REGEXP, '');
  });

  $effect(() => {
    isActive = location.pathname === href.replace(QUERY_REGEXP, '');
  });

  const handleLinkClick = async (evt: MouseEvent) => {
    evt.preventDefault();

    await goto(href, { keepFocus: true });
  };
</script>

<a
  class={['link', typeof className === 'string' ? className : className?.(isActive)]}
  {href}
  {target}
  onclick={handleLinkClick}>{@render children()}</a
>
