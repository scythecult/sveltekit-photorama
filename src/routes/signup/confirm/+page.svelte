<script lang="ts">
  import './styles.css';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { HTTPMethod } from 'http-method-enum';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import SignupForm from '$lib/components/forms/signup-form/SignupForm.svelte';
  import Link from '$lib/components/link/Link.svelte';
  import { FormActionName, InputName } from '$lib/constants/action';
  import { AppRoute } from '$lib/constants/app';
  import { m } from '$lib/paraglide/messages';
  import { SignupSessionResource } from '$lib/resources/SignupSessionResource';
  import type { ResponseSignupConfirmRequiredInfoPayload } from '$lib/types/responsePayload';
  import type { SignupUserInfo } from '$lib/types/userInfo';

  const confirmState = $state<SignupUserInfo>({
    birthdate: '',
    email: '',
    fullname: '',
    password: '',
    username: '',
  });
  let signupUserInfoEmptyFields = $state<string[]>([]);
  const isSubmitButtonDisabled = $derived(Boolean(signupUserInfoEmptyFields.length));
  const isRequiredInfoVisible = $derived(Boolean(signupUserInfoEmptyFields.length));

  const signupSessionRecource = new SignupSessionResource();

  onMount(() => {
    const userInfo = signupSessionRecource.loadAll() as SignupUserInfo;

    confirmState.birthdate = userInfo.birthdate;
    confirmState.email = userInfo.email;
    confirmState.fullname = userInfo.fullname;
    confirmState.password = userInfo.password;
    confirmState.username = userInfo.username;
  });

  const handleConfirmSubmit: SubmitFunction = () => {
    // TODO Think about validation SignUpStorage + sessionStorage
    return async ({ update, result }) => {
      await update();

      if (result.type === 'failure') {
        const data = result.data as ResponseSignupConfirmRequiredInfoPayload;

        signupUserInfoEmptyFields = data.emptyFields;
      }

      if (result.type === 'success') {
        signupSessionRecource.clearAll();

        goto(AppRoute.PUBLICATIONS);
      }
    };
  };
</script>

<SignupForm
  className="confirm-form"
  title={m['signup_page.confirm_title']()}
  buttonText={m['input.button_agree']()}
  action={`?/${FormActionName.SIGNUP_CONFIRM}`}
  method={HTTPMethod.POST}
  onSubmit={handleConfirmSubmit}
  {isSubmitButtonDisabled}
>
  <div class="confirm-form__terms">
    <p class="confirm-form__term">
      {m['terms.signup']()}
    </p>
    <p class="confirm-form__term">
      {m['terms.signup']()}
    </p>
    <p class="confirm-form__term">
      {m['terms.signup']()}
    </p>
  </div>
  <input type="hidden" name={InputName.BIRTHDATE} value={confirmState.birthdate} />
  <input type="hidden" name={InputName.EMAIL} value={confirmState.email} />
  <input type="hidden" name={InputName.FULLNAME} value={confirmState.fullname} />
  <input type="hidden" name={InputName.PASSWORD} value={confirmState.password} />
  <input type="hidden" name={InputName.USERNAME} value={confirmState.username} />
</SignupForm>
{#if isRequiredInfoVisible}
  <div class="required-info">
    <h2 class="required-info__title">{m['signup_page.confirm_required_info_title']()}</h2>
    <p class="required-info__description">{m['signup_page.confirm_required_info_description']()}</p>
    <ul class="required-info__list">
      {#each signupUserInfoEmptyFields as emptyField (emptyField)}
        <li class="required-info__item">
          <Link className="required-info__link" href={`${AppRoute.SIGNUP}/${emptyField}`}>{emptyField}</Link>
        </li>
      {/each}
    </ul>
  </div>
{/if}
