<script lang="ts">
  import './page.css';
  import LoginForm from '$lib/components/forms/login-form/LoginForm.svelte';
  import Greet from '$lib/components/greet/Greet.svelte';
  import Header from '$lib/components/header/Header.svelte';
  import LangSwitcher from '$lib/components/lang-switcher/LangSwitcher.svelte';
  import Link from '$lib/components/link/Link.svelte';
  import Logo from '$lib/components/logo/Logo.svelte';
  import { AppRoute } from '$lib/constants/url';
  import { m } from '$lib/paraglide/messages';

  let isLoginFormVisible = $state(false);

  const handleLoginButtonClick = () => {
    isLoginFormVisible = !isLoginFormVisible;
  };
</script>

<Header className="login-header">
  <LangSwitcher />
</Header>
<section class="login">
  <Logo className="login__greet-logo" />
  {#if !isLoginFormVisible}
    <div class="login__greet">
      <Greet />
      <p class="login__actions">
        <button class="login__login-button" onclick={handleLoginButtonClick} type="button"
          >{m.login_button_login()}</button
        >
        {m.login_or()}
        <Link className="login__register-link" href={AppRoute.SIGNUP}>{m.signup_button_register()}</Link>
      </p>
    </div>
  {:else}
    <div class="login__form">
      <LoginForm />
    </div>
  {/if}
</section>
