<script lang="ts">
  import Header from '$lib/kekstagram/components/header/Header.svelte';
  import Modal from '$lib/kekstagram/components/modal/Modal.svelte';
  import PublicationList from '$lib/kekstagram/components/publication-list/PublicationList.svelte';
  import { pageSlice } from '$lib/store/store.svelte.js';
  import type { PageProps } from './$types';

  const { data }: PageProps = $props();
  const isModalOpen = $derived(pageSlice.getModalState());
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
  <!-- comment list component -->
  {#if comments?.length}
    {#each comments as { id, avatar, message, name } (id)}
      <div>ID: {id}</div>
    {/each}
  {/if}
</Modal>
