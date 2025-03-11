<script lang="ts">
  import { AppRoute } from '$lib/constants/kekstagram';
  import { IconName } from '../../custom-icon/constants';
  import CustomIcon from '../../custom-icon/CustomIcon.svelte';
  import Link from '../../link/Link.svelte';

  type HomeButtonProps = {
    className?: string;
  };

  const { className = '' }: HomeButtonProps = $props();
</script>

<Link className={(isActive) => (isActive ? `${className} active` : className)} href={AppRoute.ROOT}>
  <CustomIcon fill="var(--home-button-fill)" iconName={IconName.HOME} />
</Link>
