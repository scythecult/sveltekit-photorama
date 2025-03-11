<script lang="ts">
  import type { IconProps } from '../constants';

  const { fill = 'transparent', stroke = 'currentcolor' }: IconProps = $props();
</script>

<svg viewBox="0 0 22 22" {fill} xmlns="http://www.w3.org/2000/svg">
  <path
    d="M15 12H12M12 12H9M12 12V9M12 12V15M17 21H7C4.79086 21 3 19.2091 3 17V7C3 4.79086 4.79086 3 7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21Z"
    {stroke}
    stroke-width="2"
    stroke-linecap="round"
  />
</svg>
