<script lang="ts">
  import './styles.css';
  import { HTTPMethod } from 'http-method-enum';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Form from '$lib/components/forms/form/Form.svelte';
  import Link from '$lib/components/link/Link.svelte';
  import { FormActionName, InputName } from '$lib/constants/action';
  import { AppRoute } from '$lib/constants/app';
  import { m } from '$lib/paraglide/messages';
  import { SignupSessionResource } from '$lib/resources/SignupSessionResource';
  import type { TypedSubmitFunction } from '$lib/types/actions';
  import type { User } from '$lib/types/user';

  const confirmState = $state<User & { emptyFields: string[] }>({
    birthdate: '',
    email: '',
    fullname: '',
    password: '',
    username: '',
    emptyFields: [],
  });
  const isSubmitButtonDisabled = $derived(Boolean(confirmState.emptyFields.length));
  const isRequiredFieldsInfoVisible = $derived(Boolean(confirmState.emptyFields.length));

  const signupSessionRecource = new SignupSessionResource();

  onMount(() => {
    const userInfo = signupSessionRecource.loadAll();

    confirmState.birthdate = userInfo.birthdate;
    confirmState.email = userInfo.email;
    confirmState.fullname = userInfo.fullname;
    confirmState.password = userInfo.password;
    confirmState.username = userInfo.username;
  });

  const handleConfirmSubmit: TypedSubmitFunction = () => {
    return async ({ update, result }) => {
      if (result.type === 'failure' && result.data) {
        confirmState.emptyFields = result.data.emptyFields;
      }

      if (result.type === 'success') {
        await update();

        signupSessionRecource.clearAll();

        goto(AppRoute.PUBLICATIONS);
      }
    };
  };
</script>

<Form
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
</Form>
{#if isRequiredFieldsInfoVisible}
  <div class="required-info">
    <h2 class="required-info__title">{m['signup_page.confirm_required_info_title']()}</h2>
    <p class="required-info__description">{m['signup_page.confirm_required_info_description']()}</p>
    <ul class="required-info__list">
      {#each confirmState.emptyFields as emptyField (emptyField)}
        <li class="required-info__item">
          <Link className="required-info__link" href={`${AppRoute.SIGNUP}/${emptyField}`}>{emptyField}</Link>
        </li>
      {/each}
    </ul>
  </div>
{/if}
