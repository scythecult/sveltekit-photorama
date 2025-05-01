<script>
  import './styles.css';
  import Bubble from '$lib/components/bubble/Bubble.svelte';
  import { IconName, IconSize } from '$lib/components/custom-icon/constants';
  import CustomIcon from '$lib/components/custom-icon/CustomIcon.svelte';
  import NoteForm from '$lib/components/forms/note-form/NoteForm.svelte';
  import Header from '$lib/components/header/Header.svelte';
  import Link from '$lib/components/link/Link.svelte';
  import { ModalType } from '$lib/components/modal/constants';
  import Modal from '$lib/components/modal/Modal.svelte';
  import { UserAvatarSize } from '$lib/components/user-avatar/constants';
  import UserAvatar from '$lib/components/user-avatar/UserAvatar.svelte';
  import { AppRoute } from '$lib/constants/app';
  import { ModalId } from '$lib/constants/common';
  import { m } from '$lib/paraglide/messages';
  import { modalStore } from '$lib/store/modalStore.svelte';
  import { userStore } from '$lib/store/userStore.svelte';

  const isModalOpen = $derived(modalStore.getVisibilityState());
  const modalId = $derived(modalStore.getId());
  const { name, id, noteMessage } = $derived(userStore.getUserInfo());
  const { children } = $props();
  let modalType = $state();

  const togglePopup = () => {
    modalStore.toggleModalVisibility();
  };

  const handleUsernameClick = () => {
    modalStore.setId(ModalId.PROFILE_NAME);
    modalType = ModalType.SLIDE;
    modalStore.toggleModalVisibility();
  };

  const handleNoteClick = () => {
    modalStore.setId(ModalId.NOTE);
    modalType = ModalType.FLOATING;
    modalStore.toggleModalVisibility();
  };
</script>

<Header className="profile-header">
  <Link className="profile-header__link" href={`${AppRoute.ACCOUNTS}${AppRoute.SETTINGS}`}
    ><CustomIcon iconName={IconName.OPTIONS} /></Link
  >

  <button class="profile-header__name" onclick={handleUsernameClick}
    >{name}<CustomIcon
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
        <UserAvatar className="profile-page__avatar" avatarSize={UserAvatarSize.XLARGE} />
      </div>

      <div class="profile-page__settings">
        <button class="profile-page__settings-button profile-page__settings-button--name">{name}</button>
        <div class="profile-page__settings-actions">
          <Link
            className="profile-page__settings-button profile-page__settings-button--edit primary-button"
            href={`${AppRoute.ACCOUNTS}${AppRoute.EDIT}`}>{m.page_profile_edit()}</Link
          >
          <Link
            className="profile-page__settings-button profile-page__settings-button--archive primary-button"
            href={`${AppRoute.ARCHIVE}${AppRoute.PUBLICATIONS}`}>{m.page_profile_view()}</Link
          >
        </div>
      </div>
    </div>
    <div class="profile-page__stats">
      <Link className="profile-page__stats-link" href={`/${name}`}
        ><span class="profile-page__stats-count">30</span> {m.page_profile_posts()}</Link
      >
      <Link className="profile-page__stats-link" href={`/${name}${AppRoute.FOLLOWERS}`}
        ><span class="profile-page__stats-count">30</span>{m.page_profile_followers()}</Link
      >
      <Link className="profile-page__stats-link" href={`/${name}${AppRoute.FOLLOWING}`}
        ><span class="profile-page__stats-count">30</span>{m.page_profile_following()}</Link
      >
    </div>
    <div class="profile-page__activities">
      <Link
        className={(isActive) => (isActive ? 'profile-page__activities-link active' : 'profile-page__activities-link')}
        href={`/${name}`}><CustomIcon iconName={IconName.POSTS} /></Link
      >
      <Link
        className={(isActive) => (isActive ? 'profile-page__activities-link active' : 'profile-page__activities-link')}
        href={`/${name}${AppRoute.FEED}`}><CustomIcon iconName={IconName.FEED} /></Link
      >
      <Link
        className={(isActive) => (isActive ? 'profile-page__activities-link active' : 'profile-page__activities-link')}
        href={`/${name}${AppRoute.SAVED}`}><CustomIcon iconName={IconName.SAVED} /></Link
      >
      <Link
        className={(isActive) => (isActive ? 'profile-page__activities-link active' : 'profile-page__activities-link')}
        href={`/${name}${AppRoute.TAGGED}`}><CustomIcon iconName={IconName.TAGGED} /></Link
      >
    </div>
  </div>
  {@render children()}
</section>

<Modal isOpen={isModalOpen} onClose={togglePopup} type={modalType}>
  {#if modalId === ModalId.PROFILE_NAME}
    Profile name content
  {:else if modalId === ModalId.NOTE}
    <NoteForm userId={id} onSubmit={togglePopup} />
  {:else}
    PROFILE actions
  {/if}
</Modal>
