<script>
  import Modal from '$lib/components/modal/Modal.svelte';
  import { modalStore } from '$lib/store/modalStore.svelte';

  const isModalOpen = $derived(modalStore.getVisibilityState());

  const togglePopup = () => {
    modalStore.toggleModalVisibility();
  };
</script>

<p>PROFILE page</p>
<button onclick={togglePopup}>open modal</button>
<Modal isOpen={isModalOpen} onClose={togglePopup}>PROFILE actions</Modal>
