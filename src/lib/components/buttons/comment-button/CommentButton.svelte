<script lang="ts">
  import './styles.css';
  import { ModalId } from '$lib/constants/common';
  import { appStore } from '$lib/store/appStore.svelte';
  import { modalStore } from '$lib/store/modalStore.svelte';
  import Count from '../../count/Count.svelte';
  import { IconName } from '../../custom-icon/constants';
  import CustomIcon from '../../custom-icon/CustomIcon.svelte';

  type CommentProps = {
    id: string;
    commentCount?: number;
    className?: string;
  };

  const { id, commentCount, className = '' }: CommentProps = $props();

  const handleCommentClick = () => {
    appStore.setPublicationId(id);
    modalStore.setId(ModalId.COMMENT);
    modalStore.toggleModalVisibility();
  };
</script>

<button class={[className, 'comment-button']} type="button" onclick={handleCommentClick}>
  <CustomIcon iconName={IconName.COMMENT} />

  {#if commentCount}
    <Count count={commentCount} />
  {/if}
</button>
