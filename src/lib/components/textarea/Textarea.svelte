<script lang="ts">
  import './styles.css';

  type TextareaInputHandler = Event & { currentTarget: EventTarget & HTMLTextAreaElement };
  type TextareaKeydonwHandler = Event & KeyboardEvent & { currentTarget: EventTarget & HTMLTextAreaElement };

  type TextareaProps = {
    userValue: string;
    name: string;
    placeholder: string;
    className?: string;
    maxLength?: number;
    onInput?: (value: string) => void;
  };

  let { name, userValue = $bindable(''), className = '', placeholder, onInput, maxLength }: TextareaProps = $props();
  let textareaWidth = $state(0);
  let counterHeight = $state(0);
  const classNameFinal = [className, 'textarea'];

  const handleTextareaInput = (evt: TextareaInputHandler) => {
    const { offsetWidth, value } = evt.currentTarget;

    onInput?.(value);

    textareaWidth = offsetWidth;
  };

  const handleTextareaKeydown = (evt: TextareaKeydonwHandler) => {
    const { key } = evt;

    if (key === 'Enter') {
      evt.preventDefault();
    }
  };
</script>

<textarea
  class={classNameFinal}
  {name}
  {placeholder}
  autocomplete="off"
  aria-label={placeholder}
  style="height: {counterHeight}px"
  oninput={handleTextareaInput}
  onkeydown={handleTextareaKeydown}
  maxlength={maxLength}
  bind:value={userValue}
></textarea>
<span class="textarea__counter" style="max-width: {textareaWidth}px;" bind:clientHeight={counterHeight}
  >{userValue}</span
>
