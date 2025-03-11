<script lang="ts">
  import './styles.css';
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
  <button class="modal__close" onpointerdown={handleCloseButtonAction} aria-label="close"></button>
  <div class="modal__content">{@render children()}</div>
</div>
