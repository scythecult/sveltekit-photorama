<script lang="ts">
  import './styles.css';
  import { m } from '$lib/paraglide/messages';
  import { getLocale, setLocale } from '$lib/paraglide/runtime';

  // TODO Check inlang docks for automatic locale detection
  const APP_LOCALES = [
    { value: 'ru', text: 'Русский' },
    { value: 'en', text: 'English' },
  ];

  let selected = $state(getLocale());

  const handleLangSwitcherChange = () => setLocale(selected);
</script>

<select
  class="lang-switcher"
  onchange={handleLangSwitcherChange}
  bind:value={selected}
  name="lang"
  aria-label={m.aria_lang()}
>
  {#each APP_LOCALES as { value, text } (value)}
    <option {value}>{text}</option>
  {/each}
</select>
