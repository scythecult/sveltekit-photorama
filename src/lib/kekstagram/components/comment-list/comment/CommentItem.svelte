<script lang="ts">
  import type { Comment } from '$lib/types/publication';
  import { LikeTypeMap } from '../../buttons/constants';
  import LikeButton from '../../buttons/LikeButton.svelte';
  import UserAvatar from '../../user-avatar/UserAvatar.svelte';

  type CommentProps = Comment & {};

  const { id, avatar, name, message, isLiked }: CommentProps = $props();
</script>

<div class="comment">
  <!-- TODO refactor href string -->
  <UserAvatar src={avatar} alt={name} href={`/user?name=${name}`} />

  <div class="comment__body">
    <a class="comment__user link" href="/user?name={name}" target="_top" rel="noopener noreferrer">{name}</a>
    <p class="comment__text">{message}</p>
    <div class="comment__actions">
      <button class="comment__reply-button">Reply</button>
      <LikeButton {id} {isLiked} likeCount={'23'} likeType={LikeTypeMap.COMMENT} />
    </div>
  </div>
</div>

<style>
  .comment {
    display: grid;
    grid-template-columns: 32px 1fr;
    column-gap: 10px;
    align-items: start;
    font-size: var(--app-font-size);
  }

  .comment__body {
    display: grid;
    grid-template-columns: 100%;
    row-gap: var(--app-micro-layout-gap);
  }

  .comment__user {
    font-weight: 700;
  }

  .comment__actions {
    display: flex;
    justify-content: space-between;
    gap: var(--app-micro-layout-gap);
  }

  .comment__reply-button {
    padding: 0;
    font-weight: 700;
    color: var(--app-color-gray);
    background-color: transparent;
    border: none;
  }
</style>
