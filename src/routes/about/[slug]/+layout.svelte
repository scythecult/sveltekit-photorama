<script lang="ts">
	const { data, children } = $props();
</script>

<div class="layout">
	<main>
		{@render children()}
	</main>

	<aside>
		<ul>
			{#each data.navigation as { slug, title }}
				<li><a href="/about/{slug}">{title}</a></li>
			{/each}
		</ul>
	</aside>
</div>

<style>
	.layout {
		display: grid;
		grid-template-columns: 1fr 230px;
		column-gap: 14px;
	}
</style>
