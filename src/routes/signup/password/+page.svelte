<script lang="ts">
  import type { SubmitFunction } from '@sveltejs/kit';
  import { HTTPMethod } from 'http-method-enum';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import SignupForm from '$lib/components/forms/signup-form/SignupForm.svelte';
  import { MIN_PASSWORD_LENGTH, PASSWORD_REGEXP } from '$lib/components/inputs/constants';
  import Input from '$lib/components/inputs/Input.svelte';
  import Tooltip from '$lib/components/tooltip/Tooltip.svelte';
  import { FormActionName, InputName } from '$lib/constants/action';
  import { AppRoute } from '$lib/constants/app';
  import { m } from '$lib/paraglide/messages';
  import { SignupSessionResource } from '$lib/resources/SignupSessionResource';
  import { signupStore } from '$lib/store/signupStore.svelte';

  const passwordState = $state({
    value: '',
    isValid: true,
  });

  const isSubmitButtonDisabled = $derived(!passwordState.value || !passwordState.isValid);
  const signupSessionResource = new SignupSessionResource();

  onMount(() => {
    passwordState.value = signupSessionResource.loadPassword();
  });

  const handlePasswordInput = (value: string) => {
    passwordState.value = value;
    passwordState.isValid = PASSWORD_REGEXP.test(passwordState.value);
  };

  const handlePasswordFormSubmit: SubmitFunction = () => {
    return async ({ update }) => {
      await update();

      passwordState.isValid = true;
      signupStore.setProperty(InputName.PASSWORD, passwordState.value);
      signupSessionResource.savePassword(passwordState.value);

      goto(`${AppRoute.SIGNUP}${AppRoute.BIRTHDATE}`);
    };
  };
</script>

{#snippet tooltip()}
  <Tooltip>{m['tooltip.password']({ count: MIN_PASSWORD_LENGTH })}</Tooltip>
{/snippet}

<SignupForm
  title={m['signup_page.password_title']()}
  action="?/{FormActionName.SIGNUP_PASSWORD}"
  method={HTTPMethod.POST}
  onSubmit={handlePasswordFormSubmit}
  {isSubmitButtonDisabled}
>
  <Input
    name={InputName.PASSWORD}
    type="password"
    placeholder={m['input.password_placeholder']()}
    onInput={handlePasswordInput}
    isError={!passwordState.isValid}
    userValue={passwordState.value}
    errorMessage={m['input.password_error']({ count: MIN_PASSWORD_LENGTH })}
    slotB={tooltip}
  />
</SignupForm>
