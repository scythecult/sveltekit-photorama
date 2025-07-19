<script lang="ts">
  import './styles.css';
  import { HTTPMethod } from 'http-method-enum';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Carousel from '$lib/components/carousel/Carousel.svelte';
  import Form from '$lib/components/forms/form/Form.svelte';
  import Input from '$lib/components/inputs/Input.svelte';
  import Link from '$lib/components/link/Link.svelte';
  import Tooltip from '$lib/components/tooltip/Tooltip.svelte';
  import { FormActionName, InputName } from '$lib/constants/action';
  import { AppRoute } from '$lib/constants/app';
  import { AppLocaleName } from '$lib/constants/common';
  import { m } from '$lib/paraglide/messages';
  import { getLocale } from '$lib/paraglide/runtime';
  import { SignupSessionResource } from '$lib/resources/SignupSessionResource';
  import type { TypedSubmitFunction } from '$lib/types/actions';
  import { checkIsEmailValid } from '$lib/utils/validation';

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
    isServerError: false,
  });

  const suggestedEmailDomains = $derived(
    !emailState.currentDomain
      ? currentSuggestedLocalEmailDomain
      : currentSuggestedLocalEmailDomain.filter((domain) => domain === emailState.currentDomain),
  );
  const isEmailError = $derived(!emailState.isValid || !emailState.isAvailable || emailState.isServerError);
  const isSubmitButtonDisabled = $derived(!emailState.value || isEmailError);
  const errorMessage = $derived.by(() => {
    if (!emailState.isValid) {
      return m['input.email_error']();
    }

    if (!emailState.isAvailable) {
      return m['input.email_error_in_use']();
    }

    return m['error.server_error']();
  });
  const signupSessionResource = new SignupSessionResource();

  onMount(() => {
    emailState.value = signupSessionResource.loadEmail();
  });

  const handleEmailInput = (value: string) => {
    emailState.value = value;
    emailState.isValid = checkIsEmailValid(emailState.value);
    emailState.isAvailable = true;
    emailState.isServerError = false;

    if (!emailState.value) {
      emailState.currentDomain = '';
    }
  };

  const handleEmailDomainClick = (domain: string) => {
    if (!emailState.currentDomain) {
      emailState.currentDomain = domain;
      emailState.value = `${emailState.value.replace(/@/g, '')}${emailState.currentDomain}`;
      emailState.isValid = checkIsEmailValid(emailState.value);
    }
  };

  const handleEmailFormSubmit: TypedSubmitFunction = () => {
    return async ({ update, result }) => {
      // Server validation result
      if (result.type === 'failure' && result.data) {
        emailState.isValid = Boolean(result.data.isValid);
      }

      // Server check is email available result
      if (result.type === 'success' && result.data) {
        emailState.isAvailable = Boolean(result.data.isAvailable);

        if (emailState.isAvailable) {
          await update();

          signupSessionResource.saveEmail(emailState.value);

          goto(`${AppRoute.SIGNUP}${AppRoute.FULLNAME}`);
        }
      }

      // Server error result
      if (result.type === 'error') {
        emailState.isServerError = true;
      }
    };
  };
</script>

{#snippet tooltip()}
  <Tooltip>{m['tooltip.email']()}</Tooltip>
{/snippet}

<Form
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
    isError={isEmailError}
    userValue={emailState.value}
    {errorMessage}
    slotB={tooltip}
  />

  <!-- TODO move to separate component -->
  <Carousel className="suggested-email-domains">
    {#each suggestedEmailDomains as domain (domain)}
      <button class="suggested-email-domain primary-button" onclick={() => handleEmailDomainClick(domain)} type="button"
        >{domain}</button
      >
    {/each}
  </Carousel>
</Form>
<Link className="signup__link primary-button" href={`${AppRoute.SIGNUP}${AppRoute.PHONE}`}
  >{m['signup_page.signup_by_phone']()}</Link
>
