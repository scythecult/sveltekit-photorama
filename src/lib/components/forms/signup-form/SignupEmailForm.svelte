<script lang="ts">
  import './styles.css';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { enhance } from '$app/forms';
  import Carousel from '$lib/components/carousel/Carousel.svelte';
  import { EMAIL_REGEXP, MIN_PASSWORD_LENGTH } from '$lib/components/input/constants';
  import Input from '$lib/components/input/Input.svelte';
  import { ActionMap } from '$lib/constants/action';
  import { AppLocaleName } from '$lib/constants/locales';
  import { m } from '$lib/paraglide/messages';
  import { getLocale } from '$lib/paraglide/runtime';

  const SuggestedLocalEmailDomain = {
    [AppLocaleName.RU]: ['@yandex.ru', '@mail.ru', '@rambler.ru', '@bk.ru', '@list.ru'],
    [AppLocaleName.EN]: ['@gmail.com', '@outlook.com', '@yahoo.com', '@hotmail.com', '@aol.com'],
  };

  let currentLocale = $derived(getLocale());
  let emailValue = $state('');
  let currentEmailDomain = $state('');
  let passwordValue = $state('');
  let isPasswordValid = $state(true);

  let suggestedEmailDomains = $derived(
    !currentEmailDomain
      ? SuggestedLocalEmailDomain[currentLocale]
      : SuggestedLocalEmailDomain[currentLocale].filter((domain) => domain === currentEmailDomain),
  );
  let isEmailValid = $state(true);
  let isFormDisabled = $state(false);
  const isSubmitButtonDisabled = $derived(
    isFormDisabled || !emailValue || !isEmailValid || !isPasswordValid || !passwordValue,
  );

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
      emailValue = `${emailValue.replace(/@/g, '')}${domain}`;
      isEmailValid = EMAIL_REGEXP.test(emailValue);
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
      await update();
      isFormDisabled = false;
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
    placeholder={m.signup_email_placeholder()}
    onInput={handleEmailInput}
    isError={!isEmailValid}
    userValue={emailValue}
    errorMessage={m.email_error()}
  />

  <Carousel className="suggested-email-domains">
    {#each suggestedEmailDomains as domain (domain)}
      <button class="suggested-email-domain primary-button" onclick={() => handleEmailDomainClick(domain)} type="button"
        >{domain}</button
      >
    {/each}
  </Carousel>

  <Input
    name="password"
    type="password"
    placeholder={m.login_password_placeholder()}
    onInput={handlePasswordInput}
    isError={!isPasswordValid}
    minlength={MIN_PASSWORD_LENGTH}
    userValue={passwordValue}
    errorMessage={m.login_password_error({ value: MIN_PASSWORD_LENGTH })}
  />
  <button class="primary-button" type="submit" disabled={isSubmitButtonDisabled}>{m.signup_button_register()}</button>
</form>
