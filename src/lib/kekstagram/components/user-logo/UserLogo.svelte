<script lang="ts">
  type UserLogoProps = {
    alt: string;
    href: string;
    src: string;
    name?: string;
  };

  const { alt, href, src, name }: UserLogoProps = $props();
</script>

<a class="user-logo" {href} target="_top" rel="noopener noreferrer">
  {#if src.includes('http') || src.includes('https')}
    <img class="user-logo__image" {src} {alt} />
  {:else}
    <span class="user-logo__placeholder"></span>
  {/if}
  {#if name}
    <span class="user-logo__name link">{name}</span>
  {/if}
</a>

<style>
  .user-logo {
    --logo-size: 32px;
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--text-theme-dark);
    text-decoration: none;
  }

  .user-logo__image {
    width: var(--logo-size);
    height: var(--logo-size);
    border-radius: 50%;
    overflow: hidden;
  }

  .user-logo__placeholder {
    display: flex;
    width: var(--logo-size);
    height: var(--logo-size);
    background-color: rgb(238, 238, 238);
    border-radius: 50%;
    overflow: hidden;
  }

  .user-logo__name {
    display: block;
    max-width: 190px;
    color: inherit;
    font-weight: 700;
  }
</style>
