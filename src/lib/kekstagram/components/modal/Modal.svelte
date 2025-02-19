<script lang="ts">
  import type { Snippet } from 'svelte';

  type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: Snippet;
  };

  const { isOpen, children, onClose }: ModalProps = $props();

  $effect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-shown');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-shown');
    }
  });
</script>

<!-- TODO overlay -->
<!-- component -->
<!-- close dash -->
<!-- comment heading text (comments) -->
<!-- comments list -->
<!-- user avatar - username - time - author-like -->
<!-- user avatar - comment - comment - author-like -->
<!-- comment text-area -->
<button class="overlay" onclick={onClose} aria-label="overlay"></button>
<div class="modal">
  <dir class="modal__content"> {@render children()} </dir>
</div>

<style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100dvh;
    padding: 0;
    background-color: transparent;
    border: none;
    backdrop-filter: blur(0px);
    pointer-events: none;
    transform: translateX(-100%);
    transition-property: backdrop-filter;
    transition-duration: 0.3s;
  }

  .modal {
    position: fixed;
    bottom: 0;
    left: 50%;
    width: 100%;
    max-width: 500px;
    min-height: 300px;
    background-color: var(--bg-theme-dark);
    transform: translate(-50%, 300px);
    transition-property: transform;
    transition-duration: 0.3s;
  }

  :global(.modal-shown) {
    .overlay {
      opacity: 1;
      pointer-events: all;
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(var(--bg-blur-amount));
      transform: translateX(0);
    }

    .modal {
      transform: translate(-50%, 0);
    }
  }
</style>
