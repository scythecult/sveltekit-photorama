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
    --theme-bg-dark: #28292a;
    /* слишком яркое изображение дискомфортно для глаз */
    /* вызывает эффект свечения и растекания по тёмному фону */
    /* по этому 250 */
    --theme-bg-light: rgb(250, 250, 250);
    --blur-bg-amount: 2px;
    --theme-text-dark: rgb(250, 250, 250);
    --theme-text-light: #000000;
    --link-text-hashtag: #55d5ff;
    --app-color-red: red;
    --app-color-gray: #b3b3b3;
    --kekstagram-bg-main: transparent;
    /* metrics */
    --app-layout-padding-d: 0 14px;
    --app-common-padding-d: 12px 12px 16px;
    --app-micro-layout-gap: 6px;
    --action-button-size-mobile: 20px;
    --action-button-size-tablet: 44px;

    --user-action-button-width: var(--action-button-size-mobile);
    --user-action-button-height: var(--action-button-size-mobile);

    /* font */
    --app-font-size: 12px;

    /* transitions */
    --transition-duration: 0.3s;
  }

  .layout {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: max-content 1fr max-content;
    row-gap: 14px;
    min-height: 100dvh;
    padding: var(--app-layout-padding-d);
    font-family: sans-serif;
    background-color: var(--theme-bg-light);
    transition-property: background-color, color;
    transition-duration: var(--transition-duration);

    @media (prefers-color-scheme: dark) {
      color: var(--theme-text-dark);
      background-color: var(--theme-bg-dark);
    }
  }

  .kekstagram {
    :global(.header) {
      background-color: var(--kekstagram-bg-main);
    }

    :global(.link) {
      font-size: var(--app-font-size);
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
      background-color: var(--kekstagram-bg-main);
    }
  }

  .main {
    padding: var(--app-common-padding-d);
    background-color: lightgreen;
  }
</style>
