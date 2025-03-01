<script lang="ts">
  import type { Picture } from '$lib/types/picture';
  import Stub from '../stub/Stub.svelte';
  import PublicationItem from './publication/PublicationItem.svelte';

  type PublicationListProps = {
    pictures?: Picture[];
    hashtags?: string[];
  };

  const { pictures }: PublicationListProps = $props();
</script>

<div class="publication-list">
  {#if !pictures?.length}
    <Stub>No pictures found</Stub>
  {:else}
    {#each pictures as { id, url, description, likes, hashtags, comments } (id)}
      <PublicationItem {id} {url} {description} {hashtags} {likes} {comments} />
    {/each}
  {/if}
</div>

<style>
  .publication-list {
    display: grid;
    grid-template-columns: 100%;
    gap: 26px;

    @media (min-width: 500px) {
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }

    @media (min-width: 700px) {
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media (min-width: 1440px) {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }

    @media (min-width: 1900px) {
      grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
    }
  }
</style>
