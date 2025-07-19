<script lang="ts">
  import { HTTPMethod } from 'http-method-enum';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Form from '$lib/components/forms/form/Form.svelte';
  import Input from '$lib/components/inputs/Input.svelte';
  import Tooltip from '$lib/components/tooltip/Tooltip.svelte';
  import { FormActionName, InputName } from '$lib/constants/action';
  import { AppRoute } from '$lib/constants/app';
  import { MIN_NAME_LENGTH } from '$lib/constants/validation';
  import { m } from '$lib/paraglide/messages';
  import { SignupSessionResource } from '$lib/resources/SignupSessionResource';
  import type { TypedSubmitFunction } from '$lib/types/actions';
  import { createSuggestedUsername } from '$lib/utils/common';
  import { checkIsFullnameValid } from '$lib/utils/validation';

  const fullnameState = $state({ value: '', isValid: true, isServerError: false });
  const isSubmitButtonDisabled = $derived(!fullnameState.value || !fullnameState.isValid);
  const errorMessage = $derived.by(() => {
    if (!fullnameState.isValid) {
      return m['input.fullname_error']({ count: MIN_NAME_LENGTH });
    }

    return m['error.server_error']();
  });
  const signupSessionResource = new SignupSessionResource();

  onMount(() => {
    fullnameState.value = signupSessionResource.loadFullname();
  });

  const handleFullnameInput = (value: string) => {
    fullnameState.value = value;
    fullnameState.isValid = checkIsFullnameValid(fullnameState.value);
    fullnameState.isServerError = false;
  };

  const handleFullnameFormSubmit: TypedSubmitFunction = () => {
    return async ({ update, result }) => {
      // Server validation result
      if (result.type === 'failure' && result.data) {
        fullnameState.isValid = Boolean(result.data.isValid);
      }

      if (result.type === 'success') {
        await update();

        const suggestedUsername = createSuggestedUsername(fullnameState.value);

        signupSessionResource.saveFullname(fullnameState.value);
        signupSessionResource.saveUsername(suggestedUsername);

        goto(`${AppRoute.SIGNUP}${AppRoute.PASSWORD}`);
      }

      // Server error result
      if (result.type === 'error') {
        fullnameState.isServerError = true;
      }
    };
  };
</script>

{#snippet tooltip()}
  <Tooltip>{m['tooltip.fullname']()}</Tooltip>
{/snippet}

<Form
  title={m['signup_page.fullname_title']()}
  action="?/{FormActionName.SIGNUP_FULLNAME}"
  method={HTTPMethod.POST}
  onSubmit={handleFullnameFormSubmit}
  {isSubmitButtonDisabled}
>
  <Input
    name={InputName.FULLNAME}
    type="text"
    placeholder={m['input.fullname_placeholder']()}
    onInput={handleFullnameInput}
    isError={!fullnameState.isValid}
    {errorMessage}
    userValue={fullnameState.value}
    slotB={tooltip}
  />
</Form>
