<script lang="ts">
  import './styles.css';
  import { UserAvatarMode } from '$lib/components/user-avatar/constants';
  import type { Comment } from '$lib/types/publication';
  import { LikeTypeMap } from '../../buttons/constants';
  import LikeButton from '../../buttons/like-button/LikeButton.svelte';
  import UserAvatar from '../../user-avatar/UserAvatar.svelte';

  type CommentProps = Comment & {};

  const { id, name, message, isLiked }: CommentProps = $props();
</script>

<div class="comment">
  <UserAvatar mode={UserAvatarMode.IMAGE} />

  <div class="comment__body">
    <a class="comment__user link" href="/user?name={name}" target="_top" rel="noopener noreferrer">{name}</a>
    <p class="comment__text">{message}</p>
    <div class="comment__actions">
      <button class="comment__reply-button">Reply</button>
      <LikeButton {id} {isLiked} likeCount="23" likeType={LikeTypeMap.COMMENT} />
    </div>
  </div>
</div>
