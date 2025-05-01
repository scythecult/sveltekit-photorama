<script lang="ts">
  import Link from '$lib/components/link/Link.svelte';
  import { userStore } from '$lib/store/userStore.svelte';

  const { name } = $derived(userStore.getUserInfo());
</script>

<Link href={`/${name}`}>Back Arrow</Link>
<p>settings page</p>
