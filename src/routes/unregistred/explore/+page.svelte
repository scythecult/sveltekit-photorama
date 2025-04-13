<script lang="ts">
  import { IconName, IconSize } from '$lib/components/custom-icon/constants';
  import CustomIcon from '$lib/components/custom-icon/CustomIcon.svelte';
  import Link from '$lib/components/link/Link.svelte';
  import { AppRoute } from '$lib/constants/url';
  import { m } from '$lib/paraglide/messages';

  const NAV_TOPIC_AMOUNT = 5;

  const { data } = $props();
  const navTopics = $derived(data.topics.slice(0, NAV_TOPIC_AMOUNT));
  const showcaseTopics = $derived(data.topics.slice(NAV_TOPIC_AMOUNT));
</script>

<h1 class="explore-showcase__title">{m.page_explore_title()}</h1>

<nav class="explore-showcase__nav">
  {#each navTopics as { id, topic } (id)}
    <Link
      className="explore-showcase__nav-link primary-button"
      href={`${AppRoute.UNREGISTRED}${AppRoute.EXPLORE}${AppRoute.TOPICS}/${id}`}>{topic}</Link
    >
  {/each}
</nav>

<div class="explore-showcase__list">
  {#each showcaseTopics as { id, topic, items } (id)}
    <article class="topic">
      <h2 class="topic__title">
        <Link className="topic__title-link" href={`${AppRoute.UNREGISTRED}${AppRoute.EXPLORE}${AppRoute.TOPICS}/${id}`}
          >{topic}</Link
        >
        <CustomIcon className="topic__title-icon" iconSize={IconSize.SMALL} iconName={IconName.ARROW} />
      </h2>
      <ul class="topic__list">
        {#each items as { id, relatesToId, topic, picture } (id)}
          <li class="topic__item">
            <Link
              className="topic__item-link"
              href={`${AppRoute.UNREGISTRED}${AppRoute.EXPLORE}${AppRoute.TOPICS}/${relatesToId}`}
            >
              <img class="topic__item-image" src={picture} alt={topic} />
              <span class="topic__item-name">{topic}</span>
            </Link>
          </li>
        {/each}
      </ul>
    </article>
  {/each}
</div>
