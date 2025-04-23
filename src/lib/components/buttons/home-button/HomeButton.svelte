<script lang="ts">
  import { AppRoute } from '$lib/constants/app';
  import { IconName } from '../../custom-icon/constants';
  import CustomIcon from '../../custom-icon/CustomIcon.svelte';
  import Link from '../../link/Link.svelte';

  type HomeButtonProps = {
    className?: string;
  };

  const { className = '' }: HomeButtonProps = $props();
</script>

<!-- TODO update href depended on an auth -->
<Link className={(isActive) => (isActive ? `${className} active` : className)} href={AppRoute.PUBLICATIONS}>
  <CustomIcon iconName={IconName.HOME} />
</Link>
