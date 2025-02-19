<script lang="ts">
  import CustomButton from '../custom-button/CustomButton.svelte';
  import { IconName } from '../custom-icon/constants';
  import CustomIcon from '../custom-icon/CustomIcon.svelte';

  let isNewInteractions = $state(true);

  const handleLikeClick = async () => {
    console.log('show interactions', { isNewInteractions });
  };
</script>

<!-- <CustomButton onclick={handleLikeClick} type={CustomComponentType.USER_ACTION}> -->
<CustomIcon iconName={IconName.LIKE} />
<!-- </CustomButton> -->
