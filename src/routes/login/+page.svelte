<script lang="ts">
  import './styles.css';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { HTTPMethod } from 'http-method-enum';
  import { goto } from '$app/navigation';
  import Form from '$lib/components/forms/form/Form.svelte';
  import Header from '$lib/components/header/Header.svelte';
  import { MIN_NAME_LENGTH, MIN_PASSWORD_LENGTH } from '$lib/components/inputs/constants';
  import Input from '$lib/components/inputs/Input.svelte';
  import LangSwitcher from '$lib/components/lang-switcher/LangSwitcher.svelte';
  import Link from '$lib/components/link/Link.svelte';
  import Logo from '$lib/components/logos/main-logo/Logo.svelte';
  import { FormActionName, InputName } from '$lib/constants/action';
  import { AppPath, AppRoute } from '$lib/constants/app';
  import { m } from '$lib/paraglide/messages';

  // TODO Remove validation, input data should be sent to server to validate user input and find the user.
  // TODO Mb should send request on input change and show checkmark on result.
  const loginState = $state({ username: '', password: '', isUsernameValid: true, isPasswordValid: true });
  const isSubmitButtonDisabled = $derived(
    !loginState.username.length ||
      !loginState.isUsernameValid ||
      !loginState.password.length ||
      !loginState.isPasswordValid,
  );

  const handleUsernameInput = (value: string) => {
    loginState.username = value;
    loginState.isUsernameValid = loginState.username.length > MIN_NAME_LENGTH;
  };

  const handlePasswordInput = (value: string) => {
    loginState.password = value;
    loginState.isPasswordValid = loginState.password.length > MIN_PASSWORD_LENGTH;
  };

  const handleLoginFormSubmit: SubmitFunction = () => {
    return async ({ update }) => {
      await update();

      goto(AppRoute.ROOT);
    };
  };
</script>

<Header className="login-header">
  <LangSwitcher />
</Header>
<section class="login">
  <Logo className="login__greet-logo" />

  <div class="login__form">
    <Form
      className="login-form"
      action="?/{FormActionName.LOGIN}"
      autocomplete="off"
      buttonText={m['input.button_login']()}
      method={HTTPMethod.POST}
      onSubmit={handleLoginFormSubmit}
      {isSubmitButtonDisabled}
    >
      <!-- TODO Replace to common text input, because user should send his email/phone to server to validate -->
      <Input
        name="username"
        type="text"
        placeholder={m['input.user_placeholder']()}
        onInput={handleUsernameInput}
        isError={!loginState.isUsernameValid}
        errorMessage={m['input.common_user_error']({ field: 'имя' })}
        userValue={loginState.username}
      />

      <!-- TODO Replace to common text input, because user should send his pass to server to validate -->
      <Input
        name={InputName.PASSWORD}
        type="password"
        placeholder={m['input.password_placeholder']()}
        onInput={handlePasswordInput}
        isError={!loginState.isPasswordValid}
        userValue={loginState.password}
        errorMessage={m['input.password_error']({ count: MIN_PASSWORD_LENGTH })}
      />

      <Link className="login-form__link plain-button" href={AppRoute.RESET_PASSWORD}>{m['input.password_reset']()}</Link
      >
    </Form>
    <p class="login-form__register">
      {m['signup_page.welcome_text']()}
      <Link className="plain-button" href={`${AppRoute.SIGNUP}${AppPath.EMAIL}`}>{m['input.button_register']()}</Link>
    </p>
  </div>
</section>
