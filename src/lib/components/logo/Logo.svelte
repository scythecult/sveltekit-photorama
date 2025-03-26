<script lang="ts">
  import { PHOTORAMA_BASE_URL } from '$lib/constants/common';
  type LogoProps = {
    className?: string;
  };

  const { className = '' }: LogoProps = $props();
  const classNameFinal = ['logo', className];
</script>

<picture>
  <source srcset="{PHOTORAMA_BASE_URL}/logo.png" media="(prefers-color-scheme: dark)" />
  <img class={classNameFinal} width="180" height="54" src="{PHOTORAMA_BASE_URL}/logo-dark.png" alt="Photorama" />
</picture>
