<script lang="ts">
  type UserAvatarProps = {
    alt?: string;
    href: string;
    src?: string;
    name?: string;
  };

  const { alt, href, src, name }: UserAvatarProps = $props();
</script>

<a class="user-avatar" {href} target="_top" rel="noopener noreferrer">
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
</a>

<style>
  .user-avatar {
    --logo-size: 32px;
    display: flex;
    align-items: center;
    gap: var(--app-micro-layout-gap);
    color: var(--theme-text-dark);
    text-decoration: none;
  }

  .user-avatar__image {
    display: block;
    min-width: var(--logo-size);
    width: var(--logo-size);
    height: var(--logo-size);
    background-color: var(--app-color-gray);
    border-radius: 50%;
    overflow: hidden;
  }

  .user-avatar__name {
    display: block;
    font-weight: 700;
  }
</style>
