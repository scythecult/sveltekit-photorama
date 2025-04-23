<script lang="ts">
  import { AppRoute } from '$lib/constants/app';
  import { IconName } from '../../custom-icon/constants';
  import CustomIcon from '../../custom-icon/CustomIcon.svelte';
  import Link from '../../link/Link.svelte';

  type CreateButtonProps = {
    className?: string;
  };

  const { className = '' }: CreateButtonProps = $props();
</script>

<Link className={(isActive) => (isActive ? `${className}  active` : className)} href={AppRoute.CREATE}>
  <CustomIcon iconName={IconName.CREATE} />
</Link>
