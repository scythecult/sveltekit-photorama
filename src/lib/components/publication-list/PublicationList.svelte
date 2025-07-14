<script lang="ts">
  import './style.css';
  import { m } from '$lib/paraglide/messages';
  import type { Publication } from '$lib/types/publication';
  import Stub from '../stub/Stub.svelte';
  import PublicationItem from './publication/PublicationItem.svelte';

  type PublicationListProps = {
    publications?: Publication[];
  };

  const { publications = [] }: PublicationListProps = $props();
  const isPlaceholderVisible = $derived(!publications?.length);
</script>

<div class="publication-list">
  {#if isPlaceholderVisible}
    <Stub>{m['main_page.publications_empty']()}</Stub>
  {:else}
    {#each publications as publication (publication.id)}
      <PublicationItem {...publication} />
    {/each}
  {/if}
</div>
