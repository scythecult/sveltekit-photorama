<script lang="ts">
  import './styles.css';
  import type { Action } from 'svelte/action';
  import { StateContextName } from '$lib/constants/context';
  import { m } from '$lib/paraglide/messages';
  import { type AppState } from '$lib/state/appState.svelte';
  import type { Comment } from '$lib/types/publication';
  import { getStateContext } from '$lib/utils/context';
  import MessageForm from '../forms/message-form/MessageForm.svelte';
  import Stub from '../stub/Stub.svelte';
  import CommentItem from './comment/CommentItem.svelte';

  type CommentListProps = {
    comments: Comment[];
  };

  const { comments }: CommentListProps = $props();
  const appState = getStateContext<AppState>(StateContextName.APP);
  const { getPublicationId } = $derived(appState() ?? {});
  const publicationId = $derived(getPublicationId());

  const scrollToTop: Action = (node) => {
    $effect(() => {
      if (publicationId) {
        node.scrollTo(0, 0);
      }
    });
  };

  const handleMessageFormSubmit = () => {
    const commentNode = document.querySelector('.comments__list .comment:last-child');

    if (commentNode) {
      commentNode.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };
</script>

<div class="comments">
  <h2 class="comments__title">{m['main_page.comments_title']()}</h2>
  <div class="comments__list" use:scrollToTop>
    {#if !comments?.length}
      <div class="comments__stub-container">
        <Stub className="comments__stub">{m['main_page.comments_no_comments']()}</Stub>
        <Stub className="comments__stub comments__stub--smaller">{m['main_page.comments_first_comment']()}</Stub>
      </div>
    {:else}
      {#each comments as comment (comment.id)}
        <CommentItem {...comment} />
      {/each}
    {/if}
  </div>
  {#if publicationId}
    {#key publicationId}
      <MessageForm {publicationId} onSubmit={handleMessageFormSubmit} />
    {/key}
  {/if}
</div>
