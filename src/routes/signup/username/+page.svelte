<script lang="ts">
  import './styles.css';
  import { HTTPMethod } from 'http-method-enum';
  import { StatusCodes } from 'http-status-codes';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Form from '$lib/components/forms/form/Form.svelte';
  import Input from '$lib/components/inputs/Input.svelte';
  import ValidationSpinner from '$lib/components/loaders/spinners/validation-spinner/ValidationSpinner.svelte';
  import Tooltip from '$lib/components/tooltip/Tooltip.svelte';
  import { FormActionName, InputName } from '$lib/constants/action';
  import { AppPath, AppRoute, AppSearchParam, PHOTORAMA_BASE_URL } from '$lib/constants/app';
  import { MIN_USERNAME_LENGTH } from '$lib/constants/validation';
  import { m } from '$lib/paraglide/messages';
  import { SignupSessionResource } from '$lib/resources/SignupSessionResource';
  import type { TypedSubmitFunction } from '$lib/types/actions';
  import type { ResponsePayload, UsernamePayload } from '$lib/types/responsePayload.js';
  import { debounce, replaceSpaces } from '$lib/utils/common';
  import { checkIsUsernameValid } from '$lib/utils/validation';

  const USERNAME_INPUT_DEBOUNCE_TIME = 1000;

  const { data } = $props();
  const usernameState = $state({
    value: '',
    isValid: true,
    isAvailable: true,
    isLoading: true,
    isServerError: false,
  });

  const isUsernameError = $derived(!usernameState.isValid || !usernameState.isAvailable || usernameState.isServerError);
  const isSubmitButtonDisabled = $derived(!usernameState.value || usernameState.isLoading || isUsernameError);
  const errorMessage = $derived.by(() => {
    if (!usernameState.isValid) {
      return m['input.username_error']({ count: MIN_USERNAME_LENGTH });
    }

    if (!usernameState.isAvailable) {
      return m['input.username_error_in_use']();
    }

    return m['error.server_error']();
  });
  const signupSessionResource = new SignupSessionResource();

  onMount(() => {
    // Checking and validating on server while page loading from previous page request
    usernameState.value = data.username;
    usernameState.isAvailable = data.isAvailable;
    usernameState.isLoading = data.isLoading;
    usernameState.isValid = data.isValid;
  });

  const handleUsernameInput = (value: string) => {
    // TODO force name lowercase
    usernameState.value = replaceSpaces(value);
    usernameState.isValid = checkIsUsernameValid(usernameState.value);
    usernameState.isLoading = true;
    usernameState.isAvailable = true;
    usernameState.isServerError = false;
  };

  const handleUsernameKeyup = debounce(async (_?: string) => {
    if (isUsernameError) {
      usernameState.isLoading = false;

      return;
    }

    try {
      const response = await fetch(
        `${PHOTORAMA_BASE_URL}${AppPath.SIGNUP_SUGGESTED}?${AppSearchParam.USERNAME}=${usernameState.value}`,
        { method: HTTPMethod.GET },
      );

      if (response.ok) {
        const {
          data: { isAvailable },
        }: ResponsePayload<UsernamePayload> = await response.json();

        usernameState.isAvailable = isAvailable;
      }

      if (response.status === StatusCodes.INTERNAL_SERVER_ERROR) {
        usernameState.isServerError = true;
      }
    } catch (error) {
      usernameState.isAvailable = false;
    } finally {
      usernameState.isLoading = false;
    }
  }, USERNAME_INPUT_DEBOUNCE_TIME);

  const handleUsernameFormSubmit: TypedSubmitFunction = () => {
    return async ({ update, result }) => {
      if (result.type === 'failure' && result.data) {
        usernameState.isValid = Boolean(result.data.isValid);
      }

      if (result.type === 'success') {
        if (usernameState.isAvailable) {
          await update();

          signupSessionResource.saveUsername(usernameState.value);

          goto(`${AppRoute.SIGNUP}${AppRoute.AVATAR}`);
        }
      }

      if (result.type === 'error') {
        usernameState.isServerError = true;
      }
    };
  };
</script>

{#snippet validationSpinner()}
  <ValidationSpinner
    className="username-page__validation-spinner"
    isLoading={usernameState.isLoading}
    isVerified={!isUsernameError}
  />
{/snippet}

{#snippet tooltip()}
  <Tooltip>{m['tooltip.username']()}</Tooltip>
{/snippet}

<Form
  title={m['signup_page.username_title']()}
  action="?/{FormActionName.SIGNUP_USERNAME}"
  method={HTTPMethod.POST}
  onSubmit={handleUsernameFormSubmit}
  {isSubmitButtonDisabled}
>
  <Input
    name={InputName.USERNAME}
    type="text"
    placeholder={m['input.username_placeholder']()}
    onInput={handleUsernameInput}
    onKeyup={handleUsernameKeyup}
    userValue={usernameState.value}
    isError={isUsernameError}
    {errorMessage}
    slotA={validationSpinner}
    slotB={tooltip}
  />
</Form>
