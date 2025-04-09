<script lang="ts">
  import Loader from '$lib/components/loader/Loader.svelte';

  const { children } = $props();
</script>

<Loader />
{@render children()}
