<script lang="ts">
  import './styles.css';
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
  const classNameFinal = [
    className,
    'bubble',
    isPresentation && 'bubble--presentation',
    isPresentation && presentationMessage && 'bubble--active',
  ];
</script>

{#if isPresentation}
  <button class={classNameFinal} onclick={onClick}>
    {#if presentationMessage}
      {presentationMessage}
    {:else}
      Note...
    {/if}
  </button>
{:else}
  <div class={classNameFinal}>
    <Textarea placeholder="Note..." {onInput} name="bubble" userValue="" {maxLength} />
  </div>
{/if}
