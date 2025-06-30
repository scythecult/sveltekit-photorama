<script lang="ts">
  import './styles.css';
  import { onMount } from 'svelte';
  import Spinner from '../spinners/Spinner.svelte';
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
  let isLoading = $state(true);

  onMount(() => {
    isLoading = false;
  });
</script>

{#if isPresentation}
  <button class={classNameFinal} onclick={onClick}>
    {#if isLoading}
      <Spinner />
    {:else if presentationMessage}
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
