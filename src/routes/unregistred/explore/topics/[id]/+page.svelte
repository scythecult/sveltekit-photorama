<script lang="ts">
  import HighlightedText from '$lib/components/highlighted-text/HighlightedText.svelte';
  import Link from '$lib/components/link/Link.svelte';
  import { AppRoute } from '$lib/constants/app.js';
  import { m } from '$lib/paraglide/messages.js';

  const { data } = $props();

  const topicTitle = $derived(data.topic?.topic);
  const topicItems = $derived(data.topic?.items);
</script>

{#if topicItems?.length}
  <h1 class="explore-showcase__title">{topicTitle}</h1>

  <div class="explore-showcase__list explore-showcase__list--publications">
    {#each topicItems as { id, picture, topic, userName } (id)}
      <article class="explore-publication">
        <Link className="explore-publication__link" href={`${AppRoute.PROFILE}/${userName}`}>
          <img class="explore-publication__image" src={picture} alt={topic} />
        </Link>
      </article>
    {/each}
  </div>
{:else}
  <div class="explore__no-topics">
    <HighlightedText phrase={m['explore_page.no_topics']()} />
    <Link className="explore__no-topics-link primary-button" href={AppRoute.EXPLORE}>{m['explore_page.link']()}</Link>
  </div>
{/if}
