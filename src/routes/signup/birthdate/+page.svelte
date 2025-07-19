<script lang="ts">
  import { HTTPMethod } from 'http-method-enum';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Form from '$lib/components/forms/form/Form.svelte';
  import Input from '$lib/components/inputs/Input.svelte';
  import Tooltip from '$lib/components/tooltip/Tooltip.svelte';
  import { FormActionName, InputName } from '$lib/constants/action';
  import { AppRoute, AppSearchParam } from '$lib/constants/app';
  import { MIN_YEARS_OLD_AMOUNT } from '$lib/constants/validation';
  import { m } from '$lib/paraglide/messages';
  import { SignupSessionResource } from '$lib/resources/SignupSessionResource';
  import type { TypedSubmitFunction } from '$lib/types/actions';
  import { getDate } from '$lib/utils/common';
  import { checkIsBirthdateValid } from '$lib/utils/validation';

  const birthdateState = $state({
    value: '',
    isValid: true,
    isServerError: false,
  });

  const isSubmitButtonDisabled = $derived(!birthdateState.value || !birthdateState.isValid);
  const errorMessage = $derived.by(() => {
    if (!birthdateState.isValid) {
      return m['input.date_error']({ count: MIN_YEARS_OLD_AMOUNT });
    }

    return m['error.server_error']();
  });
  const signupSessionResource = new SignupSessionResource();

  onMount(() => {
    birthdateState.value = signupSessionResource.loadBirthdate();
  });

  const handleBirthdateInput = (value: string) => {
    const userYearsOld = getDate().calculateYears(value);

    birthdateState.value = value;
    birthdateState.isValid = checkIsBirthdateValid(userYearsOld);
    birthdateState.isServerError = false;
  };

  const handleBirthdateFormSubmit: TypedSubmitFunction = () => {
    return async ({ update, result }) => {
      // Server validation result
      if (result.type === 'failure' && result.data) {
        birthdateState.isValid = Boolean(result.data.isValid);
      }

      if (result.type === 'success') {
        await update();

        signupSessionResource.saveBirthdate(birthdateState.value);

        const username = signupSessionResource.loadUsername();

        goto(`${AppRoute.SIGNUP}${AppRoute.USERNAME}?${AppSearchParam.NAME}=${username}`);
      }

      // Server error result
      if (result.type === 'error') {
        birthdateState.isServerError = true;
      }
    };
  };
</script>

{#snippet tooltip()}
  <Tooltip>{m['tooltip.birthdate']()}</Tooltip>
{/snippet}

<Form
  title={m['signup_page.birthdate_title']()}
  action="?/{FormActionName.SIGNUP_BIRTHDATE}"
  method={HTTPMethod.POST}
  onSubmit={handleBirthdateFormSubmit}
  {isSubmitButtonDisabled}
>
  <Input
    type="date"
    name={InputName.BIRTHDATE}
    placeholder={m['input.date_placeholder']()}
    onInput={handleBirthdateInput}
    isError={!birthdateState.isValid}
    userValue={birthdateState.value}
    {errorMessage}
    slotB={tooltip}
  />
</Form>
