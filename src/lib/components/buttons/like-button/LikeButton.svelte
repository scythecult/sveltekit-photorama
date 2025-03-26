<script lang="ts">
  import './styles.css';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { enhance } from '$app/forms';
  import { ActionMap, ActionNameMap } from '$lib/constants/action';
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
    [LikeTypeMap.COMMENT]: ActionMap.COMMENT_LIKE,
    [LikeTypeMap.ACTIONS]: ActionMap.LIKE,
    [LikeTypeMap.PICTURE]: ActionMap.LIKE,
  };

  const LikeActionNameMap = {
    [LikeTypeMap.COMMENT]: ActionNameMap.COMMENT_ID,
    [LikeTypeMap.ACTIONS]: ActionNameMap.PUBLICATION_ID,
    [LikeTypeMap.PICTURE]: ActionNameMap.PUBLICATION_ID,
  };

  const { className = '', id, likeType, likeCount, isLiked }: LikeButtonProps = $props();
  const actionSegment = LikeActionSegmentMap[likeType];
  const actionName = LikeActionNameMap[likeType];
  const iconSize = LikeIconSizeMap[likeType];
  const isPictureMode = likeType === LikeTypeMap.PICTURE;
  let disabled = $state(false);
  let classNameFinal = $state(['like-button', className, isPictureMode && 'like-button--picture']);

  const handleSubmit: SubmitFunction = async () => {
    disabled = true;

    if (isPictureMode) {
      classNameFinal = ['like-button', className, isPictureMode && 'like-button--picture like-button--animate'];
    }

    return async ({ update }) => {
      disabled = false;
      await update();
    };
  };
</script>

<form class={classNameFinal} action="?/{actionSegment}" method="POST" use:enhance={handleSubmit}>
  <button class="like-button__submit" type="submit" {disabled}>
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
