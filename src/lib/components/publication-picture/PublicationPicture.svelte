<script lang="ts">
  import './styles.css';
  import { LikeTypeMap } from '../buttons/constants';
  import LikeButton from '../buttons/like-button/LikeButton.svelte';

  type PublicationPictureProps = {
    url: string;
    description: string;
    id: string;
    isLiked: boolean;
  };

  type PictureButtonHandler = Event & MouseEvent & { currentTarget: EventTarget & HTMLButtonElement };

  const LIKE_TIMEOUT = 1500;

  const { url, description, id, isLiked }: PublicationPictureProps = $props();
  const pictureLikeCoords = $state({ xAxis: 0, yAxis: 0 });
  let isPictureLikeVisible = $state(false);
  let randomRotation = $state(0);
  let likeTimeout: ReturnType<typeof setTimeout> | undefined;

  const handlePictureDoubleClick = (evt: PictureButtonHandler) => {
    evt.preventDefault();

    if (isLiked) {
      return;
    }

    const { offsetX, offsetY, currentTarget } = evt;
    const targetMiddle = currentTarget.offsetWidth / 2;

    randomRotation = Math.floor(
      offsetX < targetMiddle ? -((targetMiddle - offsetX) / 2) : (offsetX - targetMiddle) / 2,
    );

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
      --x-axis={`${pictureLikeCoords.xAxis}px`}
      --y-axis={`${pictureLikeCoords.yAxis}px`}
      --random-rotation-deg={`${randomRotation}deg`}
    />
  {/if}
</div>
