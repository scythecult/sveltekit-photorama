<script lang="ts">
  import './styles.css';
  import { AppRoute } from '$lib/constants/app';
  import { userStore } from '$lib/store/userStore.svelte';
  import { IconName } from '../custom-icon/constants';
  import CustomIcon from '../custom-icon/CustomIcon.svelte';
  import Link from '../link/Link.svelte';
  import { UserAvatarSize } from './constants';

  type UserAvatarProps = {
    className?: string;
    avatarSize?: string;
    isAvatarOnly?: boolean;
  };

  const { avatar, name } = $derived(userStore.getUserInfo());
  const { className = '', avatarSize = UserAvatarSize.MEDIUM, isAvatarOnly = false }: UserAvatarProps = $props();
  const classNameFinal = ['user-avatar', className, avatarSize];
  const userLinkHref = $derived(name ? `/${name}` : AppRoute.PROFILE);
</script>

<Link className={(isActive) => (isActive ? [...classNameFinal, 'active'] : classNameFinal)} href={userLinkHref}>
  {#if avatar}
    {#if avatar.includes('http') || avatar.includes('https')}
      <img class="user-avatar__image" src={avatar} alt={name} />
    {:else}
      <CustomIcon iconName={IconName.PROFILE} />
    {/if}
  {/if}
  {#if name && !isAvatarOnly}
    <span class="user-avatar__name link">{name}</span>
  {/if}
</Link>
