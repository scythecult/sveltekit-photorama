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
    [LikeTypeMap.ACTIONS]: ActionNameMap.PICTURE_LIKE_ID,
    [LikeTypeMap.PICTURE]: ActionNameMap.PICTURE_LIKE_ID,
  };

  let isLiked = $state(false);
  let disabled = $state(false);
  const { id, likeType, likeCount }: LikeButtonProps = $props();
  const actionSegment = LikeActionSegmentMap[likeType];
  const actionName = LikeActionNameMap[likeType];
  const iconSize = LikeIconSizeMap[likeType];
  const isPictureMode = likeType === LikeTypeMap.PICTURE;
  const classNameFinal = ['like', isPictureMode && 'like--picture'];

  const handleSubmit: SubmitFunction = async () => {
    disabled = true;

    return async ({ update }) => {
      disabled = false;
      await update();
    };
  };
</script>

<form class={classNameFinal} action="?/{actionSegment}" method="POST" use:enhance={handleSubmit}>
  <button
    onclick={() => {
      isLiked = !isLiked;
    }}
    class="like__button"
    type="submit"
    {disabled}
  >
    <CustomIcon
      fill={isLiked ? 'var(--color-main-red)' : 'transparent'}
      stroke={isLiked ? 'var(--color-main-red)' : 'currentcolor'}
      iconName={IconName.LIKE}
      {iconSize}
    />
  </button>
  <input type="hidden" name={actionName} value={id} />
  <input type="hidden" name="isLiked" value={isLiked} />
  {#if likeCount}
    <span class="like__count">{likeCount}</span>
  {/if}
</form>

<style>
  @keyframes like {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(1.2);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: translateY(-1000%);
    }
  }

  .like {
    --width-button-picture-action: 94px;
    --height-button-picture-action: 94px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
  }

  .like--picture {
    position: absolute;
    top: calc(var(--yAxis) - var(--width-button-picture-action) / 2);
    left: calc(var(--xAxis) - var(--height-button-picture-action) / 2);
    width: var(--width-button-picture-action);
    height: var(--height-button-picture-action);
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
    font-size: 12px;
    font-weight: 700;
  }
</style>
