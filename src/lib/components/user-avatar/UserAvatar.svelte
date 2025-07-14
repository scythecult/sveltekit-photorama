<script lang="ts">
  import './styles.css';
  import { AppRoute } from '$lib/constants/app';
  import { StateContextName } from '$lib/constants/context';
  import type { UserInfo } from '$lib/types/userInfo';
  import { getStateContext } from '$lib/utils/context';
  import { IconName } from '../custom-icon/constants';
  import CustomIcon from '../custom-icon/CustomIcon.svelte';
  import Link from '../link/Link.svelte';
  import { UserAvatarMode, UserAvatarSize } from './constants';

  type UserAvatarMode = 'image' | 'caption' | 'full';

  type UserAvatarProps = {
    className?: string;
    avatarSize?: string;
    isAvatarOnly?: boolean;
    mode?: UserAvatarMode;
  };

  const userState = getStateContext<UserInfo>(StateContextName.USER);
  const { avatarUrl = '', username = '' } = $derived(userState() ?? {});
  const { className = '', avatarSize = UserAvatarSize.MEDIUM, mode = UserAvatarMode.IMAGE }: UserAvatarProps = $props();
  const classNameFinal = ['user-avatar', className, avatarSize];
  const userLinkHref = $derived(username ? `/${username}` : AppRoute.PROFILE);
  const isUsernameVisible = $derived(username && mode !== UserAvatarMode.IMAGE);
  const isImageVisible = $derived(mode !== UserAvatarMode.CAPTION);
  const isImageExists = $derived(avatarUrl.includes('http') || avatarUrl.includes('https'));
</script>

<Link className={(isActive) => (isActive ? [...classNameFinal, 'active'] : classNameFinal)} href={userLinkHref}>
  {#if isImageVisible}
    {#if isImageExists}
      <img class="user-avatar__image" src={avatarUrl} alt={username} />
    {:else}
      <CustomIcon iconName={IconName.PROFILE} />
    {/if}
  {/if}
  {#if isUsernameVisible}
    <span class="user-avatar__name link">{username}</span>
  {/if}
</Link>
