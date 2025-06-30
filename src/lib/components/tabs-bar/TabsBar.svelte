<script lang="ts">
  import './styles.css';
  import { onMount, type Snippet } from 'svelte';

  type TabsBarProps = {
    className?: string;
    children: Snippet;
  };

  const { className = '', children }: TabsBarProps = $props();
  const classNameFinal = [className, 'tabs-bar'];
  const childMetric = $state({ width: 0, top: 0, right: 0, left: 0, bottom: 0, height: 0 });
  let childNodes = $state<Element[]>([]);

  const handleTabClick = (evt: Event | { target: HTMLElement }) => {
    if (evt.target instanceof HTMLElement) {
      const { width, top, right, left, bottom, height } = evt.target.getBoundingClientRect();

      childMetric.width = width;
      childMetric.top = top;
      childMetric.right = right;
      childMetric.left = left;
      childMetric.bottom = bottom;
      childMetric.height = height;
    }
  };

  onMount(() => {
    const tabsBar = document.querySelector('.tabs-bar');

    if (tabsBar && tabsBar.children.length) {
      childNodes = Array.from(tabsBar.children);

      const [firstNode] = childNodes;

      firstNode.classList.add('active');

      childNodes.forEach((childNode) => {
        childNode.addEventListener('click', handleTabClick);
      });
    }
  });
</script>

<div
  class={classNameFinal}
  role="tablist"
  style="--width: {childMetric.width}px; --height: {childMetric.height}px; --left: {childMetric.left}px; --top: {childMetric.top}px"
>
  {@render children()}
</div>
