<script lang="ts">
  import './styles.css';
  import { InputName } from '$lib/constants/action';
  import { m } from '$lib/paraglide/messages';
  import Textarea from '../textarea/Textarea.svelte';

  type BubbleProps = {
    className?: string;
    isPresentation?: boolean;
    onClick?: () => void;
    onInput?: (value: string) => void;
    maxLength?: number;
    presentationMessage?: string;
  };

  const { className = '', isPresentation, onClick, onInput, maxLength, presentationMessage }: BubbleProps = $props();
  const classNameFinal = $derived([
    className,
    'bubble',
    isPresentation && 'bubble--presentation',
    isPresentation && presentationMessage && 'bubble--active',
  ]);
</script>

{#if isPresentation}
  <button class={classNameFinal} onclick={onClick}>
    {#if presentationMessage}
      {presentationMessage}
    {:else}
      {m['input.button_note']()}
    {/if}
  </button>
{:else}
  <div class={classNameFinal}>
    <Textarea placeholder={m['input.button_note']()} {onInput} name={InputName.BUBBLE} {maxLength} />
  </div>
{/if}
