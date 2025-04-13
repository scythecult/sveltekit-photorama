<script lang="ts">
  import './styles.css';
  import { createSlogan } from '$lib/utils/utils';

  type HighlightedTextProps = {
    phrase: string;
  };

  const { phrase }: HighlightedTextProps = $props();
  const slogan = $state(createSlogan(phrase));
</script>

<div class="highlighted-text">
  {slogan.start}
  <span class="highlighted-text highlighted-text--highlight"> {slogan.middle}</span>
  {slogan.end}
</div>
