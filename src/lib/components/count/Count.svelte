<script lang="ts">
  import './styles.css';
  type CountProps = {
    count: string | number;
  };

  const { count }: CountProps = $props();
</script>

<span class="count">{count}</span>
