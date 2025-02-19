<script lang="ts">
	const { children } = $props();
</script>

<!-- Может содержать блок script с пропсами и прочим -->
<h1>Welcome to Todo App</h1>
{@render children()}
