<script lang="ts">
  import './page.css';
  import { onMount } from 'svelte';
  import LoginForm from '$lib/components/forms/login-form/LoginForm.svelte';
  import Header from '$lib/components/header/Header.svelte';
  import LangSwitcher from '$lib/components/lang-switcher/LangSwitcher.svelte';
  import Link from '$lib/components/link/Link.svelte';
  import Logo from '$lib/components/logo/Logo.svelte';
  import { AppRoute } from '$lib/constants/common';
  import { m } from '$lib/paraglide/messages';

  let isLoginFormVisible = $state(false);
  const handleLoginButtonClick = () => {
    isLoginFormVisible = !isLoginFormVisible;
  };

  const slogan = $state({
    mainStart: '',
    highlightedText: '',
    mainEnd: '',
  });

  const createSlogan = () => {
    const rawSlogan = m.login_slogan_1();
    const startIndex = rawSlogan.indexOf('$');
    const endIndex = rawSlogan.lastIndexOf('$') + 1;
    const start = rawSlogan.slice(0, startIndex);
    const middle = rawSlogan.slice(startIndex, endIndex).replace(/\$/g, '');
    const end = rawSlogan.slice(endIndex);

    slogan.mainStart = start;
    slogan.highlightedText = middle;
    slogan.mainEnd = end;
  };

  onMount(() => {
    createSlogan();
  });
</script>

<Header className="login-header">
  <LangSwitcher />
</Header>
<section class="login">
  <Logo className="login__greet-logo" />
  {#if !isLoginFormVisible}
    <!-- TODO Move to separate component -->
    <div class="login__greet">
      <p class="login__greet-text">
        {slogan.mainStart}
        <span class="login__greet-text login__greet-text--highlight"> {slogan.highlightedText}</span>
        {slogan.mainEnd}
      </p>
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
