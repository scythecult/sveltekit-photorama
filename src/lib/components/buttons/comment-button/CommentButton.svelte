<script lang="ts">
  import './styles.css';
  import { ModalId } from '$lib/constants/common';
  import { StateContextName } from '$lib/constants/context';
  import { type AppState } from '$lib/state/appState.svelte';
  import type { ModalState } from '$lib/state/modalState.svelte';
  import { getStateContext } from '$lib/utils/context';
  import Count from '../../count/Count.svelte';
  import { IconName } from '../../custom-icon/constants';
  import CustomIcon from '../../custom-icon/CustomIcon.svelte';

  type CommentProps = {
    id: string;
    commentsCount?: number;
    className?: string;
  };

  const { id, commentsCount, className = '' }: CommentProps = $props();
  const appState = getStateContext<AppState>(StateContextName.APP);
  const modalState = getStateContext<ModalState>(StateContextName.PUBLICATIONS_PAGE_MODAL);
  const { setPublicationId } = $derived(appState() ?? {});
  const { setId, toggleModalVisibility } = $derived(modalState() ?? {});

  const handleCommentClick = () => {
    setPublicationId(id);
    setId(ModalId.COMMENT);
    toggleModalVisibility();
  };
</script>

<button class={[className, 'comment-button']} type="button" onclick={handleCommentClick}>
  <CustomIcon iconName={IconName.COMMENT} />

  {#if commentsCount}
    <Count count={commentsCount} />
  {/if}
</button>
