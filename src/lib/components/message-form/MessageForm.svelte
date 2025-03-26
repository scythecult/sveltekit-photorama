<script lang="ts">
  import './styles.css';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { enhance } from '$app/forms';
  import { ActionMap, ActionNameMap } from '$lib/constants/action';
  import { userSlice } from '$lib/store/userStore.svelte';
  import { IconName } from '../custom-icon/constants';
  import CustomIcon from '../custom-icon/CustomIcon.svelte';
  import UserAvatar from '../user-avatar/UserAvatar.svelte';

  type MessageFormProps = {
    publicationId: string;
    className?: string;
    onSubmit?: () => void;
  };

  type MessageTextareaHandler = Event & { currentTarget: EventTarget & HTMLTextAreaElement };

  const { id } = $derived(userSlice.getUserInfo());
  const { publicationId, className = '', onSubmit }: MessageFormProps = $props();
  const classNameFinal = ['message-form', className];
  let creating = $state(false);
  let message = $state('');

  let textareaWidth = $state(0);
  let counterHeight = $state(0);
  const isSubmitButtonVisible = $derived(message.length > 0 && !creating);

  const handleMessageInput = (evt: MessageTextareaHandler) => {
    const { offsetWidth } = evt.currentTarget;

    textareaWidth = offsetWidth;
  };

  const handleSubmit: SubmitFunction = async () => {
    creating = true;

    return async ({ update }) => {
      creating = false;

      await update();

      onSubmit?.();
    };
  };
</script>

<form class={classNameFinal} use:enhance={handleSubmit} action="?/{ActionMap.COMMENT_MESSAGE}" method="POST">
  <UserAvatar />

  <textarea
    class="message-form__textarea"
    name={ActionNameMap.MESSAGE}
    placeholder="Add comment..."
    autocomplete="off"
    aria-label="Add comment..."
    style="height: {counterHeight}px"
    oninput={handleMessageInput}
    bind:value={message}
  ></textarea>
  <pre
    class="message-form__counter"
    style="max-width: {textareaWidth}px;"
    bind:clientHeight={counterHeight}>{message}</pre>
  <input type="hidden" name={ActionNameMap.USER_ID} value={id} />
  <input type="hidden" name={ActionNameMap.PUBLICATION_ID} value={publicationId} />

  {#if isSubmitButtonVisible}
    <button class="message-form__submit" type="submit"><CustomIcon iconName={IconName.ARROW} /></button>
  {/if}
</form>
