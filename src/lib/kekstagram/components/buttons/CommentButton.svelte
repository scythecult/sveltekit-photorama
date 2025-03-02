<script lang="ts">
  import { pageSlice } from '$lib/store/store.svelte';
  import { IconName } from '../custom-icon/constants';
  import CustomIcon from '../custom-icon/CustomIcon.svelte';

  type CommentProps = {
    id: string;
    commentCount?: number;
  };

  const { id, commentCount }: CommentProps = $props();

  const handleCommentClick = () => {
    pageSlice.setPublicationId(`${id}`);
    pageSlice.toggleModalVisibility();
  };
</script>

<button class="comment button" type="button" onclick={handleCommentClick}>
  <CustomIcon iconName={IconName.COMMENT} />

  {#if commentCount}
    <span class="comment__count">{commentCount}</span>
  {/if}
</button>

<style>
  .comment {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
  }

  .comment__count {
    font-size: 12px;
    font-weight: 700;
  }
</style>
