<script lang="ts">
  import { ParaglideJS } from '@inlang/paraglide-sveltekit';
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import Header from '$lib/components/header/Header.svelte';
  import { i18n } from '$lib/i18n';
  import { getAppState } from '$lib/store/store.svelte';

  const { data, children } = $props();
  const appState = getAppState();

  onMount(() => {
    //   appState.update((state) => ({ ...state, navItems: data.navItems }));
    appState.setNavItems(data.navItems);
  });
  // setContext(APP_STATE_NAME, appState);
</script>

<!-- Общий компонент, который включает в себя компонент +page.svelte на текущем уровне вложенности -->
<!-- ...то же самое верно и для компонентов в под-папках routes -->
<!-- Так же рядом могут находиться компоненты с запросами +layout.server.ts, которые делают запрос в момент загрузки текущей страницы -->
<ParaglideJS {i18n}>
  <div class="layout" class:kekstagram={page.url.pathname === '/kekstagram'}>
    <Header className="layout__header" />

    <main class="main">
      {@render children()}
    </main>
  </div>
</ParaglideJS>

<style>
  :root {
    /* colors */
    --bg-theme-dark: #28292a;
    /* слишком яркое изображение дискомфортно для глаз */
    /* вызывает эффект свечения и растекания по тёмному фону */
    /* по этому 250 */
    --bg-theme-light: rgb(250, 250, 250);
    --bg-kekstagram: transparent;
    --bg-blur-amount: 2px;
    --text-theme-dark: rgb(250, 250, 250);
    --text-theme-light: #000000;
    --text-link-hashtag: #55d5ff;
    --color-main-red: red;

    /* metrics */
    --padding-layout-d: 0 14px;
    --padding-d: 12px 12px 16px;

    --size-button-action-mobile: 20px;
    --size-button-action-tablet: 44px;

    --width-button-user-action: var(--size-button-action-mobile);
    --height-button-user-action: var(--size-button-action-mobile);

    /* transitions */
    --transition-duration: 0.3s;
  }

  /* :global(.layout .layout__header) {
		background-color: black;
	} */

  .layout {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: max-content 1fr max-content;
    row-gap: 14px;
    min-height: 100dvh;
    padding: var(--padding-layout-d);
    font-family: sans-serif;
    background-color: var(--bg-theme-light);
    transition-property: background-color, color;
    transition-duration: var(--transition-duration);

    @media (prefers-color-scheme: dark) {
      color: var(--text-theme-dark);
      background-color: var(--bg-theme-dark);
    }
  }

  .kekstagram {
    :global(.header) {
      background-color: var(--bg-kekstagram);
    }

    :global(.link) {
      color: inherit;
      text-decoration: none;
      overflow-wrap: anywhere;
      text-wrap: balance;
    }

    :global(.button) {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      border: none;
      background-color: transparent;
    }

    :global(.button:active) {
      opacity: 0.7;
    }

    .main {
      display: grid;
      grid-template-columns: 100%;
      grid-auto-rows: max-content;
      row-gap: 14px;
      background-color: var(--bg-kekstagram);
    }
  }

  .main {
    padding: var(--padding-d);
    background-color: lightgreen;
  }
</style>
