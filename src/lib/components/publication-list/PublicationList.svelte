<script lang="ts">
  import './style.css';
  import type { Publication } from '$lib/types/publication';
  import Stub from '../stub/Stub.svelte';
  import PublicationItem from './publication/PublicationItem.svelte';

  type PublicationListProps = {
    publications?: Publication[];
    hashtags?: string[];
  };

  const { publications }: PublicationListProps = $props();
</script>

<div class="publication-list">
  {#if !publications?.length}
    <Stub>No publications found</Stub>
  {:else}
    {#each publications as { id, url, description, likes, hashtags, comments, isLiked } (id)}
      <PublicationItem {id} {url} {description} {hashtags} {likes} {comments} {isLiked} />
    {/each}
  {/if}
</div>
