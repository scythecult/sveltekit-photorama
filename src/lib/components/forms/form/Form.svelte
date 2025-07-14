<script lang="ts">
  import './styles.css';
  import type { SubmitFunction } from '@sveltejs/kit';
  import type { Snippet } from 'svelte';
  import { enhance } from '$app/forms';
  import { m } from '$lib/paraglide/messages';

  type FormMethod = 'POST' | 'GET';

  type FormAutoHelpers = 'on' | 'off';

  type FormEnctype = 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';

  type FormButtonType = 'primary' | 'secondary';

  type FormProps = {
    title?: string;
    description?: string;
    buttonText?: string;
    buttonType?: FormButtonType;
    className?: string | (string | boolean)[];
    children: Snippet;
    action: string;
    method: FormMethod;
    onSubmit: SubmitFunction;
    isSubmitButtonDisabled: boolean;
    autocomplete?: FormAutoHelpers;
    autocapitalize?: FormAutoHelpers;
    autocorrect?: FormAutoHelpers;
    enctype?: FormEnctype;
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
  }: FormProps = $props();
  const classNameFinal = ['form', className];
  const submitButtonClassNameFinal = $derived([
    'form__button',
    buttonType === 'primary' ? 'primary-button' : 'plain-button',
  ]);
  const buttonTextFinal = $derived(buttonText ? buttonText : m['input.button_next']());
  const isHeadingVisible = $derived(title || description);

  const handleKeydown = (evt: KeyboardEvent & { currentTarget: EventTarget & HTMLFormElement }) => {
    const { key, ctrlKey, metaKey } = evt;

    if (!isSubmitButtonDisabled && (key === 'Enter' || (key === 'Enter' && (ctrlKey || metaKey)))) {
      evt.currentTarget.requestSubmit();
    }
  };
</script>

<form class={classNameFinal} {action} {method} onkeydown={handleKeydown} use:enhance={onSubmit} {...restProps}>
  {#if isHeadingVisible}
    <div class="form__heading">
      {#if title}
        <h2 class="form__title">{title}</h2>
      {/if}
      {#if description}
        <p class="form__description">{description}</p>
      {/if}
    </div>
  {/if}

  {@render children()}

  <button class={submitButtonClassNameFinal} type="submit" disabled={isSubmitButtonDisabled}>{buttonTextFinal}</button>
</form>
