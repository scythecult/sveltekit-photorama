<script lang="ts">
  import type { IconProps } from '../constants';

  const { fill = 'transparent', stroke = 'currentcolor' }: IconProps = $props();
</script>

<svg viewBox="0 0 16 16" {fill} xmlns="http://www.w3.org/2000/svg" {stroke} stroke-width="1.5">
  <path d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z" {fill} />
</svg>
