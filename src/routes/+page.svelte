<script lang="ts">
  import { navigating } from '$app/state';
</script>

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
</p>

<button
  onclick={async () => {
    const response = await fetch('/api/add');

    const result = await response.json();
    // eslint-disable-next-line no-console
    console.log({ result });
  }}>Check for GET api routes</button
>

<button
  onclick={async () => {
    const response = await fetch('/api/add', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const result = await response.json();

    // eslint-disable-next-line no-console
    console.log({ result });
  }}>Check for POST api routes</button
>

{#if navigating.to}
  <p>Please wait we try to navigate to {navigating.to?.url.pathname}</p>
{/if}
