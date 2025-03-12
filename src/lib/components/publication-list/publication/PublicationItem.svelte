<script lang="ts">
  import './styles.css';
  import CommentButton from '$lib/components/buttons/comment-button/CommentButton.svelte';
  import LikeButton from '$lib/components/buttons/like-button/LikeButton.svelte';
  import SendButton from '$lib/components/buttons/send-button/SendButton.svelte';
  import { AppRoute } from '$lib/constants/common';
  import type { Comment } from '$lib/types/publication';
  import { LikeTypeMap } from '../../buttons/constants';
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
      href={`${AppRoute.ROOT}${AppRoute.USER}?name=UsernameUsernameUsername`}
    />
    <div class="head__actions">
      <button>subscribe</button>
      <button>more</button>
    </div>
  </div>
  <!-- picture -->
  <PublicationPicture {isLiked} {url} {description} {id} />
  <div class="publication__feed">
    <!-- actions -->
    <div class="actions actions--caption">
      <LikeButton className="actions__button" {id} {isLiked} likeCount={likes} likeType={LikeTypeMap.ACTIONS} />
      <CommentButton className="actions__button" {id} commentCount={comments?.length} />
      <SendButton className="actions__button" {id} />
      <!-- <button class="actions__button send">send</button> -->
      <!-- TODO make last item of action if more than 2 aligned right -->
      <!-- TODO mb should wrap "main action (like comment)" to separate block?  -->
      <button class="actions__button bookmark">bookmark</button>
    </div>
    <!-- caption -->
    <Caption {id} {description} {hashtags} />
  </div>
</div>
