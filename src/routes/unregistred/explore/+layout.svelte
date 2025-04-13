<script lang="ts">
  import './styles.css';
  import UnregistredHeader from '$lib/components/headers/unregistred-header/UnregistredHeader.svelte';

  const { children } = $props();
</script>

<!-- header -->
<UnregistredHeader />
<section class="explore-showcase">
  {@render children()}
</section>
