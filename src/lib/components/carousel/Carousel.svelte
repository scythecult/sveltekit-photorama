<script lang="ts">
  import './styles.css';
  import type { Snippet } from 'svelte';

  type CarouselProps = {
    className?: string;
    children: Snippet;
  };

  const { className = '', children }: CarouselProps = $props();
  const classNameFinal = [className, 'carousel'];
</script>

<div class={classNameFinal}>
  {@render children()}
</div>
