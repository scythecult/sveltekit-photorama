<script lang="ts">
  import './styles.css';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { StatusCodes } from 'http-status-codes';
  import { enhance } from '$app/forms';
  import { ActionMap, ActionNameMap } from '$lib/constants/action';
  import { userStore } from '$lib/store/userStore.svelte';
  import { IconName } from '../custom-icon/constants';
  import CustomIcon from '../custom-icon/CustomIcon.svelte';
  import UserAvatar from '../user-avatar/UserAvatar.svelte';

  type MessageFormProps = {
    publicationId: string;
    className?: string;
    onSubmit?: () => void;
  };

  type MessageTextareaHandler = Event & KeyboardEvent & { currentTarget: EventTarget & HTMLTextAreaElement };

  const { id } = $derived(userStore.getUserInfo());
  const { publicationId, className = '', onSubmit }: MessageFormProps = $props();
  const classNameFinal = ['message-form', className];
  let creating = $state(false);
  let message = $state('');
  let errorMessage = $state('');

  let textareaWidth = $state(0);
  let counterHeight = $state(0);
  const isSubmitButtonVisible = $derived(message.length > 0 && !creating);

  const handleMessageKeydown = (evt: MessageTextareaHandler) => {
    const { key } = evt;
    const { offsetWidth } = evt.currentTarget;

    if (key === 'Enter') {
      evt.preventDefault();
    }

    textareaWidth = offsetWidth;
  };

  const handleSubmit: SubmitFunction = async () => {
    creating = true;

    return async ({ update, result }) => {
      await update();

      creating = false;

      if (result.status !== StatusCodes.OK) {
        errorMessage = result.type;

        return;
      }

      errorMessage = '';
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
    onkeydown={handleMessageKeydown}
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

  {#if errorMessage}
    <p class="message-form__error-message">{errorMessage}</p>
  {/if}
</form>
