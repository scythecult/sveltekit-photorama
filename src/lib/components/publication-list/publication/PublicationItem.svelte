<script lang="ts">
  import './styles.css';
  import CommentButton from '$lib/components/buttons/comment-button/CommentButton.svelte';
  import LikeButton from '$lib/components/buttons/like-button/LikeButton.svelte';
  import ShareButton from '$lib/components/buttons/share-button/ShareButton.svelte';
  import { UserAvatarMode } from '$lib/components/user-avatar/constants';
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
  const commentsCount = $derived(comments?.length || 0);
</script>

<article class="publication">
  <!-- head -->
  <div class="publication__head">
    <UserAvatar mode={UserAvatarMode.FULL} />
    <div class="publication__head-actions">
      <button>subscribe</button>
      <button>more</button>
    </div>
  </div>
  <!-- picture -->
  <PublicationPicture {isLiked} {url} {description} {id} />
  <div class="publication__feed">
    <!-- actions -->
    <div class="publication__actions">
      <LikeButton {id} {isLiked} likeCount={likes} likeType={LikeTypeMap.ACTIONS} />
      <CommentButton {id} {commentsCount} />
      <ShareButton {id} />
      <button>bookmark</button>
    </div>
    <!-- caption -->
    <Caption {id} {description} {hashtags} />
  </div>
</article>
