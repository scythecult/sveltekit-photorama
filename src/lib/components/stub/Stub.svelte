<script lang="ts">
  import './styles.css';
  import type { Snippet } from 'svelte';

  type StubProps = {
    children: Snippet;
    className?: string;
  };

  const { className = '', children }: StubProps = $props();
</script>

<div class={[className, 'stub']}>
  {@render children()}
</div>
