<script lang="ts">
  import './layout.css';
  import { page } from '$app/state';
  import Navbar from '$lib/components/nav-bar/Navbar.svelte';
  import { locales, localizeHref } from '$lib/paraglide/runtime';

  const { children } = $props();
</script>

<!-- Root Layout -->
<main class="layout">
  {@render children()}
  <Navbar />
</main>

<!-- Paraglide -->
<div style="display:none">
  {#each locales as locale (locale)}
    <a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
  {/each}
</div>
