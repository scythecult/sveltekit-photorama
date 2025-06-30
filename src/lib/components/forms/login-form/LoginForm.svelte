<script lang="ts">
  import './styles.css';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { MAX_NAME_LENGTH, MIN_PASSWORD_LENGTH } from '$lib/components/inputs/constants';
  import Input from '$lib/components/inputs/Input.svelte';
  import Link from '$lib/components/link/Link.svelte';
  import { FormActionName } from '$lib/constants/action';
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

<!-- TODO Refactor replace to common form -->
<form
  class={classNameFinal}
  action="?/{FormActionName.LOGIN}"
  autocomplete="off"
  method="POST"
  use:enhance={handleLoginFormSubmit}
>
  <Input
    name="username"
    type="text"
    placeholder={m['input.user_placeholder']()}
    maxlength={MAX_NAME_LENGTH}
    onInput={handleUsernameInput}
    isError={!isUsernameValid}
    errorMessage={m['input.common_user_error']({ field: 'имя' })}
    userValue={usernameValue}
  />

  <Input
    name="password"
    type="password"
    placeholder={m['input.password_placeholder']()}
    minlength={MIN_PASSWORD_LENGTH}
    onInput={handlePasswordInput}
    isError={!isPasswordValid}
    errorMessage={m['input.password_error']({ count: MIN_PASSWORD_LENGTH })}
    userValue={passwordValue}
  />

  <Link className="login-form__link plain-button" href={AppRoute.RESET_PASSWORD}>{m['input.password_reset']()}</Link>
  <button class="primary-button" type="submit" disabled={isSubmitButtonDisabled}>{m['input.button_login']()}</button>
</form>
