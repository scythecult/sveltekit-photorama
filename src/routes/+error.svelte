<script lang="ts">
  import './error.css';
  import Link from '$lib/components/link/Link.svelte';
  import { AppRoute } from '$lib/constants/app';
  import { m } from '$lib/paraglide/messages';
</script>

<section class="error">
  <h2 class="error__title">{m['not_found_page.title']()}</h2>
  <p class="error__description">
    {m['not_found_page.description']()}
    <Link className="error__link" href={AppRoute.ROOT}>{m['not_found_page.link']()}</Link>
  </p>
</section>
