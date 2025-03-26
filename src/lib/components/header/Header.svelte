<script lang="ts">
  import './styles.css';
  import type { Snippet } from 'svelte';

  type HeaderProps = {
    className?: string;
    children: Snippet;
  };

  const { className = '', children }: HeaderProps = $props();
  const classNameFinal = [className, 'header'];
</script>

<header class={classNameFinal}>
  {@render children()}
</header>
