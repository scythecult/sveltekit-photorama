<script lang="ts">
  import './styles.css';
  import { AppRoute } from '$lib/constants/common';
  import HashtagList from '../hashtag-list/HashtagList.svelte';
  import UserAvatar from '../user-avatar/UserAvatar.svelte';

  const MAX_CONTENT_LENGTH = 50;

  const truncateContent = (description: string) => {
    if (!description.length) {
      return '';
    }

    return description.length > MAX_CONTENT_LENGTH ? `${description.slice(0, MAX_CONTENT_LENGTH)}…` : description;
  };

  const getFullContentLength = (description: string, hashtags: string[]) => {
    return description.length + hashtags.join('').length || 0;
  };

  type DescriptionProps = {
    description: string;
    hashtags: string[];
    id: string;
  };

  const { description, hashtags }: DescriptionProps = $props();

  let isExpanded = $state(false);
  const isMoreButtonVisible = $derived(getFullContentLength(description, hashtags) > MAX_CONTENT_LENGTH && !isExpanded);
  const isOnlyHashtagsVisible = !description.length;

  const handleExpandClick = () => (isExpanded = !isExpanded);
</script>

<div class="caption">
  <UserAvatar name="UsernameUsernameUsername" href={`${AppRoute.USER}?name=UsernameUsernameUsername`} />
  <div class="description">
    {#if isOnlyHashtagsVisible}
      <HashtagList {hashtags} />
    {/if}

    {#if isExpanded}
      {description}
      <HashtagList {hashtags} />
    {:else}
      {truncateContent(description)}
    {/if}

    {#if isMoreButtonVisible}
      <button class="caption__expand-button" type="button" onclick={handleExpandClick}>more</button>
    {/if}
  </div>
</div>
