<script lang="ts">
  import InteractionsButton from '$lib/components/buttons/interactions-button/InteractionsButton.svelte';
  import CommentList from '$lib/components/comment-list/CommentList.svelte';
  import Header from '$lib/components/header/Header.svelte';
  import Logo from '$lib/components/logo/Logo.svelte';
  import Modal from '$lib/components/modal/Modal.svelte';
  import PublicationList from '$lib/components/publication-list/PublicationList.svelte';
  import { ModalTrigger } from '$lib/constants/common';
  import { appSlice } from '$lib/store/appStore.svelte.js';
  import { userSlice } from '$lib/store/userStore.svelte';

  const publications = $derived(appSlice.getPublications());
  const isModalOpen = $derived(appSlice.getModalState());
  const comments = $derived(appSlice.getComments());
  const userContacts = $derived(userSlice.getContacts());
  const modalTrigger = $derived(appSlice.getModalTrigger());

  const togglePopup = () => {
    appSlice.toggleModalVisibility();
  };
</script>

<!-- header -->
<div class="main-page">
  <Header>
    <Logo />
    <InteractionsButton />
  </Header>
  <!-- pictures -->
  <PublicationList {publications} />
  <!-- comments modal-->
  <Modal isOpen={isModalOpen} onClose={togglePopup}>
    <!-- comment list -->
    {#if modalTrigger === ModalTrigger.COMMENT}
      <CommentList {comments} />
    {/if}
    <!-- contacts list -->
    {#if modalTrigger === ModalTrigger.SEND}
      {userContacts}
    {/if}
  </Modal>
</div>
