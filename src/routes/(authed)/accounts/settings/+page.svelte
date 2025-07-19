<script lang="ts">
  import Link from '$lib/components/link/Link.svelte';
  import { StateContextName } from '$lib/constants/context';
  import type { UserInfo } from '$lib/types/user';
  import { getStateContext } from '$lib/utils/context';

  const userState = getStateContext<UserInfo>(StateContextName.USER);
  const { username } = $derived(userState());
</script>

<Link href={`/${username}`}>Back Arrow</Link>
<p>settings page</p>
