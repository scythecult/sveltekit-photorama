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

  const handleCloseButtonAction = (evt: PointerEvent) => {
    evt.preventDefault();

    const closeButton = evt.currentTarget;
    let touchStartPoint = evt.clientY;
    let touchEndPoint = 0;

    if (closeButton && closeButton instanceof HTMLButtonElement) {
      closeButton.setPointerCapture(evt.pointerId);

      closeButton.onpointermove = (evt: PointerEvent) => {
        touchEndPoint = evt.clientY;
      };

      closeButton.onpointerup = () => {
        if (touchStartPoint < touchEndPoint) {
          onClose?.();
        }

        closeButton.onpointermove = null;
        closeButton.onpointerup = null;
      };
    }
  };
</script>

<button class="overlay" onclick={onClose} aria-label="overlay"></button>
<div class="modal">
  <!-- TODO Enlarge dash area -->
  <button class="modal__close" onpointerdown={handleCloseButtonAction} aria-label="close"></button>
  <div class="modal__content">{@render children()}</div>
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
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
    max-width: 500px;
    min-height: 300px;
    padding-top: 14px;
    background-color: var(--bg-theme-dark);
    border-radius: 32px 32px 0 0;
    transform: translate(-50%, 100%);
    transition-property: transform;
    transition-duration: 0.7s;
  }

  .modal__close {
    padding: 0;
    width: 24px;
    height: 3px;
    background-color: var(--color-gray);
    border: none;
    touch-action: none;
  }

  .modal__content {
    width: 100%;
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
