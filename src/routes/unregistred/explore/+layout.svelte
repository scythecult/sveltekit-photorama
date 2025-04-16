<script lang="ts">
  import './styles.css';
  import Header from '$lib/components/header/Header.svelte';
  import Link from '$lib/components/link/Link.svelte';
  import Logo from '$lib/components/logos/main-logo/Logo.svelte';
  import { AppRoute } from '$lib/constants/url';
  import { m } from '$lib/paraglide/messages';

  const { children } = $props();
</script>

<Header className="explore-header">
  <Logo />
  <nav class="explore-header__nav">
    <Link className="plain-button" href={AppRoute.ROOT}>{m.login_button_login()}</Link>
    <Link className="primary-button" href={AppRoute.SIGNUP}>{m.page_register_title()}</Link>
  </nav>
</Header>

<section class="explore-showcase">
  {@render children()}
</section>
