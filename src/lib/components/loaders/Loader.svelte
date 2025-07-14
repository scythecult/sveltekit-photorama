<script lang="ts">
  import './styles.css';
  import { navigating } from '$app/state';

  type LoaderProps = {
    loadingType?: typeof navigating.type;
  };

  const { loadingType = 'goto' }: LoaderProps = $props();
</script>

{#if navigating.type === loadingType}
  <div class="progress"></div>
{/if}
