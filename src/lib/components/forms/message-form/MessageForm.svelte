<script lang="ts">
  import './styles.css';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { StatusCodes } from 'http-status-codes';
  import { enhance } from '$app/forms';
  import Textarea from '$lib/components/textarea/Textarea.svelte';
  import { FormActionName, InputName } from '$lib/constants/action';
  import { userStore } from '$lib/store/userStore.svelte';
  import { IconName } from '../../custom-icon/constants';
  import CustomIcon from '../../custom-icon/CustomIcon.svelte';
  import UserAvatar from '../../user-avatar/UserAvatar.svelte';

  type MessageFormProps = {
    publicationId: string;
    className?: string;
    onSubmit?: () => void;
  };

  const { id } = $derived(userStore.getUserInfo());
  const { publicationId, className = '', onSubmit }: MessageFormProps = $props();
  const classNameFinal = ['message-form', className];
  let creating = $state(false);
  let message = $state('');
  let errorMessage = $state('');
  let isSubmitButtonVisible = $state(false);

  const handleMessageInput = (value: string) => {
    message = value;

    isSubmitButtonVisible = message.length > 0 && !creating;
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

<form class={classNameFinal} use:enhance={handleSubmit} action="?/{FormActionName.COMMENT_MESSAGE}" method="POST">
  <UserAvatar />

  <Textarea name={InputName.MESSAGE} placeholder="Add comment..." userValue={message} onInput={handleMessageInput} />
  <input type="hidden" name={InputName.USER_ID} value={id} />
  <input type="hidden" name={InputName.PUBLICATION_ID} value={publicationId} />

  {#if isSubmitButtonVisible}
    <button class="message-form__submit" type="submit"><CustomIcon iconName={IconName.ARROW} /></button>
  {/if}

  {#if errorMessage}
    <p class="message-form__error-message">{errorMessage}</p>
  {/if}
</form>
