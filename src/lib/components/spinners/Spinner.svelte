<script lang="ts">
  import './styles.css';

  type SpinnerProps = {
    className?: string;
  };

  const { className = '' }: SpinnerProps = $props();
  const classNameFinal = [className, 'spinner'];
</script>

<div class={classNameFinal} aria-label="loading"></div>
