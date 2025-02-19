<script lang="ts">
	const { data } = $props();
</script>

<h1>About</h1>

<ul>
	{#each data.navigation as { slug, title }}
		<li><a href="/about/{slug}">{title}</a></li>
	{/each}
</ul>
