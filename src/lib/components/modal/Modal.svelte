<script lang="ts">
  import './styles.css';
  import type { Snippet } from 'svelte';
  import { m } from '$lib/paraglide/messages';
  import { ModalType, type ModalTypeValue } from './constants';

  type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: Snippet;
    type?: ModalTypeValue;
  };

  const { isOpen, children, onClose, type = ModalType.SLIDE }: ModalProps = $props();
  const classNameFinal = ['modal', type];

  $effect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-shown');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-shown');
    }
  });

  const handleCloseButtonClick = () => {
    if (type === ModalType.FLOATING) {
      onClose?.();
    }
  };

  const handleCloseButtonPointerDown = (evt: PointerEvent) => {
    evt.preventDefault();

    if (type === ModalType.FLOATING) {
      return;
    }

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

<button class="overlay" onclick={onClose} aria-label="overlay" inert={!isOpen}></button>
<div class={classNameFinal} inert={!isOpen}>
  <button
    class="modal__close"
    onpointerdown={handleCloseButtonPointerDown}
    onclick={handleCloseButtonClick}
    aria-label={m.aria_close()}
  ></button>
  <div class="modal__content">{@render children()}</div>
</div>
