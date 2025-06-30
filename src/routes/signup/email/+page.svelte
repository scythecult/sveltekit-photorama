<script lang="ts">
  import './styles.css';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { HTTPMethod } from 'http-method-enum';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Carousel from '$lib/components/carousel/Carousel.svelte';
  import SignupForm from '$lib/components/forms/signup-form/SignupForm.svelte';
  import { EMAIL_REGEXP } from '$lib/components/inputs/constants';
  import Input from '$lib/components/inputs/Input.svelte';
  import Link from '$lib/components/link/Link.svelte';
  import Tooltip from '$lib/components/tooltip/Tooltip.svelte';
  import { FormActionName, InputName } from '$lib/constants/action';
  import { AppRoute } from '$lib/constants/app';
  import { AppLocaleName } from '$lib/constants/common';
  import { m } from '$lib/paraglide/messages';
  import { getLocale } from '$lib/paraglide/runtime';
  import { SignupSessionResource } from '$lib/resources/SignupSessionResource';
  import { signupStore } from '$lib/store/signupStore.svelte';
  import type { ResponseSignupEmailPayload } from '$lib/types/responsePayload';

  const SuggestedLocalEmailDomain = {
    [AppLocaleName.RU]: ['@yandex.ru', '@mail.ru', '@rambler.ru', '@bk.ru', '@list.ru'],
    [AppLocaleName.EN]: ['@gmail.com', '@outlook.com', '@yahoo.com', '@hotmail.com', '@aol.com'],
  };

  const currentLocale = $derived(getLocale());
  const currentSuggestedLocalEmailDomain = $derived(SuggestedLocalEmailDomain[currentLocale]);

  const emailState = $state({
    value: '',
    currentDomain: '',
    isValid: true,
    isAvailable: true,
  });

  const suggestedEmailDomains = $derived(
    !emailState.currentDomain
      ? currentSuggestedLocalEmailDomain
      : currentSuggestedLocalEmailDomain.filter((domain) => domain === emailState.currentDomain),
  );
  const isSubmitButtonDisabled = $derived(!emailState.value || !emailState.isValid);
  const errorMessage = $derived(
    !emailState.isValid && emailState.isAvailable ? m['input.email_error']() : m['input.email_error_in_use'](),
  );

  const signupSessionResource = new SignupSessionResource();

  onMount(() => {
    emailState.value = signupSessionResource.loadEmail();
  });

  const handleEmailInput = (value: string) => {
    emailState.value = value;
    emailState.isValid = EMAIL_REGEXP.test(emailState.value);
    emailState.isAvailable = true;

    if (!emailState.value) {
      emailState.currentDomain = '';
    }
  };

  const handleEmailDomainClick = (domain: string) => {
    if (!emailState.currentDomain) {
      emailState.currentDomain = domain;
      emailState.value = `${emailState.value.replace(/@/g, '')}${emailState.currentDomain}`;
      emailState.isValid = EMAIL_REGEXP.test(emailState.value);
    }
  };

  const handleEmailFormSubmit: SubmitFunction = () => {
    return async ({ update, result }) => {
      if (result.type === 'success') {
        const data = result.data! as ResponseSignupEmailPayload;

        emailState.isAvailable = data.isEmailAvailable;
        emailState.isValid = data.isEmailAvailable;

        if (emailState.isAvailable) {
          await update();

          signupStore.setProperty(InputName.EMAIL, emailState.value);
          signupSessionResource.saveEmail(emailState.value);

          goto(`${AppRoute.SIGNUP}${AppRoute.FULLNAME}`);

          emailState.isValid = true;
        }

        // await update();
      }
    };
  };
</script>

{#snippet tooltip()}
  <Tooltip>{m['tooltip.email']()}</Tooltip>
{/snippet}

<SignupForm
  title={m['signup_page.email_title']()}
  action="?/{FormActionName.SIGNUP_EMAIL}"
  method={HTTPMethod.POST}
  onSubmit={handleEmailFormSubmit}
  {isSubmitButtonDisabled}
>
  <Input
    name={InputName.EMAIL}
    type="email"
    placeholder={m['input.email_placeholder']()}
    onInput={handleEmailInput}
    isError={!emailState.isValid}
    userValue={emailState.value}
    {errorMessage}
    slotB={tooltip}
  />

  <Carousel className="suggested-email-domains">
    {#each suggestedEmailDomains as domain (domain)}
      <button class="suggested-email-domain primary-button" onclick={() => handleEmailDomainClick(domain)} type="button"
        >{domain}</button
      >
    {/each}
  </Carousel>
</SignupForm>
<Link className="signup__link primary-button" href={`${AppRoute.SIGNUP}${AppRoute.PHONE}`}
  >{m['signup_page.signup_by_phone']()}</Link
>
