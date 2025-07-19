<script lang="ts">
  import './styles.css';
  import { page } from '$app/state';
  import { IconName } from '$lib/components/custom-icon/constants';
  import CustomIcon from '$lib/components/custom-icon/CustomIcon.svelte';
  import Header from '$lib/components/header/Header.svelte';
  import LangSwitcher from '$lib/components/lang-switcher/LangSwitcher.svelte';
  import Link from '$lib/components/link/Link.svelte';
  import Loader from '$lib/components/loaders/Loader.svelte';
  import { AppRoute } from '$lib/constants/app';
  import { m } from '$lib/paraglide/messages';

  const { children } = $props();
  const isRegisterLinkVisible = $derived(!page.url.pathname.includes(AppRoute.CONFIRM));
</script>

<Loader loadingType="goto" />

<Header className="signup-header">
  <nav class="signup-nav">
    <Link className="signup-nav__back-link" href={AppRoute.ROOT}>
      <CustomIcon iconName={IconName.ARROW} />
    </Link>
    <h2 class="signup-nav__title">{m['register_page.title']()}</h2>
  </nav>
  <LangSwitcher />
</Header>

<section class="signup">
  <div class="signup__form">
    {@render children()}
  </div>
  {#if isRegisterLinkVisible}
    <Link className="signup__already-register-link plain-button" href={AppRoute.LOGIN}
      >{m['signup_page.already_register_link']()}</Link
    >
  {/if}
</section>
