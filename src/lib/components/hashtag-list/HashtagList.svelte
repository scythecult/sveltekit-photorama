<script lang="ts">
  import './styles.css';
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
