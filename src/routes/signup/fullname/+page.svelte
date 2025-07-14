<script lang="ts">
  import type { SubmitFunction } from '@sveltejs/kit';
  import { HTTPMethod } from 'http-method-enum';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Form from '$lib/components/forms/form/Form.svelte';
  import Input from '$lib/components/inputs/Input.svelte';
  import Tooltip from '$lib/components/tooltip/Tooltip.svelte';
  import { FormActionName, InputName } from '$lib/constants/action';
  import { AppRoute } from '$lib/constants/app';
  import { m } from '$lib/paraglide/messages';
  import { SignupSessionResource } from '$lib/resources/SignupSessionResource';
  import { signupState } from '$lib/state/signupState.svelte';
  import { createSuggestedUsername } from '$lib/utils/utils';

  const fullnameState = $state({ value: '' });
  const isSubmitButtonDisabled = $derived(!fullnameState.value);
  const signupSessionResource = new SignupSessionResource();

  onMount(() => {
    fullnameState.value = signupSessionResource.loadFullname();
  });

  const handleFullnameInput = (value: string) => {
    fullnameState.value = value;
  };

  const handleFullnameFormSubmit: SubmitFunction = () => {
    return async ({ update }) => {
      await update();
      const suggestedUsername = createSuggestedUsername(fullnameState.value);

      signupState.setProperty(InputName.FULLNAME, fullnameState.value);
      signupState.setProperty(InputName.USERNAME, suggestedUsername);
      signupSessionResource.saveFullname(fullnameState.value);
      signupSessionResource.saveUsername(suggestedUsername);

      goto(`${AppRoute.SIGNUP}${AppRoute.PASSWORD}`);
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
    userValue={fullnameState.value}
    slotB={tooltip}
  />
</Form>
