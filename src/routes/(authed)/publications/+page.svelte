<script lang="ts">
  import InteractionsButton from '$lib/components/buttons/interactions-button/InteractionsButton.svelte';
  import CommentList from '$lib/components/comment-list/CommentList.svelte';
  import Header from '$lib/components/header/Header.svelte';
  import Logo from '$lib/components/logos/main-logo/Logo.svelte';
  import Modal from '$lib/components/modal/Modal.svelte';
  import PublicationList from '$lib/components/publication-list/PublicationList.svelte';
  import { ModalId } from '$lib/constants/common';
  import { appStore } from '$lib/store/appStore.svelte.js';
  import { modalStore } from '$lib/store/modalStore.svelte.js';
  import { userStore } from '$lib/store/userStore.svelte';
  import type { Publication } from '$lib/types/publication.js';

  const { data } = $props();

  const getComments = (publications: Publication[] | undefined, commentId: string) => {
    return commentId !== null ? publications?.find((publication) => publication.id === commentId)?.comments || [] : [];
  };

  const comments = $derived(getComments(data.publications, appStore.getPublicationId()));
  const userContacts = $derived(userStore.getContacts());
  const modalId = $derived(modalStore.getId());
  const isModalOpen = $derived(modalStore.getVisibilityState());

  const toggleModal = () => {
    modalStore.toggleModalVisibility();
  };
</script>

<!-- header -->
<Header className="main-page-header">
  <Logo />
  <InteractionsButton />
</Header>
<section class="main-page">
  <!-- pictures -->
  <PublicationList publications={data.publications} />
</section>
<!-- comments modal-->
<Modal isOpen={isModalOpen} onClose={toggleModal}>
  <!-- comment list -->
  {#if modalId === ModalId.COMMENT}
    <CommentList {comments} />
  {/if}
  <!-- contacts list -->
  {#if modalId === ModalId.SEND}
    {userContacts}
  {/if}
</Modal>
