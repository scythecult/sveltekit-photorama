<script lang="ts">
  import './styles.css';
  import { pageSlice } from '$lib/store/store.svelte';
  import Count from '../../count/Count.svelte';
  import { IconName } from '../../custom-icon/constants';
  import CustomIcon from '../../custom-icon/CustomIcon.svelte';

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

<button class="comment" type="button" onclick={handleCommentClick}>
  <CustomIcon iconName={IconName.COMMENT} />

  {#if commentCount}
    <Count count={commentCount} />
  {/if}
</button>
