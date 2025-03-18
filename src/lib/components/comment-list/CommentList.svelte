<script lang="ts">
  import './styles.css';
  import type { Action } from 'svelte/action';
  import { appSlice } from '$lib/store/appStore.svelte';
  import type { Comment } from '$lib/types/publication';
  import MessageForm from '../message-form/MessageForm.svelte';
  import Stub from '../stub/Stub.svelte';
  import CommentItem from './comment/CommentItem.svelte';

  type CommentListProps = {
    comments: Comment[];
  };

  const { comments }: CommentListProps = $props();
  const publicationId = $derived(appSlice.state.publicationPayload.id);

  const scrollToTop: Action = (node) => {
    $effect(() => {
      if (publicationId) {
        node.scrollTo(0, 0);
      }
    });
  };

  const handleMessageFormSubmit = () => {
    const commentNode = document.querySelector('.comment:last-child');

    if (commentNode) {
      commentNode.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };
</script>

<div class="comments">
  <h2 class="comments__title">Comments</h2>
  <div class="comments__list" use:scrollToTop>
    {#if !comments?.length}
      <div class="comments__stub-container">
        <Stub className="comments__stub">There is no comments yet</Stub>
        <Stub className="comments__stub comments__stub--smaller">Post your first comment</Stub>
      </div>
    {:else}
      {#each comments as comment (comment.id)}
        <CommentItem {...comment} />
      {/each}
    {/if}
  </div>
  {#if publicationId !== null}
    <MessageForm {publicationId} onSubmit={handleMessageFormSubmit} />
  {/if}
</div>
