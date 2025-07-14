<script lang="ts">
  import './styles.css';
  import { page } from '$app/state';
  import Bubble from '$lib/components/bubble/Bubble.svelte';
  import { IconName, IconSize } from '$lib/components/custom-icon/constants';
  import CustomIcon from '$lib/components/custom-icon/CustomIcon.svelte';
  import NoteForm from '$lib/components/forms/note-form/NoteForm.svelte';
  import Header from '$lib/components/header/Header.svelte';
  import Link from '$lib/components/link/Link.svelte';
  import { ModalType } from '$lib/components/modal/constants';
  import Modal from '$lib/components/modal/Modal.svelte';
  import { UserAvatarMode, UserAvatarSize } from '$lib/components/user-avatar/constants';
  import UserAvatar from '$lib/components/user-avatar/UserAvatar.svelte';
  import { AppRoute } from '$lib/constants/app';
  import { ModalId } from '$lib/constants/common';
  import { StateContextName } from '$lib/constants/context';
  import { m } from '$lib/paraglide/messages';
  import { type ModalState } from '$lib/state/modalState.svelte';
  import type { UserInfo } from '$lib/types/userInfo';
  import { getStateContext } from '$lib/utils/context';

  const { children } = $props();
  const userState = getStateContext<UserInfo>(StateContextName.USER);
  const modalState = getStateContext<ModalState>(StateContextName.PROFILE_PAGE_MODAL);
  const { username, fullname, id, noteMessage } = $derived(userState() ?? {});
  const { getVisibilityState, getId, getType, setId, setType, toggleModalVisibility } = $derived(modalState() ?? {});
  const isModalVisible = $derived(getVisibilityState());
  const modalId = $derived(getId());
  const modalType = $derived(getType());
  const isActivityBarVisible = $derived(
    !(page.url.pathname.includes(AppRoute.FOLLOWERS) || page.url.pathname.includes(AppRoute.FOLLOWING)),
  );

  const togglePopup = () => {
    toggleModalVisibility();
  };

  const handleUsernameClick = () => {
    setId(ModalId.PROFILE_NAME);
    setType(ModalType.SLIDE);
    toggleModalVisibility();
  };

  const handleNoteClick = () => {
    setId(ModalId.NOTE);
    setType(ModalType.FLOATING);
    toggleModalVisibility();
  };
</script>

<Header className="profile-header">
  <Link className="profile-header__link" href={`${AppRoute.ACCOUNTS}${AppRoute.SETTINGS}`}
    ><CustomIcon iconName={IconName.OPTIONS} /></Link
  >

  <button class="profile-header__name" onclick={handleUsernameClick}
    >{username}<CustomIcon
      className="profile-header__name-icon"
      iconSize={IconSize.SMALL}
      iconName={IconName.CHEVRON}
    /></button
  >
</Header>
<section class="profile-page">
  <div class="profile-page__heading">
    <div class="profile-page__info">
      <div class="profile-page__user-info">
        <Bubble
          className="profile-page__bubble"
          onClick={handleNoteClick}
          isPresentation
          presentationMessage={noteMessage}
        />
        <UserAvatar mode={UserAvatarMode.IMAGE} avatarSize={UserAvatarSize.XLARGE} />
      </div>

      <div class="profile-page__settings">
        <button class="profile-page__settings-button profile-page__settings-button--name">{fullname}</button>
        <div class="profile-page__settings-actions">
          <Link
            className="profile-page__settings-button profile-page__settings-button--edit primary-button"
            href={`${AppRoute.ACCOUNTS}${AppRoute.EDIT}`}>{m['profile_page.edit']()}</Link
          >
          <Link
            className="profile-page__settings-button profile-page__settings-button--archive primary-button"
            href={`${AppRoute.ARCHIVE}${AppRoute.PUBLICATIONS}`}>{m['profile_page.view']()}</Link
          >
        </div>
      </div>
      <span class="profile-page__user-name">{username}</span>
    </div>
    <div class="profile-page__stats">
      <Link className="profile-page__stats-link" href={`/${username}`}
        ><span class="profile-page__stats-count">30</span> {m['profile_page.posts']()}</Link
      >
      <Link className="profile-page__stats-link" href={`/${username}${AppRoute.FOLLOWERS}`}
        ><span class="profile-page__stats-count">30</span>{m['profile_page.followers']()}</Link
      >
      <Link className="profile-page__stats-link" href={`/${username}${AppRoute.FOLLOWING}`}
        ><span class="profile-page__stats-count">30</span>{m['profile_page.following']()}</Link
      >
    </div>

    {#if isActivityBarVisible}
      <div class="profile-page__activities">
        <Link
          className={(isActive) =>
            isActive ? 'profile-page__activities-link active' : 'profile-page__activities-link'}
          href={`/${username}`}><CustomIcon iconName={IconName.POSTS} /></Link
        >
        <Link
          className={(isActive) =>
            isActive ? 'profile-page__activities-link active' : 'profile-page__activities-link'}
          href={`/${username}${AppRoute.FEED}`}><CustomIcon iconName={IconName.FEED} /></Link
        >
        <Link
          className={(isActive) =>
            isActive ? 'profile-page__activities-link active' : 'profile-page__activities-link'}
          href={`/${username}${AppRoute.SAVED}`}><CustomIcon iconName={IconName.SAVED} /></Link
        >
        <Link
          className={(isActive) =>
            isActive ? 'profile-page__activities-link active' : 'profile-page__activities-link'}
          href={`/${username}${AppRoute.TAGGED}`}><CustomIcon iconName={IconName.TAGGED} /></Link
        >
      </div>
    {:else}
      search bar
    {/if}
  </div>
  {@render children()}
</section>

<Modal isOpen={isModalVisible} onClose={togglePopup} type={modalType}>
  <!-- Reset all inner content state -->
  {#key isModalVisible}
    {#if modalId === ModalId.PROFILE_NAME}
      Profile name content
    {:else if modalId === ModalId.NOTE}
      <NoteForm userId={id} onSubmit={togglePopup} />
    {:else}
      PROFILE actions
    {/if}
  {/key}
</Modal>
