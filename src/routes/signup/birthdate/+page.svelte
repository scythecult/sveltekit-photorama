<script lang="ts">
  import type { SubmitFunction } from '@sveltejs/kit';
  import { HTTPMethod } from 'http-method-enum';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Form from '$lib/components/forms/form/Form.svelte';
  import { MIN_YEARS_OLD_AMOUNT } from '$lib/components/inputs/constants';
  import Input from '$lib/components/inputs/Input.svelte';
  import Tooltip from '$lib/components/tooltip/Tooltip.svelte';
  import { FormActionName, InputName } from '$lib/constants/action';
  import { AppRoute, AppSearchParam } from '$lib/constants/app';
  import { m } from '$lib/paraglide/messages';
  import { SignupSessionResource } from '$lib/resources/SignupSessionResource';
  import { signupState } from '$lib/state/signupState.svelte';
  import { getDate } from '$lib/utils/utils';

  const birthdateState = $state({
    value: '',
    isValid: true,
  });

  const isSubmitButtonDisabled = $derived(!birthdateState.value || !birthdateState.isValid);
  const signupSessionResource = new SignupSessionResource();

  onMount(() => {
    birthdateState.value = signupSessionResource.loadBirthdate();
  });

  const handleBirthdateInput = (value: string) => {
    const userYearsOld = getDate().calculateYears(value);

    birthdateState.value = value;
    birthdateState.isValid = userYearsOld >= MIN_YEARS_OLD_AMOUNT;
  };

  const handleBirthdateFormSubmit: SubmitFunction = () => {
    return async ({ update }) => {
      await update();

      birthdateState.isValid = true;
      signupState.setProperty(InputName.BIRTHDATE, birthdateState.value);
      signupSessionResource.saveBirthdate(birthdateState.value);

      const userName = signupState.getProperty(InputName.USERNAME) || signupSessionResource.loadUsername();

      goto(`${AppRoute.SIGNUP}${AppRoute.USERNAME}?${AppSearchParam.SUGGESTED_USERNAME}=${userName}`);
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
    errorMessage={m['input.date_error']({ count: MIN_YEARS_OLD_AMOUNT })}
    slotB={tooltip}
  />
</Form>
