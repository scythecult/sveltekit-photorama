<script lang="ts">
  import { page } from '$app/state';
  import Link from '$lib/components/link/Link.svelte';
  import { AppRoute } from '$lib/constants/common';
</script>

<h2>{page.status} {page.error?.message} !</h2>

<Link href={AppRoute.ROOT}>Go Home</Link>
