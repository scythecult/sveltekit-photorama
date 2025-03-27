<script lang="ts">
  import './styles.css';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { EMAIL_REGEXP } from '$lib/components/input/constants';
  import Input from '$lib/components/input/Input.svelte';
  import { ActionMap } from '$lib/constants/action';
  import { AppRoute } from '$lib/constants/common';

  // TODO Populate domains array based on most 'popular' email providers in user location
  const SUGGESTED_EMAIL_DOMAINS = ['@gmail.com', '@outlook.com', '@yahoo.com', '@hotmail.com', '@aol.com'];

  let emailValue = $state('');
  let currentEmailDomain = $state('');
  let suggestedEmailDomains = $derived(
    !currentEmailDomain
      ? SUGGESTED_EMAIL_DOMAINS
      : SUGGESTED_EMAIL_DOMAINS.filter((domain) => domain === currentEmailDomain),
  );
  let isEmailValid = $state(true);
  let isFormDisabled = $state(false);
  const isSubmitButtonDisabled = $derived(isFormDisabled || !emailValue || !isEmailValid);

  const handleEmailInput = (value: string) => {
    emailValue = value;
    isEmailValid = EMAIL_REGEXP.test(value);

    if (!value) {
      currentEmailDomain = '';
    }
  };

  const handleEmailDomainClick = (domain: string) => {
    if (!currentEmailDomain) {
      currentEmailDomain = domain;
      emailValue = `${emailValue}${domain}`;
      isEmailValid = EMAIL_REGEXP.test(emailValue);
    }
  };

  const handleLoginFormSubmit: SubmitFunction = () => {
    isFormDisabled = true;

    return async ({ update }) => {
      isFormDisabled = false;

      await update();

      // TODO MB should wait for confirmation
      goto(AppRoute.ROOT);
    };
  };

  const classNameFinal = $derived(['signup-email-form', isFormDisabled && 'signup-email-form--disabled']);
</script>

<form
  class={classNameFinal}
  action="?/{ActionMap.SIGNUP_EMAIL}"
  autocomplete="off"
  method="POST"
  use:enhance={handleLoginFormSubmit}
>
  <Input
    name="email"
    type="email"
    placeholder="Email"
    onInput={handleEmailInput}
    isError={!isEmailValid}
    userValue={emailValue}
    errorMessage="Pease enter email in&nbsp;correct format"
  />
  <!-- TODO Move to separate component -->
  <div class="signup-email-form__suggested-email-domains">
    {#each suggestedEmailDomains as domain (domain)}
      <button
        class="signup-email-form__suggested-email-domain"
        onclick={() => handleEmailDomainClick(domain)}
        type="button">{domain}</button
      >
    {/each}
  </div>
  <button class="signup-email-form__submit" type="submit" disabled={isSubmitButtonDisabled}>Sign up</button>
</form>
