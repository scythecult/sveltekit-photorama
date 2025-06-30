<script lang="ts">
  // import { onMount } from 'svelte';
  import { userStore } from '$lib/store/userStore.svelte.js';

  const { children, data } = $props();

  // TODO: search
  // TODO: can be replaced by setContext
  // https://svelte.dev/docs/svelte/context
  // https://svelte.dev/docs/kit/state-management
  $effect(() => {
    if (data.userInfo) {
      // eslint-disable-next-line no-console
      console.log('user data has been loaded', data.userInfo);

      userStore.setUserInfo(data.userInfo);
    }
  });

  // onMount(() => {});
</script>

<!-- <Loader /> -->
{@render children()}
