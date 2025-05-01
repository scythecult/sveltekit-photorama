<script lang="ts">
  import './styles.css';
  import { IconName, type IconNameValue, IconSize, type IconSizeValue } from './constants';
  import Arrow from './icons/Arrow.svelte';
  import Chevron from './icons/Chevron.svelte';
  import Comment from './icons/Comment.svelte';
  import Create from './icons/Create.svelte';
  import Dislike from './icons/Dislike.svelte';
  import Feed from './icons/Feed.svelte';
  import Home from './icons/Home.svelte';
  import Like from './icons/Like.svelte';
  import Options from './icons/Options.svelte';
  import PictureLike from './icons/PictureLike.svelte';
  import Posts from './icons/Posts.svelte';
  import Profile from './icons/Profile.svelte';
  import Saved from './icons/Saved.svelte';
  import Search from './icons/Search.svelte';
  import Share from './icons/Share.svelte';
  import Tagged from './icons/Tagged.svelte';

  const Icon = {
    [IconName.COMMENT]: Comment,
    [IconName.LIKE]: Like,
    [IconName.PICTURE_LIKE]: PictureLike,
    [IconName.DISLIKE]: Dislike,
    [IconName.HOME]: Home,
    [IconName.SEACH]: Search,
    [IconName.CREATE]: Create,
    [IconName.SHARE]: Share,
    [IconName.ARROW]: Arrow,
    [IconName.PROFILE]: Profile,
    [IconName.OPTIONS]: Options,
    [IconName.CHEVRON]: Chevron,
    [IconName.SAVED]: Saved,
    [IconName.TAGGED]: Tagged,
    [IconName.FEED]: Feed,
    [IconName.POSTS]: Posts,
  };

  type CustomIconProps = {
    iconName: IconNameValue;
    iconSize?: IconSizeValue;
    className?: string;
  };

  const { iconName, iconSize = IconSize.MEDIUM, className = '' }: CustomIconProps = $props();
  const IconComponent = Icon[iconName] || '';
  const classNameFinal = ['icon', iconSize, iconName, className];
</script>

{#if IconComponent}
  <IconComponent className={classNameFinal} />
{/if}
