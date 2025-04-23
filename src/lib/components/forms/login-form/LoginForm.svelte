<script lang="ts">
  import './styles.css';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { MAX_NAME_LENGTH, MIN_PASSWORD_LENGTH } from '$lib/components/input/constants';
  import Input from '$lib/components/input/Input.svelte';
  import Link from '$lib/components/link/Link.svelte';
  import { ActionMap } from '$lib/constants/action';
  import { AppRoute } from '$lib/constants/app';
  import { m } from '$lib/paraglide/messages';

  let usernameValue = $state('');
  let passwordValue = $state('');
  let isUsernameValid = $state(true);
  let isPasswordValid = $state(true);
  let isFormDisabled = $state(false);
  const isSubmitButtonDisabled = $derived(
    isFormDisabled || !usernameValue.length || !isUsernameValid || !passwordValue.length || !isPasswordValid,
  );

  const handleUsernameInput = (value: string) => {
    isUsernameValid = value.length < MAX_NAME_LENGTH;

    if (isUsernameValid) {
      usernameValue = value;
    }
  };

  const handlePasswordInput = (value: string) => {
    isPasswordValid = value.length > MIN_PASSWORD_LENGTH;

    if (isPasswordValid) {
      passwordValue = value;
    }
  };

  const handleLoginFormSubmit: SubmitFunction = () => {
    isFormDisabled = true;

    return async ({ update }) => {
      isFormDisabled = false;

      await update();

      goto(AppRoute.ROOT);
    };
  };

  const classNameFinal = $derived(['login-form', isFormDisabled && 'login-form--disabled']);
</script>

<form
  class={classNameFinal}
  action="?/{ActionMap.LOGIN}"
  autocomplete="off"
  method="POST"
  use:enhance={handleLoginFormSubmit}
>
  <Input
    name="username"
    type="text"
    placeholder={m.login_user_placeholder()}
    maxlength={MAX_NAME_LENGTH}
    onInput={handleUsernameInput}
    isError={!isUsernameValid}
    errorMessage={m.common_user_error({ field: 'имя' })}
    userValue={usernameValue}
  />

  <Input
    name="password"
    type="password"
    placeholder={m.login_password_placeholder()}
    minlength={MIN_PASSWORD_LENGTH}
    onInput={handlePasswordInput}
    isError={!isPasswordValid}
    errorMessage={m.login_password_error({ value: MIN_PASSWORD_LENGTH })}
    userValue={passwordValue}
  />

  <Link className="login-form__link plain-button" href={AppRoute.RESET_PASSWORD}>{m.login_password_reset()}</Link>
  <button class="primary-button" type="submit" disabled={isSubmitButtonDisabled}>{m.login_button_login()}</button>

  <p class="login-form__register">
    {m.signup_welcome_text()}
    <Link className="plain-button" href={AppRoute.SIGNUP}>{m.signup_button_register()}</Link>
  </p>
</form>
