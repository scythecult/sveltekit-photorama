<script lang="ts">
  import './styles.css';
  import { IconName } from '$lib/components/custom-icon/constants';
  import CustomIcon from '$lib/components/custom-icon/CustomIcon.svelte';
  import Spinner from '../Spinner.svelte';

  type ValidationSpinnerProps = {
    className?: string;
    isLoading?: boolean;
    isVerified?: boolean;
  };

  const { className = '', isLoading, isVerified }: ValidationSpinnerProps = $props();
  const classNameFinal = [className, 'validation-spinner'];
</script>

<!-- TODO refactor -->
<div class={classNameFinal}>
  {#if !isLoading}
    {#if isVerified}
      <CustomIcon className="validation-spinner__checkmark" iconName={IconName.CHECKMARK} />
    {:else}
      <CustomIcon className="validation-spinner__failmark" iconName={IconName.FAILMARK} />
    {/if}
  {:else}
    <Spinner />
  {/if}
</div>
