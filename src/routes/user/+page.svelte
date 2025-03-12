<script>
  import Modal from '$lib/components/modal/Modal.svelte';
  import { appSlice } from '$lib/store/appStore.svelte.js';

  const isModalOpen = $derived(appSlice.state.isModalVisible);

  const togglePopup = () => {
    appSlice.toggleModalVisibility();
  };
</script>

<p>user page</p>
<button onclick={togglePopup}>open modal</button>
<Modal isOpen={isModalOpen} onClose={togglePopup}>user actions</Modal>
