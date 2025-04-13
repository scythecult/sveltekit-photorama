<script lang="ts">
  import './styles.css';
  import { onMount } from 'svelte';
  import { navigating } from '$app/state';
  import Link from '$lib/components/link/Link.svelte';
  import IconLogo from '$lib/components/logos/icon-logo/IconLogo.svelte';
  import { ModalType } from '$lib/components/modal/constants';
  import Modal from '$lib/components/modal/Modal.svelte';
  import { LocalStorageName } from '$lib/constants/ls';
  import { AppRoute } from '$lib/constants/url';
  import { m } from '$lib/paraglide/messages';

  const { children } = $props();

  // 5 minutes
  const CLOSE_INTERVAL = 5 * 60 * 1000;
  let closedTime = $state('');
  let isModalOpen = $derived(!closedTime);

  const handleModalClose = () => {
    isModalOpen = false;
    localStorage.setItem(LocalStorageName.FLOATING_MODAL_CLOSE_TIME, Date.now().toString());
  };

  onMount(() => {
    closedTime = localStorage.getItem(LocalStorageName.FLOATING_MODAL_CLOSE_TIME) || '';
  });

  $effect(() => {
    navigating.complete?.then(() => {
      const currentTime = Date.now().toString();
      closedTime = localStorage.getItem(LocalStorageName.FLOATING_MODAL_CLOSE_TIME) || '';

      if (+closedTime + CLOSE_INTERVAL < +currentTime) {
        closedTime = '';
      }
    });
  });
</script>

{@render children()}

<Modal isOpen={isModalOpen} type={ModalType.FLOATING} onClose={handleModalClose}>
  <div class="unregistered-modal">
    <IconLogo className="unregistered-modal__logo" />
    <div class="unregistered-modal__content">
      <h2 class="unregistered-modal__title">{m.floating_modal_title()}</h2>
      <p class="unregistered-modal__description">{m.floating_modal_description()}</p>
    </div>
    <Link className="primary-button" href={AppRoute.SIGNUP} onClick={handleModalClose}>{m.page_register_title()}</Link>
  </div>
</Modal>
