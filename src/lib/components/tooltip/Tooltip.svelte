<script lang="ts">
  import './styles.css';
  import { type Snippet } from 'svelte';
  import { IconName } from '$lib/components/custom-icon/constants';
  import CustomIcon from '$lib/components/custom-icon/CustomIcon.svelte';

  type TooltipProps = {
    children: Snippet;
    className?: string;
  };

  const { children, className }: TooltipProps = $props();
  let tooltipNode: HTMLButtonElement;
  let isTooltipContentVisible = $state(false);
  let isLeft = $state(false);
  let isRight = $state(false);
  const classNameFinal = $derived([
    'tooltip',
    className,
    isTooltipContentVisible && 'tooltip--visible',
    isLeft && 'left',
    isRight && 'right',
  ]);

  const handleTooltipClick = () => {
    isTooltipContentVisible = !isTooltipContentVisible;
  };

  $effect(() => {
    if (tooltipNode) {
      const tooltipContentNode = tooltipNode.querySelector('.tooltip__content');

      if (tooltipContentNode) {
        const { right, left } = tooltipContentNode.getBoundingClientRect();
        const { clientWidth } = document.documentElement;

        if (!isLeft) {
          isLeft = left < 0;
        }

        if (!isRight) {
          isRight = right > clientWidth;
        }
      }
    }
  });
</script>

<button class={classNameFinal} type="button" bind:this={tooltipNode} onclick={handleTooltipClick}>
  <CustomIcon iconName={IconName.INFO} />
  <span class="tooltip__content">
    {@render children()}
  </span>
</button>
