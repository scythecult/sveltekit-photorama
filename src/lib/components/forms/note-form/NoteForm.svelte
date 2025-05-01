<script lang="ts">
  import './styles.css';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { enhance } from '$app/forms';
  import Bubble from '$lib/components/bubble/Bubble.svelte';
  import { UserAvatarSize } from '$lib/components/user-avatar/constants';
  import UserAvatar from '$lib/components/user-avatar/UserAvatar.svelte';
  import { ActionMap, ActionNameMap } from '$lib/constants/action';

  type NoteFormProps = {
    userId: string;
    className?: string;
    onSubmit?: () => void;
  };

  const MAX_NOTE_LENGTH = 60;
  const MAX_NOTE_LENGTH_THRESHOLD = 5;

  let creating = $state(false);
  let noteMessage = $state('');
  const isNoteLimitMessageVisible = $derived(noteMessage.length >= MAX_NOTE_LENGTH - MAX_NOTE_LENGTH_THRESHOLD);
  const isSubmitButtonVisible = $derived(noteMessage.length && !creating);
  const { userId, onSubmit }: NoteFormProps = $props();

  const handleBubbleInput = (value: string) => {
    noteMessage = value;
  };

  const handleSubmit: SubmitFunction = () => {
    creating = true;

    return async ({ update }) => {
      await update();

      creating = false;
      noteMessage = '';
      onSubmit?.();
    };
  };
</script>

<form class="note-form" action="?/{ActionMap.CREATE_NOTE}" method="POST" use:enhance={handleSubmit}>
  <h2 class="note-form__title">New note</h2>

  <input type="hidden" name={ActionNameMap.USER_ID} value={userId} aria-hidden="true" />
  <input type="hidden" name={ActionNameMap.NOTE_MESSAGE} value={noteMessage} aria-hidden="true" />

  <div class="note-form__content">
    <Bubble className="note-form__bubble" onInput={handleBubbleInput} maxLength={MAX_NOTE_LENGTH} />
    <UserAvatar className="note-form__avatar" avatarSize={UserAvatarSize.INHERIT} isAvatarOnly />
    <div class="note-form__controls">
      {#if isNoteLimitMessageVisible}
        <p class="note-form__message-limit">
          {noteMessage.length}/{MAX_NOTE_LENGTH}
        </p>
      {/if}
      {#if isSubmitButtonVisible}
        <button class="note-form__submit" type="submit">Share</button>
      {/if}
    </div>
  </div>
  <div class="note-form__actions">note visibility</div>
</form>
