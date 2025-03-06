<script lang="ts">
  import type { SubmitFunction } from '@sveltejs/kit';
  import { enhance } from '$app/forms';
  import { ActionMap, ActionNameMap } from '$lib/constants/action';
  import { IconName, IconSize } from '../custom-icon/constants';
  import CustomIcon from '../custom-icon/CustomIcon.svelte';
  import { LikeTypeMap, type LikeTypeMapValue } from './constants';

  type LikeButtonProps = {
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

  const { id, likeType, likeCount, isLiked }: LikeButtonProps = $props();
  const actionSegment = LikeActionSegmentMap[likeType];
  const actionName = LikeActionNameMap[likeType];
  const iconSize = LikeIconSizeMap[likeType];
  const isPictureMode = likeType === LikeTypeMap.PICTURE;
  let disabled = $state(false);
  let classNameFinal = $state(['like', isPictureMode && 'like--picture']);

  const handleSubmit: SubmitFunction = async () => {
    disabled = true;

    if (isPictureMode) {
      classNameFinal = ['like', isPictureMode && 'like--picture like--animate'];
    } else {
      classNameFinal = ['like', !isLiked && 'like--active'];
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
      fill={isLiked ? 'var(--app-color-red)' : 'transparent'}
      stroke={isLiked ? 'var(--app-color-red)' : 'currentcolor'}
      iconName={IconName.LIKE}
      {iconSize}
    />
  </button>
  <input type="hidden" name={actionName} value={id} />
  <!-- TODO Check for correct work -->
  <input type="hidden" name="isLiked" value={!isLiked} />
  {#if likeCount}
    <span class="like__count">{likeCount}</span>
  {/if}
</form>

<style>
  @keyframes like {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    25% {
      opacity: 1;
      transform: scale(1.2);
    }
    50% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 1;
      transform: translateY(-1000%);
    }
  }

  @keyframes active {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }

  .like {
    --picture-action-button-width: 74px;
    --picture-action-button-height: 74px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
  }

  .like--picture .like__button {
    position: absolute;
    top: calc(var(--yAxis) - var(--picture-action-button-width) / 2);
    left: calc(var(--xAxis) - var(--picture-action-button-height) / 2);
    width: var(--picture-action-button-width);
    height: var(--picture-action-button-height);
    opacity: 0;
  }

  .like--active .like__button {
    animation-name: active;
    animation-duration: 0.5s;
    animation-timing-function: linear;
  }

  .like--animate .like__button {
    animation-name: like;
    animation-duration: 1.5s;
    animation-timing-function: ease;
  }

  .like__button {
    width: inherit;
    height: inherit;
    padding: 0;
    background-color: transparent;
    border: none;
  }

  .like__count {
    min-width: 14px;
    font-size: var(--app-font-size);
    font-weight: 700;
  }
</style>
