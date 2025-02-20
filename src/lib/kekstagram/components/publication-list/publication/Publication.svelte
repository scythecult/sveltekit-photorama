<script lang="ts">
  import { CustomComponentType } from '$lib/constants/kekstagram';
  import type { Comment } from '$lib/types/picture';
  import CommentButton from '../../buttons/CommentButton.svelte';
  import { LikeTypeMap } from '../../buttons/constants';
  import LikeButton from '../../buttons/LikeButton.svelte';
  import Caption from '../../caption/Caption.svelte';
  import CustomLink from '../../custom-link/CustomLink.svelte';
  import UserLogo from '../../user-logo/UserLogo.svelte';

  type PublicationProps = {
    id: string;
    url: string;
    description: string;
    hashtags: string[];
    likes?: string;
    comments?: Comment[];
  };

  const { id, url, description, hashtags, likes, comments }: PublicationProps = $props();
  // TODO move to picture-content separate component
  const pictureLikeCoords = $state({ xAxis: 0, yAxis: 0 });
  let isPictureLikeVisible = $state(false);
  let likeTimeout: ReturnType<typeof setTimeout> | undefined;

  const handlePictureDoubleClick = (evt: MouseEvent) => {
    evt.preventDefault();

    const { offsetX, offsetY } = evt;

    pictureLikeCoords.xAxis = offsetX;
    pictureLikeCoords.yAxis = offsetY;

    isPictureLikeVisible = false;
    clearTimeout(likeTimeout);
    likeTimeout = undefined;

    setTimeout(() => {
      isPictureLikeVisible = true;
    });

    if (!likeTimeout) {
      likeTimeout = setTimeout(() => {
        isPictureLikeVisible = false;

        clearTimeout(likeTimeout);
        likeTimeout = undefined;
      }, 1500);
    }
  };
</script>

<div class="publication">
  <!-- head -->
  <div class="head">
    <UserLogo src="/" alt="User logo" href="/user" />
    <!-- TODO replace username spaces to lodash -->
    <CustomLink type={CustomComponentType.USER_NAME} href="/user">veryfuckinglongusername</CustomLink>
  </div>
  <!-- picture -->
  <div class="picture">
    <button class="picture__button" onclick={handlePictureDoubleClick}>
      <img class="image" src={url} alt={description} />
    </button>
    {#if isPictureLikeVisible}
      <LikeButton
        {id}
        likeType={LikeTypeMap.PICTURE}
        --xAxis={`${pictureLikeCoords.xAxis}px`}
        --yAxis={`${pictureLikeCoords.yAxis}px`}
      />
    {/if}
  </div>
  <!-- actions -->
  <div class="actions">
    <LikeButton {id} likeCount={likes} likeType={LikeTypeMap.ACTIONS} />
    <CommentButton {id} commentCount={comments?.length} />
  </div>
  <!-- caption -->
  <Caption {description} {hashtags} />
</div>

<style>
  .publication {
    display: grid;
    row-gap: 10px;
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .head {
    display: grid;
    grid-template-columns: max-content minmax(140px, 1fr);
    align-items: center;
    column-gap: 6px;
  }

  .picture {
    position: relative;
  }

  .picture__button {
    padding: 0;
    border: none;
    background-color: transparent;
  }

  .actions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(var(--width-button-user-action), max-content));
    gap: 6px;
  }
</style>
