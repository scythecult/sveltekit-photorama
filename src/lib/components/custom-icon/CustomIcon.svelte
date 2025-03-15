<script lang="ts">
  import './styles.css';
  import { IconName, type IconNameValue, IconSize, type IconSizeValue } from './constants';
  import Add from './icons/Add.svelte';
  import Comment from './icons/Comment.svelte';
  import Dislike from './icons/Dislike.svelte';
  import Home from './icons/Home.svelte';
  import Like from './icons/Like.svelte';
  import PictureLike from './icons/PictureLike.svelte';
  import Search from './icons/Search.svelte';
  import Share from './icons/Share.svelte';

  const Icon = {
    [IconName.COMMENT]: Comment,
    [IconName.LIKE]: Like,
    [IconName.PICTURE_LIKE]: PictureLike,
    [IconName.DISLIKE]: Dislike,
    [IconName.HOME]: Home,
    [IconName.SEACH]: Search,
    [IconName.ADD]: Add,
    [IconName.SHARE]: Share,
  };

  type CustomIconProps = {
    iconName: IconNameValue;
    iconSize?: IconSizeValue;
    className?: string;
  };

  const { iconName, iconSize = IconSize.MEDIUM }: CustomIconProps = $props();
  const IconComponent = Icon[iconName] || '';
  const classNameFinal = ['icon', iconSize, iconName];
</script>

{#if IconComponent}
  <IconComponent className={classNameFinal} />
{/if}
