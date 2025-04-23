<script lang="ts">
  import './styles.css';
  import { APP_LOCALES } from '$lib/constants/common';
  import { m } from '$lib/paraglide/messages';
  import { getLocale, setLocale } from '$lib/paraglide/runtime';

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
