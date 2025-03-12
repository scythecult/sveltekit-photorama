<script lang="ts">
  import type { IconProps } from '../constants';

  const { fill = 'transparent', stroke = 'currentcolor' }: IconProps = $props();
</script>

<svg {fill} viewBox="0 0 22 22"
  ><line {fill} {stroke} stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon
    {fill}
    points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
    {stroke}
    stroke-linejoin="round"
    stroke-width="2"
  ></polygon></svg
>
