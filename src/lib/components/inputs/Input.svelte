<script lang="ts">
  import './styles.css';
  import { onMount, type Snippet } from 'svelte';
  import { m } from '$lib/paraglide/messages';
  import { getDate } from '$lib/utils/utils';

  type InputTypeProps = 'text' | 'password' | 'email' | 'date' | 'tel' | 'file';

  type InputProps = {
    name: string;
    type: InputTypeProps;
    accept?: string;
    placeholder?: string;
    isError?: boolean;
    maxlength?: number;
    minlength?: number;
    className?: string;
    errorMessage?: string;
    userValue?: string;
    slotA?: Snippet;
    slotB?: Snippet;
    onInput?: (value: string) => void;
    onChange?: (value: string) => void;
    onKeyup?: (value?: string) => void;
  };

  let {
    isError,
    type,
    accept,
    className,
    name,
    placeholder = '',
    maxlength,
    minlength,
    errorMessage = '',
    userValue = $bindable(''),
    slotA,
    slotB,
    onInput,
    onKeyup,
  }: InputProps = $props();
  let isActive = $derived(type === 'date' || userValue.length > 0);
  let placeholderInitial = $state(placeholder);
  let isPasswordVisible = $state(false);

  const classNameFinal = $derived([
    'input',
    isError && 'input--error',
    isActive && 'input--active',
    isActive && isPasswordVisible && 'input--password-shown',
    className,
  ]);

  const togglePasswordVisibility = () => {
    isPasswordVisible = !isPasswordVisible;
  };

  const handleInput = (
    evt: Event & {
      currentTarget: EventTarget & HTMLInputElement;
    },
  ) => {
    const { value } = evt.currentTarget;

    if (type === 'date') {
      const yearsDiff = getDate().calculateYears(value);

      placeholder = `${placeholderInitial} ${m['input.calc_date_placeholder']({ count: yearsDiff, value: yearsDiff })}`;
    }

    onInput?.(value);
  };

  const handleKeyup = (evt: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement }) => {
    const { value } = evt.currentTarget;

    onKeyup?.(value);
  };

  onMount(() => {
    if (type === 'date') {
      const { today, calculateYears: calculateYearsDiff } = getDate();

      userValue = today;

      const yearsDiff = calculateYearsDiff(userValue);

      // TODO Fix incorrect ru lang translation
      placeholder = `${placeholder} ${m['input.calc_date_placeholder']({ count: yearsDiff, value: yearsDiff })}`;
    }
  });
</script>

<!-- TODO Decompose to separate input-type components -->
<div class={classNameFinal}>
  <label class="input__label" for={name}>
    <span class="input__placeholder">{placeholder}</span>
    <input
      class="input__field"
      type={isPasswordVisible && type === 'password' ? 'text' : type}
      {accept}
      autocapitalize="off"
      autocomplete="off"
      {minlength}
      {maxlength}
      {name}
      aria-label={placeholderInitial}
      aria-required="true"
      id={name}
      bind:value={userValue}
      oninput={handleInput}
      onkeyup={handleKeyup}
    />
    {#if slotA}
      {@render slotA()}
    {/if}
    {#if slotB}
      {@render slotB()}
    {/if}
    {#if isActive && type === 'password'}
      <button class="input__show-password" onclick={togglePasswordVisibility} type="button"
        >{isPasswordVisible ? 'Hide' : 'Show'}</button
      >
    {/if}
  </label>

  {#if isError}
    <p class="input__error-message">{errorMessage}</p>
  {/if}
</div>
