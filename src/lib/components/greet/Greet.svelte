<script lang="ts">
  import './styles.css';
  import { onMount } from 'svelte';
  import { m } from '$lib/paraglide/messages';
  import { getRandomInteger } from '$lib/utils/utils';

  const SloganMap: Record<string, string> = {
    1: m.login_slogan_1(),
    2: m.login_slogan_2(),
    3: m.login_slogan_3(),
  };

  const slogan = $state({
    mainStart: '',
    highlightedText: '',
    mainEnd: '',
  });

  const getRawSlogan = () => {
    const randomIndex = getRandomInteger(1, 3);

    return SloganMap[randomIndex];
  };

  const createSlogan = () => {
    const rawSlogan = getRawSlogan();
    const startIndex = rawSlogan.indexOf('$');
    const endIndex = rawSlogan.lastIndexOf('$') + 1;
    const start = rawSlogan.slice(0, startIndex);
    const middle = rawSlogan.slice(startIndex, endIndex).replace(/\$/g, '');
    const end = rawSlogan.slice(endIndex).trim();

    slogan.mainStart = start;
    slogan.highlightedText = middle;
    slogan.mainEnd = end;
  };

  onMount(() => {
    createSlogan();
  });
</script>

<div class="greet-text">
  {slogan.mainStart}
  <span class="lgreet-text greet-text--highlight"> {slogan.highlightedText}</span>
  {slogan.mainEnd}
</div>
