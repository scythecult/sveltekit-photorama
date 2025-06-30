<script lang="ts">
  import Link from '$lib/components/link/Link.svelte';
  import { userStore } from '$lib/store/userStore.svelte';

  const { username } = $derived(userStore.getUserInfo());
</script>

<Link href={`/${username}`}>Back Arrow</Link>
<p>edit page</p>
