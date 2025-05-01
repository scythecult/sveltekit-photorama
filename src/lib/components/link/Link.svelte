<script lang="ts">
  import './styles.css';
  import { onMount, type Snippet } from 'svelte';
  import { afterNavigate, goto } from '$app/navigation';
  import { QUERY_REGEXP } from '../buttons/constants';

  type LinkProps = {
    href: string;
    target?: string;
    onClick?: (evt: MouseEvent) => void;
    children: Snippet;
    className?: ((isActive: boolean) => string | string[]) | string;
  };

  const { href, children, target = '_top', className, onClick }: LinkProps = $props();
  let isActive = $state(false);

  afterNavigate(() => {
    isActive = location.pathname === href.replace(QUERY_REGEXP, '');
  });

  onMount(() => {
    isActive = location.pathname === href.replace(QUERY_REGEXP, '');
  });

  const handleLinkClick = async (evt: MouseEvent) => {
    evt.preventDefault();

    onClick?.(evt);

    await goto(href, { keepFocus: true });
  };
</script>

<a
  class={['link', typeof className === 'string' ? className : className?.(isActive)]}
  {href}
  {target}
  onclick={handleLinkClick}>{@render children()}</a
>
