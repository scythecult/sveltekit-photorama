<script lang="ts">
  type UserLogoProps = {
    alt: string;
    href: string;
    src: string;
  };

  const { alt, href, src }: UserLogoProps = $props();
</script>

<a class="user-logo" {href} target="_top" rel="noopener noreferrer">
  {#if src.includes('http') || src.includes('https')}
    <img class="user-logo__image" {src} {alt} />
  {/if}
</a>

<style>
  .user-logo {
    width: 32px;
    height: 32px;
    background-color: rgb(238, 238, 238);
    border-radius: 50%;
    overflow: hidden;
  }
</style>
