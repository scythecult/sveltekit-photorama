<script lang="ts">
  import './styles.css';
  import { ModalTrigger } from '$lib/constants/common';
  import { appSlice } from '$lib/store/appStore.svelte';
  import { IconName } from '../../custom-icon/constants';
  import CustomIcon from '../../custom-icon/CustomIcon.svelte';

  type HomeButtonProps = {
    className?: string;
    id: string;
  };

  const { id, className = '' }: HomeButtonProps = $props();

  const handleSendClick = () => {
    appSlice.setPublicationPayload({ modalTrigger: ModalTrigger.SEND, id });
    appSlice.toggleModalVisibility();
  };
</script>

<button class={[className, 'send-button']} type="button" onclick={handleSendClick}>
  <CustomIcon iconName={IconName.SEND} />
</button>
