<script lang="ts">
  import './styles.css';
  import LoginForm from '$lib/components/forms/login-form/LoginForm.svelte';
  import Header from '$lib/components/header/Header.svelte';
  import LangSwitcher from '$lib/components/lang-switcher/LangSwitcher.svelte';
  import Link from '$lib/components/link/Link.svelte';
  import Logo from '$lib/components/logo/Logo.svelte';
  import { AppRoute } from '$lib/constants/common';

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
      <p class="login__greet-text">
        <!-- Делитесь интересными моментами с теми, кто вас понимает -->
        Register to&nbsp;see <span class="login__greet-text login__greet-text--highlight">life moments</span> of&nbsp;your
        friends
      </p>
      <p class="login__actions">
        <button class="login__login-button" onclick={handleLoginButtonClick} type="button">Login</button>
        or
        <Link className="login__register-link" href={AppRoute.SIGNUP}>register</Link>
      </p>
    </div>
  {:else}
    <div class="login__form">
      <LoginForm />
    </div>
  {/if}
</section>
