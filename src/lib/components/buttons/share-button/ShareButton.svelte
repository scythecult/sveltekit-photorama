<script lang="ts">
  import './styles.css';
  import { ModalId } from '$lib/constants/common';
  import { StateContextName } from '$lib/constants/context';
  import { type AppState } from '$lib/state/appState.svelte';
  import type { ModalState } from '$lib/state/modalState.svelte';
  import { getStateContext } from '$lib/utils/context';
  import { IconName } from '../../custom-icon/constants';
  import CustomIcon from '../../custom-icon/CustomIcon.svelte';

  type HomeButtonProps = {
    className?: string;
    id: string;
  };

  const { id, className = '' }: HomeButtonProps = $props();
  const appState = getStateContext<AppState>(StateContextName.APP);
  const { setPublicationId } = $derived(appState() ?? {});
  const modalState = getStateContext<ModalState>(StateContextName.PUBLICATIONS_PAGE_MODAL);
  const { setId, toggleModalVisibility } = $derived(modalState() ?? {});

  const handleSendClick = () => {
    setPublicationId(id);
    setId(ModalId.SEND);
    toggleModalVisibility();
  };
</script>

<button class={[className, 'share-button']} type="button" onclick={handleSendClick}>
  <CustomIcon iconName={IconName.SHARE} />
</button>
