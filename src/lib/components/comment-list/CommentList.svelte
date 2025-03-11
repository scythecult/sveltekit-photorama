<script lang="ts">
  import './styles.css';
  import type { Action } from 'svelte/action';
  import { pageSlice } from '$lib/store/store.svelte';
  import type { Comment } from '$lib/types/publication';
  import Stub from '../stub/Stub.svelte';
  import CommentItem from './comment/CommentItem.svelte';

  type CommentListProps = {
    comments: Comment[];
  };

  const { comments }: CommentListProps = $props();
  const publicationId = $derived(pageSlice.state.publicationId);

  const scrollToTop: Action = (node) => {
    $effect(() => {
      if (publicationId) {
        node.scrollTo(0, 0);
      }
    });
  };
</script>

<div class="comments">
  <h2 class="comments__title">Comments</h2>
  <div class="comments__list" use:scrollToTop>
    {#if !comments?.length}
      <Stub>There is no comments yet</Stub>
    {:else}
      {#each comments as comment (comment.id)}
        <CommentItem {...comment} />
      {/each}
    {/if}
  </div>
</div>
