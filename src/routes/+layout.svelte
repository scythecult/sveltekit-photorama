<script lang="ts">
  import './layout.css';
  import { page } from '$app/state';
  import Loader from '$lib/components/loader/Loader.svelte';
  import Navbar from '$lib/components/nav-bar/Navbar.svelte';
  import { AppTitle } from '$lib/constants/app';
  import { locales, localizeHref } from '$lib/paraglide/runtime';

  const { children } = $props();
  const pageTitle = $derived(page.data.title || AppTitle.DEFAULT);
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>
<!-- Root Layout -->
<main class="layout">
  <Loader />
  {@render children()}
  <Navbar />
</main>

<!-- Paraglide -->
<div style="display:none">
  {#each locales as locale (locale)}
    <a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
  {/each}
</div>
