<script lang="ts">
  import './styles.css';
  import { ParaglideJS } from '@inlang/paraglide-sveltekit';
  import Navbar from '$lib/components/nav-bar/Navbar.svelte';
  import { i18n } from '$lib/i18n';

  const { children } = $props();
</script>

<!-- Общий компонент, который включает в себя компонент +page.svelte на текущем уровне вложенности -->
<!-- ...то же самое верно и для компонентов в под-папках routes -->
<!-- Так же рядом могут находиться компоненты с запросами +layout.server.ts, которые делают запрос в момент загрузки текущей страницы -->
<ParaglideJS {i18n}>
  <div class="layout">
    <main class="main">
      {@render children()}
    </main>
    <Navbar />
  </div>
</ParaglideJS>
