<script lang="ts">
  import './styles.css';
  import type { SubmitFunction } from '@sveltejs/kit';
  import type { Snippet } from 'svelte';
  import { enhance } from '$app/forms';
  import { m } from '$lib/paraglide/messages';

  type SignupFormMethod = 'POST' | 'GET';

  type SignupFormAutoHelpers = 'on' | 'off';

  type SignupFormEnctype = 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';

  type SignupFormButtonType = 'primary' | 'secondary';

  type SignupFormProps = {
    title?: string;
    description?: string;
    buttonText?: string;
    buttonType?: SignupFormButtonType;
    className?: string | (string | boolean)[];
    children: Snippet;
    action: string;
    method: SignupFormMethod;
    onSubmit: SubmitFunction;
    isSubmitButtonDisabled: boolean;
    autocomplete?: SignupFormAutoHelpers;
    autocapitalize?: SignupFormAutoHelpers;
    autocorrect?: SignupFormAutoHelpers;
    enctype?: SignupFormEnctype;
  };

  const {
    title,
    description,
    buttonType = 'primary',
    buttonText,
    className,
    children,
    action,
    method,
    onSubmit,
    isSubmitButtonDisabled,
    ...restProps
  }: SignupFormProps = $props();
  const classNameFinal = ['signup-form', className];
  const submitButtonClassNameFinal = $derived([
    'signup-form__button',
    buttonType === 'primary' ? 'primary-button' : 'plain-button',
  ]);
  const buttonTextFinal = $derived(buttonText ? buttonText : m['input.button_next']());
  const isHeadingVisible = title || description;
</script>

<form class={classNameFinal} {action} {method} use:enhance={onSubmit} {...restProps}>
  {#if isHeadingVisible}
    <div class="signup-form__heading">
      {#if title}
        <h2 class="signup-form__title">{title}</h2>
      {/if}
      {#if description}
        <p class="signup-form__description">{description}</p>
      {/if}
    </div>
  {/if}

  {@render children()}

  <button class={submitButtonClassNameFinal} type="submit" disabled={isSubmitButtonDisabled}>{buttonTextFinal}</button>
</form>
