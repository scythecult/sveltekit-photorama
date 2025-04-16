<script lang="ts">
  import './styles.css';
  import { onMount } from 'svelte';
  import { dividePhrase } from '$lib/utils/utils';

  type HighlightedTextProps = {
    phrase: string;
  };

  const { phrase }: HighlightedTextProps = $props();
  let dividedPhrase = $state({ start: '', middle: '', end: '' });

  onMount(() => {
    dividedPhrase = dividePhrase(phrase);
  });
</script>

<div class="highlighted-text">
  {dividedPhrase.start}
  <span class="highlighted-text highlighted-text--colored"> {dividedPhrase.middle}</span>
  {dividedPhrase.end}
</div>
