<script lang="ts">
  type HashtagListProps = {
    hashtags: string[];
  };

  const { hashtags }: HashtagListProps = $props();
</script>

<span class="tags">
  {#each hashtags as tag (tag)}
    <a class="tag-link" href="/{tag}" target="_top" rel="noopener noreferrer">{tag}</a>
  {/each}
</span>

<style>
  .tags {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 2px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .tag-link {
    color: var(--link-text-hashtag);
  }
</style>
