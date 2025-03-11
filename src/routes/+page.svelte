<script lang="ts">
  import CommentList from '$lib/components/comment-list/CommentList.svelte';
  import Header from '$lib/components/header/Header.svelte';
  import Modal from '$lib/components/modal/Modal.svelte';
  import PublicationList from '$lib/components/publication-list/PublicationList.svelte';
  import { pageSlice } from '$lib/store/store.svelte.js';
  import type { PageProps } from './$types';

  const { data }: PageProps = $props();
  const isModalOpen = $derived(pageSlice.state.isModalVisible);
  const comments = $derived(pageSlice.getCommentsFromPublications(data.publications));

  const togglePopup = () => {
    pageSlice.toggleModalVisibility();
  };
</script>

<!-- header -->
<Header />
<!-- pictures -->
<PublicationList publications={data.publications} />
<!-- comments modal-->
<Modal isOpen={isModalOpen} onClose={togglePopup}>
  <!-- comment list -->
  <CommentList {comments} />
</Modal>
