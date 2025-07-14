<script lang="ts">
  import './styles.css';
  import InteractionsButton from '$lib/components/buttons/interactions-button/InteractionsButton.svelte';
  import CommentList from '$lib/components/comment-list/CommentList.svelte';
  import Header from '$lib/components/header/Header.svelte';
  import Logo from '$lib/components/logos/main-logo/Logo.svelte';
  import Modal from '$lib/components/modal/Modal.svelte';
  import PublicationList from '$lib/components/publication-list/PublicationList.svelte';
  import { ModalId } from '$lib/constants/common';
  import { StateContextName } from '$lib/constants/context.js';
  import { type AppState } from '$lib/state/appState.svelte.js';
  import { type ModalState } from '$lib/state/modalState.svelte';
  import type { Publication } from '$lib/types/publication.js';
  import type { UserInfo } from '$lib/types/userInfo.js';
  import { getStateContext } from '$lib/utils/context.js';

  const { data } = $props();

  const getComments = (publications: Publication[] | undefined, commentId: string) => {
    return commentId !== null ? publications?.find((publication) => publication.id === commentId)?.comments || [] : [];
  };

  const userState = getStateContext<UserInfo>(StateContextName.USER);
  const { subscribedUsers = [] } = $derived(userState() ?? {});
  const appState = getStateContext<AppState>(StateContextName.APP);
  const { getPublicationId } = $derived(appState() ?? {});
  const comments = $derived(getComments(data.publications, getPublicationId()));
  const modalState = getStateContext<ModalState>(StateContextName.PUBLICATIONS_PAGE_MODAL);
  const { getId, getVisibilityState, toggleModalVisibility } = $derived(modalState() ?? {});
  const isModalVisible = $derived(getVisibilityState());
  const modalId = $derived(getId());

  const toggleModal = () => {
    toggleModalVisibility();
  };
</script>

<!-- header -->
<Header className="publications-page-header">
  <Logo className="publications-page-header__logo" />
  <div class="publications-page-header__actions">
    <!-- TODO Make chat button -->
    <InteractionsButton />
    <InteractionsButton />
  </div>
</Header>
<section class="publications-page">
  <!-- pictures -->
  <PublicationList publications={data.publications} />
</section>
<!-- comments modal-->
<Modal isOpen={isModalVisible} onClose={toggleModal}>
  <!-- comment list -->
  {#if modalId === ModalId.COMMENT}
    <CommentList {comments} />
  {/if}
  <!-- contacts list -->
  {#if modalId === ModalId.SEND}
    {subscribedUsers}
  {/if}
</Modal>
