<script lang="ts">
  export const InputType = {
    HIDDEN: 'hidden',
    TEXT: 'text'
  } as const;

  type InputTypeKey = keyof typeof InputType;
  type InputTypeValue = (typeof InputType)[InputTypeKey];

  type InputProps = {
    type?: InputTypeValue;
    name: string;
    value?: string;
    placeholder: string;
    disabled: boolean;
    required?: boolean;
    className?: string;
  };

  const {
    placeholder,
    name,
    value,
    type = InputType.TEXT,
    disabled = false,
    required = false,
    className = ''
  }: InputProps = $props();
</script>

<input class="input {className}" {value} {type} {disabled} {placeholder} {name} {required} />

<style>
  .input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid darkgray;
    border-radius: 14px;
  }
</style>
