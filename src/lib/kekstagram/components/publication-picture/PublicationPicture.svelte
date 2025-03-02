<script lang="ts">
  import { LikeTypeMap } from '../buttons/constants';
  import LikeButton from '../buttons/LikeButton.svelte';

  type PublicationPictureProps = {
    url: string;
    description: string;
    id: string;
    isLiked: boolean;
  };

  const LIKE_TIMEOUT = 1500;

  const { url, description, id, isLiked }: PublicationPictureProps = $props();
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
      }, LIKE_TIMEOUT);
    }
  };
</script>

<div class="picture">
  <button class="picture__button" onclick={handlePictureDoubleClick}>
    <img class="image" src={url} alt={description} />
  </button>
  {#if isPictureLikeVisible}
    <LikeButton
      {id}
      {isLiked}
      likeType={LikeTypeMap.PICTURE}
      --xAxis={`${pictureLikeCoords.xAxis}px`}
      --yAxis={`${pictureLikeCoords.yAxis}px`}
    />
  {/if}
</div>

<style>
  .picture {
    position: relative;
  }

  .picture__button {
    padding: 0;
    border: none;
    background-color: transparent;
  }
</style>
