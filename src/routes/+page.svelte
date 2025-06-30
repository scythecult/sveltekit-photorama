<script lang="ts">
  import './page.css';
  import LoginForm from '$lib/components/forms/login-form/LoginForm.svelte';
  import Header from '$lib/components/header/Header.svelte';
  import HighlightedText from '$lib/components/highlighted-text/HighlightedText.svelte';
  import LangSwitcher from '$lib/components/lang-switcher/LangSwitcher.svelte';
  import Link from '$lib/components/link/Link.svelte';
  import Logo from '$lib/components/logos/main-logo/Logo.svelte';
  import { AppPath, AppRoute } from '$lib/constants/app';
  import { m } from '$lib/paraglide/messages';
  import { getRandomInteger } from '$lib/utils/utils';

  const SloganMap: Record<string, string> = {
    1: m['login_page.slogan_1'](),
    2: m['login_page.slogan_2'](),
    3: m['login_page.slogan_3'](),
  };

  let isLoginFormVisible = $state(false);

  const handleLoginButtonClick = () => {
    isLoginFormVisible = !isLoginFormVisible;
  };

  const getRawSlogan = () => {
    const randomIndex = getRandomInteger(1, 3);

    return SloganMap[randomIndex];
  };
</script>

<Header className="login-header">
  <LangSwitcher />
</Header>
<section class="login">
  <Logo className="login__greet-logo" />
  {#if !isLoginFormVisible}
    <div class="login__greet">
      <HighlightedText phrase={getRawSlogan()} />
      <p class="login__actions">
        <button class="login__action-button plain-button" onclick={handleLoginButtonClick} type="button"
          >{m['input.button_login']()}</button
        >
        {m['common.or']()}
        <!-- TODO Detect we are on mobile or not -->
        <Link className="login__action-button plain-button" href={`${AppRoute.SIGNUP}${AppPath.EMAIL}`}
          >{m['input.button_register']()}</Link
        >
      </p>
    </div>
  {:else}
    <div class="login__form">
      <LoginForm />
      <p class="login-form__register">
        {m['signup_page.welcome_text']()}
        <Link className="plain-button" href={`${AppRoute.SIGNUP}${AppPath.EMAIL}`}>{m['input.button_register']()}</Link>
      </p>
    </div>
  {/if}
</section>
