<script lang="ts">
  import './styles.css';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { enhance } from '$app/forms';
  import { FormActionName, InputName } from '$lib/constants/action';
  import Count from '../../count/Count.svelte';
  import { IconName, IconSize } from '../../custom-icon/constants';
  import CustomIcon from '../../custom-icon/CustomIcon.svelte';
  import { LikeTypeMap, type LikeTypeMapValue } from '../constants';

  type LikeButtonProps = {
    className?: string;
    id: string;
    likeType: LikeTypeMapValue;
    likeCount?: string;
    isLiked: boolean;
  };

  const LikeIconSizeMap = {
    [LikeTypeMap.COMMENT]: IconSize.SMALL,
    [LikeTypeMap.ACTIONS]: IconSize.MEDIUM,
    [LikeTypeMap.PICTURE]: IconSize.INHERIT,
  };

  const LikeActionSegmentMap = {
    [LikeTypeMap.COMMENT]: FormActionName.COMMENT_LIKE,
    [LikeTypeMap.ACTIONS]: FormActionName.LIKE,
    [LikeTypeMap.PICTURE]: FormActionName.LIKE,
  };

  const LikeActionNameMap = {
    [LikeTypeMap.COMMENT]: InputName.COMMENT_ID,
    [LikeTypeMap.ACTIONS]: InputName.PUBLICATION_ID,
    [LikeTypeMap.PICTURE]: InputName.PUBLICATION_ID,
  };

  const { className = '', id, likeType, likeCount, isLiked }: LikeButtonProps = $props();
  const actionSegment = LikeActionSegmentMap[likeType];
  const actionName = LikeActionNameMap[likeType];
  const iconSize = LikeIconSizeMap[likeType];
  const isPictureMode = likeType === LikeTypeMap.PICTURE;
  let isLikeButtonDisabled = $state(false);
  const classNameFinal = $derived([
    'like-button',
    className,
    isPictureMode && 'like-button--picture',
    isPictureMode && isLiked && 'like-button--animate',
  ]);

  const handleSubmit: SubmitFunction = async () => {
    isLikeButtonDisabled = true;

    return async ({ update }) => {
      isLikeButtonDisabled = false;
      await update();
    };
  };
</script>

<form class={classNameFinal} action="?/{actionSegment}" method="POST" use:enhance={handleSubmit}>
  <button class="like-button__submit" type="submit" disabled={isLikeButtonDisabled}>
    {#if isPictureMode}
      <CustomIcon iconName={IconName.PICTURE_LIKE} {iconSize} />
    {:else if isLiked}
      <CustomIcon className="dislike" iconName={IconName.DISLIKE} {iconSize} />
    {:else}
      <CustomIcon className="like" iconName={IconName.LIKE} {iconSize} />
    {/if}
  </button>
  <input type="hidden" name={actionName} value={id} />
  <input type="hidden" name="isLiked" value={!isLiked} />
  {#if likeCount}
    <Count count={likeCount} />
  {/if}
</form>
