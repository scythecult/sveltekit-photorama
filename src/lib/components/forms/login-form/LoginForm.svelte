<script lang="ts">
  import './styles.css';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { MAX_NAME_LENGTH, MIN_PASSWORD_LENGTH } from '$lib/components/input/constants';
  import Input from '$lib/components/input/Input.svelte';
  import Link from '$lib/components/link/Link.svelte';
  import { ActionMap } from '$lib/constants/action';
  import { AppRoute } from '$lib/constants/common';

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
    placeholder="Phone, username of&nbsp;email"
    maxlength={MAX_NAME_LENGTH}
    onInput={handleUsernameInput}
    isError={!isUsernameValid}
    errorMessage="Pease enter name in&nbsp;correct format"
  />

  <Input
    name="password"
    type="password"
    placeholder="Password"
    minlength={MIN_PASSWORD_LENGTH}
    onInput={handlePasswordInput}
    isError={!isPasswordValid}
    errorMessage={`Password should contain at&nbsp;least ${MIN_PASSWORD_LENGTH} characters`}
  />

  <Link className="login-form__link" href={AppRoute.RESET_PASSWORD}>Forgot password?</Link>
  <button class="login-form__submit" type="submit" disabled={isSubmitButtonDisabled}>Login</button>

  <p class="login-form__register">
    Don&rsquo;t have an&nbsp;account? <Link className="login-form__link login-form__link--bold" href={AppRoute.SIGNUP}
      >Register</Link
    >
  </p>
</form>
