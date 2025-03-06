<script lang="ts">
  import { AppRoute } from '$lib/constants/kekstagram';
  import type { Comment } from '$lib/types/publication';
  import CommentButton from '../../buttons/CommentButton.svelte';
  import { LikeTypeMap } from '../../buttons/constants';
  import LikeButton from '../../buttons/LikeButton.svelte';
  import Caption from '../../caption/Caption.svelte';
  import PublicationPicture from '../../publication-picture/PublicationPicture.svelte';
  import UserAvatar from '../../user-avatar/UserAvatar.svelte';

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
    <!-- TODO refactor href => move inside component and take query param name from name prop -->
    <UserAvatar
      src="/"
      alt="User logo"
      name="UsernameUsernameUsername"
      href={`${AppRoute.ROOT}${AppRoute.USER}?name=${id}`}
    />
    <div class="head__actions">
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
    <button class="send">send</button>
    <!-- TODO make last item of action if more than 2 aligned right -->
    <!-- TODO mb should wrap "main action (like comment)" to separate block?  -->
    <button class="bookmark">bookmark</button>
  </div>
  <!-- caption -->
  <Caption {id} {description} {hashtags} />
</div>

<style>
  .publication {
    display: grid;
    row-gap: 10px;
    padding-top: 8px;
    padding-bottom: 8px;
    font-size: var(--app-font-size);
  }

  .head {
    display: grid;
    grid-template-columns: minmax(32px, max-content) minmax(0, max-content);
    justify-content: space-between;
    align-items: center;
    column-gap: var(--app-micro-layout-gap);
  }

  .actions {
    display: flex;
    align-items: center;
    gap: var(--app-micro-layout-gap);
  }

  :global(.actions:has(.bookmark) .bookmark) {
    margin-left: auto;
  }
</style>
