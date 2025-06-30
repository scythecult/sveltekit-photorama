<script lang="ts">
  import './styles.css';
  import { onMount } from 'svelte';
  import { AppRoute } from '$lib/constants/app';
  import { userStore } from '$lib/store/userStore.svelte';
  import { IconName } from '../custom-icon/constants';
  import CustomIcon from '../custom-icon/CustomIcon.svelte';
  import Link from '../link/Link.svelte';
  import Spinner from '../spinners/Spinner.svelte';
  import { UserAvatarSize } from './constants';

  type UserAvatarProps = {
    className?: string;
    avatarSize?: string;
    isAvatarOnly?: boolean;
  };

  const { avatarUrl, username: username } = $derived(userStore.getUserInfo());
  const { className = '', avatarSize = UserAvatarSize.MEDIUM, isAvatarOnly = false }: UserAvatarProps = $props();
  const classNameFinal = ['user-avatar', className, avatarSize];
  const userLinkHref = $derived(username ? `/${username}` : AppRoute.PROFILE);
  let isLoading = $state(true);

  // TODO Make skeleton
  onMount(() => {
    isLoading = false;
  });
</script>

<Link className={(isActive) => (isActive ? [...classNameFinal, 'active'] : classNameFinal)} href={userLinkHref}>
  {#if avatarUrl}
    {#if isLoading}
      <Spinner />
    {:else if avatarUrl.includes('http') || avatarUrl.includes('https')}
      <img class="user-avatar__image" src={avatarUrl} alt={username} />
    {:else}
      <CustomIcon iconName={IconName.PROFILE} />
    {/if}
    {#if username && !isAvatarOnly}
      <span class="user-avatar__name link">{username}</span>
    {/if}
  {/if}
</Link>
