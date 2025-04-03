<script lang="ts">
  import './styles.css';
  import { AppRoute } from '$lib/constants/common';
  import { userSlice } from '$lib/store/userStore.svelte';
  import Link from '../link/Link.svelte';
  import { UserAvatarSize } from './constants';

  type UserAvatarProps = {
    className?: string;
    avatarSize?: string;
  };

  const { avatar, name } = $derived(userSlice.getUserInfo());
  const { className = '', avatarSize = UserAvatarSize.MEDIUM }: UserAvatarProps = $props();
  const classNameFinal = ['user-avatar', className, avatarSize];
  const userLinkHref = $derived(name ? name : AppRoute.PROFILE);
</script>

<Link className={(isActive) => (isActive ? [...classNameFinal, 'active'] : classNameFinal)} href={userLinkHref}>
  {#if avatar}
    {#if avatar.includes('http') || avatar.includes('https')}
      <img class="user-avatar__image" src={avatar} alt={name} />
    {:else}
      <span class="user-avatar__image user-avatar__image--placeholder"></span>
    {/if}
  {/if}
  {#if name}
    <span class="user-avatar__name link">{name}</span>
  {/if}
</Link>
