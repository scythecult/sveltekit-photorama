<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import { getRandomInteger } from '$lib/utils/common';
  import HighlightedText from '../highlighted-text/HighlightedText.svelte';

  type SloganProps = {
    className?: string;
  };

  const SloganMap: Record<string, string> = {
    1: m['login_page.slogan_1'](),
    2: m['login_page.slogan_2'](),
    3: m['login_page.slogan_3'](),
  };

  const getRawSlogan = () => {
    const randomIndex = getRandomInteger(1, 3);

    return SloganMap[randomIndex];
  };

  const { className = '' }: SloganProps = $props();
</script>

<HighlightedText {className} phrase={getRawSlogan()} />
