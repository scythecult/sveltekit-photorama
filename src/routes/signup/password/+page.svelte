<script lang="ts">
  import { HTTPMethod } from 'http-method-enum';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Form from '$lib/components/forms/form/Form.svelte';
  import Input from '$lib/components/inputs/Input.svelte';
  import Tooltip from '$lib/components/tooltip/Tooltip.svelte';
  import { FormActionName, InputName } from '$lib/constants/action';
  import { AppRoute } from '$lib/constants/app';
  import { MIN_PASSWORD_LENGTH } from '$lib/constants/validation';
  import { m } from '$lib/paraglide/messages';
  import { SignupSessionResource } from '$lib/resources/SignupSessionResource';
  import type { TypedSubmitFunction } from '$lib/types/actions';
  import { checkIsPasswordValid } from '$lib/utils/validation';

  const passwordState = $state({
    value: '',
    isValid: true,
    isServerError: false,
  });
  const isSubmitButtonDisabled = $derived(!passwordState.value || !passwordState.isValid);
  const errorMessage = $derived.by(() => {
    if (!passwordState.isValid) {
      return m['input.password_error']({ count: MIN_PASSWORD_LENGTH });
    }

    return m['error.server_error']();
  });
  const signupSessionResource = new SignupSessionResource();

  onMount(() => {
    passwordState.value = signupSessionResource.loadPassword();
  });

  const handlePasswordInput = (value: string) => {
    passwordState.value = value;
    passwordState.isValid = checkIsPasswordValid(passwordState.value);
    passwordState.isServerError = false;
  };

  const handlePasswordFormSubmit: TypedSubmitFunction = () => {
    return async ({ update, result }) => {
      // Server validation result
      if (result.type === 'failure' && result.data) {
        passwordState.isValid = Boolean(result.data.isValid);
      }

      if (result.type === 'success') {
        await update();

        signupSessionResource.savePassword(passwordState.value);

        goto(`${AppRoute.SIGNUP}${AppRoute.BIRTHDATE}`);
      }

      // Server error result
      if (result.type === 'error') {
        passwordState.isServerError = true;
      }
    };
  };
</script>

{#snippet tooltip()}
  <Tooltip>{m['tooltip.password']({ count: MIN_PASSWORD_LENGTH })}</Tooltip>
{/snippet}

<Form
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
    {errorMessage}
    slotB={tooltip}
  />
</Form>
