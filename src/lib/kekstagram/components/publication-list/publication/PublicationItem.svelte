<script lang="ts">
  import { AppRoute } from '$lib/constants/kekstagram';
  import type { Comment } from '$lib/types/publication';
  import CommentButton from '../../buttons/CommentButton.svelte';
  import { LikeTypeMap } from '../../buttons/constants';
  import LikeButton from '../../buttons/LikeButton.svelte';
  import Caption from '../../caption/Caption.svelte';
  import PublicationPicture from '../../publication-picture/PublicationPicture.svelte';
  import UserLogo from '../../user-logo/UserLogo.svelte';

  type PublicationItemProps = {
    id: string;
    url: string;
    description: string;
    hashtags: string[];
    likes?: string;
    comments?: Comment[];
    isLiked: boolean;
  };

  const { id, url, description, hashtags, likes, comments, isLiked }: PublicationItemProps = $props();
</script>

<div class="publication">
  <!-- head -->
  <div class="head">
    <!-- TODO get user info from user slice -->
    <UserLogo
      src="/"
      alt="User logo"
      name="User nameUser nameUser nameUser name"
      href={`${AppRoute.ROOT}${AppRoute.USER}?name=${id}`}
    />
    <div class="actions actions--head">
      <button>subscribe</button>
      <button>more</button>
    </div>
  </div>
  <!-- picture -->
  <PublicationPicture {isLiked} {url} {description} {id} />
  <!-- actions -->
  <div class="actions actions--caption">
    <LikeButton {id} {isLiked} likeCount={likes} likeType={LikeTypeMap.ACTIONS} />
    <CommentButton {id} commentCount={comments?.length} />
    <LikeButton {id} {isLiked} likeCount={likes} likeType={LikeTypeMap.ACTIONS} />
    <!-- TODO make last item of action if more than 2 aligned right -->
    <!-- TODO mb should wrap "main action (like comment)" to separate block?  -->
    <LikeButton {id} {isLiked} likeCount={likes} likeType={LikeTypeMap.ACTIONS} />
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
    grid-template-columns: max-content minmax(0, 1fr);
    justify-content: space-between;
    align-items: center;
    column-gap: 6px;
  }

  .actions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(var(--width-button-user-action), max-content));
    align-items: center;
    gap: 6px;
  }

  .actions--head {
    justify-content: end;
  }

  .actions--caption:nth-child(1) {
    width: 100px;
  }
  /* .actions:last-child {
    align-self: end;

  } */
</style>
