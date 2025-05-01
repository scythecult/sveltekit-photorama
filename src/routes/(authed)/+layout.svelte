<script lang="ts">
  // import { onMount } from 'svelte';
  import Loader from '$lib/components/loader/Loader.svelte';
  import { userStore } from '$lib/store/userStore.svelte.js';

  const { children, data } = $props();

  // TODO: search
  $effect(() => {
    if (data.userInfo) {
      // eslint-disable-next-line no-console
      console.log('user data has been loaded', data.userInfo);

      userStore.setUserInfo(data.userInfo);
    }
  });

  // onMount(() => {});
</script>

<Loader />
{@render children()}
