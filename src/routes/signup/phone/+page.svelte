<script lang="ts">
  import './styles.css';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { HTTPMethod } from 'http-method-enum';
  import Form from '$lib/components/forms/form/Form.svelte';
  import { EMAIL_REGEXP } from '$lib/components/inputs/constants';
  import Input from '$lib/components/inputs/Input.svelte';
  import Link from '$lib/components/link/Link.svelte';
  // import Tooltip from '$lib/components/tooltip/Tooltip.svelte';
  import { FormActionName } from '$lib/constants/action';
  import { AppRoute } from '$lib/constants/app';
  import { m } from '$lib/paraglide/messages';

  let phoneValue = $state('');
  let passwordValue = $state('');
  let isPasswordValid = $state(true);
  let isPhoneValid = $state(true);
  const isSubmitButtonDisabled = $derived(!phoneValue || !isPhoneValid || !isPasswordValid || !passwordValue);

  const handleEmailInput = (value: string) => {
    phoneValue = value;
    isPhoneValid = EMAIL_REGEXP.test(value);
  };

  const handleLoginFormSubmit: SubmitFunction = () => {
    return async ({ update }) => {
      await update();
    };
  };
</script>

<!-- {#snippet tooltip()}
  <Tooltip>{m['tooltip.fullname']()}</Tooltip>
{/snippet} -->

<Form
  title={m['signup_page.phone_title']()}
  action="?/{FormActionName.SIGNUP_EMAIL}"
  autocomplete="off"
  method={HTTPMethod.POST}
  onSubmit={handleLoginFormSubmit}
  {isSubmitButtonDisabled}
>
  <Input
    name="phone"
    type="tel"
    placeholder={m['input.phone_placeholder']()}
    onInput={handleEmailInput}
    isError={!isPhoneValid}
    userValue={phoneValue}
    errorMessage={m['input.email_error']()}
  />
</Form>
<Link className="signup__link primary-button" href={`${AppRoute.SIGNUP}${AppRoute.EMAIL}`}
  >{m['signup_page.signup_by_email']()}</Link
>
