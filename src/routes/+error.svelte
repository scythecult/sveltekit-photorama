<script lang="ts">
  import './error.css';
  import Link from '$lib/components/link/Link.svelte';
  import { AppRoute } from '$lib/constants/app';
  import { m } from '$lib/paraglide/messages';
  // import { page } from '$app/state';
  // TODO Refactor - add custom error messages and render them
</script>

<section class="error">
  <!-- {page.error?.message} -->
  <h2 class="error__title">{m['not_found_page.title']()}</h2>
  <p class="error__description">
    {m['not_found_page.description']()}
    <Link className="error__link" href={AppRoute.ROOT}>{m['not_found_page.link']()}</Link>
  </p>
</section>
