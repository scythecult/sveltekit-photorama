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
    [LikeTypeMap.COMMENT]: ActionNameMap.COMMENT_LIKE_ID,
    [LikeTypeMap.ACTIONS]: ActionNameMap.PUBLICATION_LIKE_ID,
    [LikeTypeMap.PICTURE]: ActionNameMap.PUBLICATION_LIKE_ID,
  };

  const { className = '', id, likeType, likeCount, isLiked }: LikeButtonProps = $props();
  const actionSegment = LikeActionSegmentMap[likeType];
  const actionName = LikeActionNameMap[likeType];
  const iconSize = LikeIconSizeMap[likeType];
  const isPictureMode = likeType === LikeTypeMap.PICTURE;
  let disabled = $state(false);
  let classNameFinal = $state(['like', className, isPictureMode && 'like--picture']);

  const handleSubmit: SubmitFunction = async () => {
    disabled = true;

    if (isPictureMode) {
      classNameFinal = ['like', className, isPictureMode && 'like--picture like--animate'];
    } else {
      classNameFinal = ['like', className, !isLiked && 'like--active'];
    }

    return async ({ update }) => {
      disabled = false;
      await update();
    };
  };
</script>

<form class={classNameFinal} action="?/{actionSegment}" method="POST" use:enhance={handleSubmit}>
  <button class="like__button" type="submit" {disabled}>
    <CustomIcon
      fill={isLiked ? 'rgb(var(--app-badge))' : 'transparent'}
      stroke={isLiked ? 'rgb(var(--app-badge))' : 'currentcolor'}
      iconName={IconName.LIKE}
      {iconSize}
    />
  </button>
  <input type="hidden" name={actionName} value={id} />
  <!-- TODO Check for correct work -->
  <input type="hidden" name="isLiked" value={!isLiked} />
  {#if likeCount}
    <Count count={likeCount} />
  {/if}
</form>
