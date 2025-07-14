<script lang="ts">
  import './page.css';
  import Header from '$lib/components/header/Header.svelte';
  import LangSwitcher from '$lib/components/lang-switcher/LangSwitcher.svelte';
  import Link from '$lib/components/link/Link.svelte';
  import Logo from '$lib/components/logos/main-logo/Logo.svelte';
  import Slogan from '$lib/components/slogan/Slogan.svelte';
  import { AppPath, AppRoute } from '$lib/constants/app';
  import { m } from '$lib/paraglide/messages';
</script>

<!-- TODO Detect we are on mobile or not -->
<!-- Then add query params such as ?mobile/?email -->

<Header className="start-page-header">
  <LangSwitcher />
</Header>
<section class="start-page">
  <Logo className="start-page__logo" />
  <div class="start-page__greet">
    <Slogan className="start-page__slogan" />
    <p class="start-page__actions">
      <Link className="start-page__action-button plain-button" href={`${AppRoute.LOGIN}`}
        >{m['input.button_login']()}</Link
      >
      {m['common.or']()}
      <Link className="start-page__action-button plain-button" href={`${AppRoute.SIGNUP}${AppPath.EMAIL}`}
        >{m['input.button_register']()}</Link
      >
    </p>
  </div>
</section>
