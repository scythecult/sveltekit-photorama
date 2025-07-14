<script lang="ts">
  import './styles.css';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { HTTPMethod } from 'http-method-enum';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { fetchData } from '$lib/api/fetchData.js';
  import Form from '$lib/components/forms/form/Form.svelte';
  import { MIN_USERNAME_LENGTH } from '$lib/components/inputs/constants.js';
  import Input from '$lib/components/inputs/Input.svelte';
  import ValidationSpinner from '$lib/components/loaders/spinners/validation-spinner/ValidationSpinner.svelte';
  import Tooltip from '$lib/components/tooltip/Tooltip.svelte';
  import { FormActionName, InputName } from '$lib/constants/action';
  import { AppPath, AppRoute, AppSearchParam, PHOTORAMA_BASE_URL } from '$lib/constants/app';
  import { m } from '$lib/paraglide/messages';
  import { SignupSessionResource } from '$lib/resources/SignupSessionResource';
  import { signupState } from '$lib/state/signupState.svelte';
  import type { ResponseSignupSuggestedUsernamePayload } from '$lib/types/responsePayload.js';
  import { debounce, replaceSpaces } from '$lib/utils/utils';

  const USERNAME_INPUT_DEBOUNCE_TIME = 1000;
  const { data } = $props();
  const usernameState = $state({
    value: signupState.getProperty(InputName.USERNAME) || '',
    isValid: true,
    isAvailable: true,
    isLoading: true,
  });

  const isSubmitButtonDisabled = $derived(!usernameState.isValid || !usernameState.isAvailable);
  const signupSessionResource = new SignupSessionResource();

  onMount(() => {
    usernameState.value = signupSessionResource.loadUsername();
    usernameState.isAvailable = data.isSuggestedUserNameAvailable;
    usernameState.isLoading = data.isLoading;
    usernameState.isValid = usernameState.isAvailable;
  });

  const handleUsernameInput = (value: string) => {
    usernameState.value = replaceSpaces(value);
    usernameState.isValid = usernameState.value.length >= MIN_USERNAME_LENGTH;
    usernameState.isLoading = true;
  };

  const handleUsernameKeyup = debounce(async (_?: string) => {
    const {
      response,
      data: { isSuggestedUserNameAvailable },
    } = await fetchData<ResponseSignupSuggestedUsernamePayload>(
      `${PHOTORAMA_BASE_URL}${AppPath.SIGNUP_SUGGESTED_USERNAME}?${AppSearchParam.SUGGESTED_USERNAME}=${usernameState.value}`,
      HTTPMethod.GET,
    );

    if (response.ok) {
      usernameState.isAvailable = isSuggestedUserNameAvailable;
    }

    usernameState.isLoading = false;
  }, USERNAME_INPUT_DEBOUNCE_TIME);

  const handleUsernameFormSubmit: SubmitFunction = () => {
    return async ({ update }) => {
      if (usernameState.isAvailable) {
        await update();

        signupState.setProperty(InputName.USERNAME, usernameState.value);
        signupSessionResource.saveUsername(usernameState.value);

        goto(`${AppRoute.SIGNUP}${AppRoute.AVATAR}`);
      }
    };
  };
</script>

{#snippet validationSpinner()}
  <ValidationSpinner
    className="username-page__validation-spinner"
    isLoading={usernameState.isLoading}
    isVerified={usernameState.isAvailable && usernameState.isValid}
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
    errorMessage={m['input.username_error']({ count: MIN_USERNAME_LENGTH })}
    isError={!usernameState.isValid}
    slotA={validationSpinner}
    slotB={tooltip}
  />
</Form>
