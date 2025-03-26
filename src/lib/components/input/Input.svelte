<script lang="ts">
  import './styles.css';

  type InputProps = {
    name: string;
    type: string;
    placeholder: string;
    isError: boolean;
    maxlength?: number;
    minlength?: number;
    className?: string;
    errorMessage?: string;
    onInput?: (value: string) => void;
  };

  const {
    isError,
    type,
    className,
    name,
    placeholder,
    maxlength,
    minlength,
    onInput,
    errorMessage = '',
  }: InputProps = $props();
  let value = $state('');
  let isActive = $derived(value.length > 0);
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
</script>

<div class={classNameFinal}>
  <label class="input__label" for={name}>
    <span class="input__placeholder">{placeholder}</span>
    <input
      class="input__field"
      type={isPasswordVisible && type === 'password' ? 'text' : type}
      autocapitalize="off"
      autocomplete="off"
      {minlength}
      {maxlength}
      {name}
      aria-label={placeholder}
      aria-required="true"
      id={name}
      bind:value
      oninput={(evt: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
        onInput?.(evt.currentTarget?.value);
      }}
    />

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
