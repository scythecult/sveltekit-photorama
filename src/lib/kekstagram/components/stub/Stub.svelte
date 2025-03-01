<script lang="ts">
  import type { Snippet } from 'svelte';

  type StubProps = {
    children: Snippet;
    className?: string;
  };

  const { className = '', children }: StubProps = $props();
</script>

<div class={['stub', className]}>
  {@render children()}
</div>

<style>
  .stub {
    font-size: 16px;
    text-align: center;
  }
</style>
