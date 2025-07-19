<script lang="ts">
  import './styles.css';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { HTTPMethod } from 'http-method-enum';
  import Bubble from '$lib/components/bubble/Bubble.svelte';
  import { IconName, IconSize } from '$lib/components/custom-icon/constants';
  import CustomIcon from '$lib/components/custom-icon/CustomIcon.svelte';
  import { UserAvatarSize } from '$lib/components/user-avatar/constants';
  import UserAvatar from '$lib/components/user-avatar/UserAvatar.svelte';
  import { FormActionName, InputName } from '$lib/constants/action';
  import { UserAuditory } from '$lib/constants/user';
  import { m } from '$lib/paraglide/messages';
  import type { Auditory } from '$lib/types/user';
  import Form from '../form/Form.svelte';

  type NoteFormProps = {
    userId: string;
    auditory?: Auditory;
    className?: string;
    onSubmit?: () => void;
  };

  const MAX_NOTE_LENGTH = 60;
  const MAX_NOTE_LENGTH_THRESHOLD = 5;

  const { userId, auditory, onSubmit }: NoteFormProps = $props();

  const noteFormState = $state({
    isCreating: false,
    noteMessage: '',
    publishAuditory: auditory || UserAuditory.SUBSCRIBED,
    isPublishAuditoryVisible: false,
  });
  const isNoteLimitMessageVisible = $derived(
    noteFormState.noteMessage.length >= MAX_NOTE_LENGTH - MAX_NOTE_LENGTH_THRESHOLD,
  );
  const isSubmitButtonDisabled = $derived(!noteFormState.noteMessage.length || noteFormState.isCreating);
  const publishAuditoryText = $derived(
    noteFormState.publishAuditory === UserAuditory.SUBSCRIBED
      ? m['input.button_note_subscribed']()
      : m['input.button_note_friends'](),
  );

  const handleSubmit: SubmitFunction = () => {
    noteFormState.isCreating = true;

    return async ({ update }) => {
      await update();

      noteFormState.isCreating = false;
      noteFormState.noteMessage = '';
      onSubmit?.();
    };
  };

  const handleBubbleInput = (value: string) => {
    noteFormState.noteMessage = value;
  };

  const handlePublishAuditoryButtonClick = () => {
    noteFormState.isPublishAuditoryVisible = true;
  };

  const handleAuditoryDropdownChange = () => {
    noteFormState.isPublishAuditoryVisible = false;
  };
</script>

<Form
  className="note-form"
  action="?/{FormActionName.CREATE_NOTE}"
  method={HTTPMethod.POST}
  onSubmit={handleSubmit}
  buttonText={m['input.button_share']()}
  buttonType="secondary"
  {isSubmitButtonDisabled}
>
  <input type="hidden" name={InputName.USER_ID} value={userId} aria-hidden="true" />
  <input type="hidden" name={InputName.NOTE_MESSAGE} value={noteFormState.noteMessage} aria-hidden="true" />
  <input type="hidden" name={InputName.AUDITORY} value={noteFormState.publishAuditory} aria-hidden="true" />

  <div class="note-form__content">
    <Bubble className="note-form__bubble" onInput={handleBubbleInput} maxLength={MAX_NOTE_LENGTH} />
    <UserAvatar className="note-form__avatar" avatarSize={UserAvatarSize.INHERIT} />
    {#if isNoteLimitMessageVisible}
      <p class="note-form__message-limit">
        {noteFormState.noteMessage.length}/{MAX_NOTE_LENGTH}
      </p>
    {/if}
  </div>
</Form>
<!-- TODO Move to component? -->
<button class="auditory-button" onclick={handlePublishAuditoryButtonClick}
  ><CustomIcon iconName={IconName.USERS} iconSize={IconSize.SMALL} /><span
    >{m['input.button_note_publish']()}: <b>{publishAuditoryText}</b></span
  >
  <CustomIcon className="auditory-button__icon" iconName={IconName.CHEVRON} iconSize={IconSize.SMALL} />
  {#if noteFormState.isPublishAuditoryVisible}
    <span class="auditory-button__dropdown">
      <label class="auditory-button__label" for="auditory-subscribed">
        <input
          class="auditory-button__radio"
          type="radio"
          name="auditory"
          value={UserAuditory.SUBSCRIBED}
          id="auditory-subscribed"
          onchange={handleAuditoryDropdownChange}
          bind:group={noteFormState.publishAuditory}
        />
        {m['input.radio_auditory_subscribed']()}
      </label>
      <label class="auditory-button__label" for="auditory-friends">
        <input
          class="auditory-button__radio"
          type="radio"
          name="auditory"
          value={UserAuditory.FRIEDNDS}
          id="auditory-friends"
          onchange={handleAuditoryDropdownChange}
          bind:group={noteFormState.publishAuditory}
        />
        {m['input.radio_auditory_friends']()}
      </label>
    </span>
  {/if}
</button>
