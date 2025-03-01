<script lang="ts">
  import type { Action } from 'svelte/action';
  import { pageSlice } from '$lib/store/store.svelte';
  import type { Comment } from '$lib/types/picture';
  import Stub from '../stub/Stub.svelte';
  import CommentItem from './comment/CommentItem.svelte';

  type CommentListProps = {
    comments: Comment[];
  };

  const { comments }: CommentListProps = $props();
  const pictureId = $derived(pageSlice.state.pictureId);

  const scrollToTop: Action = (node) => {
    $effect(() => {
      if (pictureId) {
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

<style>
  .comments__list {
    display: grid;
    grid-template-columns: 100%;
    row-gap: 20px;
    max-height: 60dvh;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    overflow-y: scroll;
  }

  .comments__title {
    padding-bottom: 12px;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
  }
</style>
