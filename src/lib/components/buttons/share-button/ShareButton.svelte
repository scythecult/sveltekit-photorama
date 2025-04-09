<script lang="ts">
  import './styles.css';
  import { ModalId } from '$lib/constants/modal';
  import { appStore } from '$lib/store/appStore.svelte';
  import { modalStore } from '$lib/store/modalStore.svelte';
  import { IconName } from '../../custom-icon/constants';
  import CustomIcon from '../../custom-icon/CustomIcon.svelte';

  type HomeButtonProps = {
    className?: string;
    id: string;
  };

  const { id, className = '' }: HomeButtonProps = $props();

  const handleSendClick = () => {
    appStore.setPublicationId(id);
    modalStore.setId(ModalId.SEND);
    modalStore.toggleModalVisibility();
  };
</script>

<button class={[className, 'share-button']} type="button" onclick={handleSendClick}>
  <CustomIcon iconName={IconName.SHARE} />
</button>
