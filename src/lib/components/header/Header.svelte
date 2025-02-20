<script lang="ts">
  import { getAppState } from '$lib/store/store.svelte';
  import type { HeaderNavItem } from '$lib/types/navigation';
  import Link from '../link/Link.svelte';

  type HeaderProps = {
    navItems?: HeaderNavItem[];
    className?: string;
  };

  const appState = getAppState();
  const { className }: HeaderProps = $props();
</script>

<header class="header {className}">
  <nav class="header__nav">
    {#each appState.state.navItems as { href, title }}
      <Link className="header__link" {href}>{title}</Link>
    {/each}
  </nav>
</header>

<style>
  .header {
    padding: var(--padding-d);
    color: #ffffff;
    background-color: violet;
  }

  .header__nav {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  /* :global(.header .header__link) {
		&:hover {
			color: violet;
		}
	} */
</style>
