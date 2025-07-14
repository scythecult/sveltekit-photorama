<script lang="ts">
  import './layout.css';
  import { page } from '$app/state';
  import Loader from '$lib/components/loaders/Loader.svelte';
  import Navbar from '$lib/components/nav-bar/Navbar.svelte';
  import { AppTitle } from '$lib/constants/app';
  import { StateContextName } from '$lib/constants/context.js';
  import { locales, localizeHref } from '$lib/paraglide/runtime';
  import { createAppState } from '$lib/state/appState.svelte';
  import { createModalState } from '$lib/state/modalState.svelte';
  import { setStateContext } from '$lib/utils/context.js';

  const { children, data } = $props();
  const appState = $state(createAppState());
  const publicationsModalState = $state(createModalState());
  const profilePageModalState = $state(createModalState());

  // Set all necessary data/state in root layout to access it from anywhere
  setStateContext(StateContextName.USER, () => data.userInfo);
  setStateContext(StateContextName.APP, () => appState);
  setStateContext(StateContextName.PUBLICATIONS_PAGE_MODAL, () => publicationsModalState);
  setStateContext(StateContextName.PROFILE_PAGE_MODAL, () => profilePageModalState);

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
