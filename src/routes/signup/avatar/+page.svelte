<script lang="ts">
  import './styles.css';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { HTTPMethod } from 'http-method-enum';
  import { goto } from '$app/navigation';
  import { IconName, IconSize } from '$lib/components/custom-icon/constants';
  import CustomIcon from '$lib/components/custom-icon/CustomIcon.svelte';
  import SignupForm from '$lib/components/forms/signup-form/SignupForm.svelte';
  import UploadInput from '$lib/components/inputs/upload-input/UploadInput.svelte';
  import Modal from '$lib/components/modal/Modal.svelte';
  import { FormActionName, InputName } from '$lib/constants/action';
  import { AppRoute } from '$lib/constants/app';
  import { ALLOWED_FILE_TYPES, MAX_PICTURE_SIZE } from '$lib/constants/common';
  import { m } from '$lib/paraglide/messages';
  import { modalStore } from '$lib/store/modalStore.svelte';
  import { signupStore } from '$lib/store/signupStore.svelte';
  import type { ResponseSignupAvatarErrorInfoPayload } from '$lib/types/responsePayload';
  import { createImageURL, formatFileSize, isFileSizeValid, isFileTypeValid } from '$lib/utils/utils';

  const { data } = $props();
  // TODO Check if avatar url exists, instead of submitting form call "goto"
  const avatarUploadState = $state({
    avatarUrl: data.avatarUrl,
    fileSize: 0,
    validationResult: {
      isFileSizeValid: true,
      isFileTypeValid: true,
      // TODO Add image dimensions validation by creating custom function
      isImageDimensionsValid: true,
    },
  });
  const isSubmitButtonDisabled = $derived(!Object.values(avatarUploadState.validationResult).every(Boolean));
  const formActionUrl = $derived(
    avatarUploadState.fileSize || avatarUploadState.avatarUrl
      ? FormActionName.SIGNUP_AVATAR
      : FormActionName.SIGNUP_AVATAR_DEFAULT,
  );
  const userFullname = $derived(signupStore.getProperty(InputName.FULLNAME));
  const isModalOpen = $derived(modalStore.getVisibilityState());
  const isAvatarAvailable = $derived(Boolean(avatarUploadState.avatarUrl));
  const formTitleText = $derived(
    isAvatarAvailable ? m['signup_page.photo_loaded_title']() : m['signup_page.photo_title'](),
  );
  const formDescriptionText = $derived(isAvatarAvailable ? '' : m['signup_page.photo_description']());
  const formButtonType = $derived(isAvatarAvailable ? 'primary' : 'secondary');
  const formButtonText = $derived(isAvatarAvailable ? m['input.button_done']() : m['input.button_skip']());
  const uploadButtonClassNameFinal = $derived([
    isAvatarAvailable ? 'avatar-form__upload-button secondary-button' : 'primary-button',
  ]);
  const uploadButtonText = $derived(
    isAvatarAvailable ? m['input.button_change_photo']() : m['input.button_add_picture'](),
  );

  const toggleModal = () => modalStore.toggleModalVisibility();

  const handleUploadClick = () => {
    toggleModal();
  };

  const handleUploadChange = async (file: File) => {
    const validationResult = {
      isFileSizeValid: isFileSizeValid(file.size),
      isFileTypeValid: isFileTypeValid(file.type),
      isImageDimensionsValid: true,
    };

    avatarUploadState.validationResult = validationResult;
    avatarUploadState.fileSize = file.size;

    if (Object.values(validationResult).every(Boolean)) {
      const avatarUrl = createImageURL(file);

      avatarUploadState.avatarUrl = avatarUrl;
    }

    toggleModal();
  };

  const handleEditClick = () => {
    // eslint-disable-next-line no-console
    console.info('open image editor');
  };

  const handleAvatarSubmit: SubmitFunction = () => {
    return async ({ update, result }) => {
      await update();

      if (result.type === 'failure' || result.type === 'success') {
        const data = result.data as ResponseSignupAvatarErrorInfoPayload;

        avatarUploadState.validationResult = data.validationResult;
      }

      if (result.type === 'success') {
        goto(`${AppRoute.SIGNUP}${AppRoute.CONFIRM}`);
      }
    };
  };
</script>

<!-- /* TODO If no avatar file provided change action="?/{FormActionName.SIGNUP_AVATAR}" to "?/{FormActionName.SIGNUP_DEFAULT_AVATAR}" */ -->
<SignupForm
  className="avatar-form"
  title={formTitleText}
  enctype="multipart/form-data"
  description={formDescriptionText}
  buttonType={formButtonType}
  buttonText={formButtonText}
  action="?/{formActionUrl}"
  method={HTTPMethod.POST}
  onSubmit={handleAvatarSubmit}
  {isSubmitButtonDisabled}
>
  <!-- TODO Check for avatar component -->
  <div class="avatar-preview">
    {#if isAvatarAvailable}
      <div class="avatar-preview__image-container">
        <img class="avatar-preview__image" src={avatarUploadState.avatarUrl} alt={userFullname} />
      </div>
      <button
        class="avatar-preview__button avatar-preview__button--edit primary-button"
        onclick={handleEditClick}
        type="button"
      >
        <CustomIcon iconName={IconName.PROFILE} iconSize={IconSize.SMALL} />
        {m['input.button_edit']()}</button
      >
    {:else}
      <div class="avatar-preview__image-container">
        <CustomIcon iconName={IconName.PROFILE} iconSize={IconSize.INHERIT} />
      </div>
    {/if}
  </div>

  {#if !Object.values(avatarUploadState.validationResult).every(Boolean)}
    <div class="avatar-preview__errors">
      {#if !avatarUploadState.validationResult.isFileTypeValid}
        <p class="avatar-preview__error">
          {m['input.avatar_file_type_error']()}
          <span class="avatar-preview__error avatar-preview__error--correct">{ALLOWED_FILE_TYPES.join(', ')}</span>
        </p>
      {/if}

      {#if !avatarUploadState.validationResult.isFileSizeValid}
        <p class="avatar-preview__error">
          {m['input.avatar_file_size_error_1']()}
          <span class="avatar-preview__error avatar-preview__error--correct">
            {m['input.avatar_file_size_error_2']({ allowed: formatFileSize(MAX_PICTURE_SIZE) })}
          </span>
        </p>
      {/if}
    </div>
  {/if}
  <!-- If avatar added -> show block with "share avatar as first post" toggle   -->
  <!-- If avatar added -> show block with "share avatar as first post" description   -->
  <UploadInput
    className="avatar-form__upload-input"
    name={InputName.AVATAR}
    onChange={handleUploadChange}
    placeholder={m['input.picture_placeholder']()}
    accept={ALLOWED_FILE_TYPES.join()}
    isLabelSeparate
  />
  <button class={uploadButtonClassNameFinal} onclick={handleUploadClick} type="button">{uploadButtonText}</button>
</SignupForm>

<Modal isOpen={isModalOpen} onClose={toggleModal}>
  <div class="avatar-modal">
    <h2 class="avatar-modal__title">{m['signup_page.modal_title']()}</h2>

    <div class="avatar-modal__actions">
      <label class="avatar-modal__button primary-button" for={InputName.AVATAR}
        >{m['input.picture_placeholder']()}</label
      >

      <button class="avatar-modal__button primary-button">{m['input.button_take_photo']()}</button>
    </div>
  </div>
</Modal>
