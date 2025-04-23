<script lang="ts">
  import { PHOTORAMA_BASE_URL } from '$lib/constants/app';

  type LogoProps = {
    className?: string;
  };

  const { className = '' }: LogoProps = $props();
  const classNameFinal = ['icon-logo', className];
</script>

<img class={classNameFinal} width="80" height="80" src={`${PHOTORAMA_BASE_URL}/logo-icon.webp`} alt="Photorama" />
