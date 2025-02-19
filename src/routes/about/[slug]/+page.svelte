<script lang="ts">
  const { data } = $props();
</script>

<!-- TODO resolve types -->
<h2>Family {data.info.title}</h2>
<div>{@html data.info.content}</div>
