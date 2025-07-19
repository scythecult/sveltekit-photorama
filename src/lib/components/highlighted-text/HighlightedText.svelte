<script lang="ts">
  import './styles.css';
  import { onMount } from 'svelte';
  import { dividePhrase } from '$lib/utils/common';

  type HighlightedTextProps = {
    phrase: string;
    className?: string;
  };

  const { phrase, className }: HighlightedTextProps = $props();
  const classNameFinal = [className, 'highlighted-text'];
  let dividedPhrase = $state({ start: '', middle: '', end: '' });

  onMount(() => {
    dividedPhrase = dividePhrase(phrase);
  });
</script>

<div class={classNameFinal}>
  {dividedPhrase.start}
  <span class="highlighted-text highlighted-text--colored"> {dividedPhrase.middle}</span>
  {dividedPhrase.end}
</div>
