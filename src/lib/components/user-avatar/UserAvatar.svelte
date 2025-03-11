<script lang="ts">
  import './styles.css';
  import Link from '../link/Link.svelte';
  import { UserAvatarSize } from './constants';

  type UserAvatarProps = {
    className?: string;
    alt?: string;
    href: string;
    src?: string;
    name?: string;
    avatarSize?: string;
  };

  const { className = '', alt, href, src, name, avatarSize = UserAvatarSize.MEDIUM }: UserAvatarProps = $props();
  const classNameFinal = ['user-avatar', className, avatarSize];
</script>

<Link className={(isActive) => (isActive ? [...classNameFinal, 'active'] : classNameFinal)} {href}>
  {#if src}
    {#if src.includes('http') || src.includes('https')}
      <img class="user-avatar__image" {src} {alt} />
    {:else}
      <span class="user-avatar__image user-avatar__image--placeholder"></span>
    {/if}
  {/if}
  {#if name}
    <span class="user-avatar__name link">{name}</span>
  {/if}
</Link>
