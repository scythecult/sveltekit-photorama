<script lang="ts">
  import './styles.css';
  import { IconName, type IconNameValue, IconSize, type IconSizeValue } from './constants';
  import Add from './icons/Add.svelte';
  import Comment from './icons/Comment.svelte';
  import Home from './icons/Home.svelte';
  import Like from './icons/Like.svelte';
  import Search from './icons/Search.svelte';

  const Icon = {
    [IconName.COMMENT]: Comment,
    [IconName.LIKE]: Like,
    [IconName.HOME]: Home,
    [IconName.SEACH]: Search,
    [IconName.ADD]: Add,
  };

  type CustomIconProps = {
    iconName: IconNameValue;
    iconSize?: IconSizeValue;
    className?: string;
    fill?: string;
    stroke?: string;
  };

  const { iconName, iconSize = IconSize.MEDIUM, fill, stroke }: CustomIconProps = $props();
  const IconComponent = Icon[iconName] || '';
  const classNameFinal = ['icon', iconSize];
</script>

{#if IconComponent}
  <span class={classNameFinal}>
    <IconComponent {fill} {stroke} />
  </span>
{/if}
