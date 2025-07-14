<script lang="ts">
  import './styles.css';
  import { onMount } from 'svelte';
  import { navigating } from '$app/state';
  import Link from '$lib/components/link/Link.svelte';
  import IconLogo from '$lib/components/logos/icon-logo/IconLogo.svelte';
  import { ModalType } from '$lib/components/modal/constants';
  import Modal from '$lib/components/modal/Modal.svelte';
  import { AppRoute } from '$lib/constants/app';
  import { m } from '$lib/paraglide/messages';
  import { FloatingModalLsResource } from '$lib/resources/FloatingModalLsResource';

  const { children } = $props();

  const floatingModalLsResource = new FloatingModalLsResource();
  // 5 minutes
  const CLOSE_INTERVAL = 5 * 60 * 1000;
  let closedTime = $state('');
  let isModalVisible = $derived(!closedTime);

  const handleModalClose = () => {
    isModalVisible = false;
    floatingModalLsResource.save(Date.now().toString());
  };

  onMount(() => {
    closedTime = floatingModalLsResource.load();
  });

  $effect(() => {
    navigating.complete?.then(() => {
      const currentTime = Date.now().toString();
      closedTime = floatingModalLsResource.load();

      if (+closedTime + CLOSE_INTERVAL < +currentTime) {
        closedTime = '';
      }
    });
  });
</script>

{@render children()}

<Modal isOpen={isModalVisible} type={ModalType.FLOATING} onClose={handleModalClose}>
  <div class="unregistered-modal">
    <IconLogo className="unregistered-modal__logo" />
    <div class="unregistered-modal__content">
      <h2 class="unregistered-modal__title">{m['modal.floating_title']()}</h2>
      <p class="unregistered-modal__description">{m['modal.floating_description']()}</p>
    </div>
    <Link className="primary-button" href={AppRoute.SIGNUP} onClick={handleModalClose}
      >{m['register_page.title']()}</Link
    >
  </div>
</Modal>
