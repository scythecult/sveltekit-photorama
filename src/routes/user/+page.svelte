<script>
  import Modal from '$lib/components/modal/Modal.svelte';
  import { pageSlice } from '$lib/store/store.svelte.js';

  const isModalOpen = $derived(pageSlice.state.isModalVisible);

  const togglePopup = () => {
    pageSlice.toggleModalVisibility();
  };
</script>

<p>user page</p>
<button onclick={togglePopup}>open modal</button>
<Modal isOpen={isModalOpen} onClose={togglePopup}>user actions</Modal>
