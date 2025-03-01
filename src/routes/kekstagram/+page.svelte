<script lang="ts">
  import CommentList from '$lib/kekstagram/components/comment-list/CommentList.svelte';
  import Header from '$lib/kekstagram/components/header/Header.svelte';
  import Modal from '$lib/kekstagram/components/modal/Modal.svelte';
  import PublicationList from '$lib/kekstagram/components/publication-list/PublicationList.svelte';
  import { pageSlice } from '$lib/store/store.svelte.js';
  import type { PageProps } from './$types';

  const { data }: PageProps = $props();
  const isModalOpen = $derived(pageSlice.state.isModalVisible);
  const comments = $derived(pageSlice.getCommentsFromPictures(data.pictures));

  const togglePopup = () => {
    pageSlice.toggleModalVisibility();
  };
</script>

<!-- header -->
<Header />
<!-- pictures -->
<PublicationList pictures={data.pictures} />
<!-- comments modal-->
<Modal isOpen={isModalOpen} onClose={togglePopup}>
  <!-- comment list -->
  <CommentList {comments} />
</Modal>
