<script lang="ts">
  import { IconName, type IconNameValue, IconSize, type IconSizeValue } from './constants';
  import Comment from './icons/Comment.svelte';
  import Like from './icons/Like.svelte';

  const Icon = {
    [IconName.COMMENT]: Comment,
    [IconName.LIKE]: Like,
  };

  type IconProps = {
    iconName: IconNameValue;
    iconSize?: IconSizeValue;
    className?: string;
    fill?: string;
    stroke?: string;
  };

  const { iconName, iconSize = IconSize.MEDIUM, fill = 'transparent', stroke = 'currentcolor' }: IconProps = $props();
  const IconComponent = Icon[iconName] || '';
  const classNameFinal = ['icon', iconSize];
</script>

{#if IconComponent}
  <span class={classNameFinal}>
    <IconComponent {fill} {stroke} />
  </span>
{/if}

<style>
  .icon {
    display: block;
  }

  .small {
    width: 10px;
    height: 10px;
  }

  .medium {
    width: 20px;
    height: 20px;
  }

  .large {
    width: 32px;
    height: 32px;
  }

  .inherit {
    width: inherit;
    height: inherit;
  }
</style>
