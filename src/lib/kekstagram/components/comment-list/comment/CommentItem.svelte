<script lang="ts">
  import type { Comment } from '$lib/types/publication';
  import { LikeTypeMap } from '../../buttons/constants';
  import LikeButton from '../../buttons/LikeButton.svelte';
  import UserLogo from '../../user-logo/UserLogo.svelte';

  type CommentProps = Comment & {};

  const { id, avatar, name, message, isLiked }: CommentProps = $props();
</script>

<div class="comment">
  <!-- TODO refactor href string -->
  <UserLogo src={avatar} alt={name} href={`/user?name=${name}`} />

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
  }

  .comment__body {
    display: grid;
    grid-template-columns: 100%;
    row-gap: 6px;
  }

  .comment__user {
    font-size: 15px;
    font-weight: 700;
  }

  .comment__text {
    font-size: 15px;
  }

  .comment__actions {
    display: flex;
    justify-content: space-between;
    gap: 4px;
  }

  .comment__reply-button {
    padding: 0;
    font-size: 14px;
    font-weight: 700;
    color: var(--color-gray);
    background-color: transparent;
    border: none;
  }
</style>
