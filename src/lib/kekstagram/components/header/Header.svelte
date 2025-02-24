<script>
  import { KEKSTAGRAM_BASE_URL } from '$lib/constants/kekstagram';
  import InteractionsButton from '../buttons/InteractionsButton.svelte';
</script>

<header class="header">
  <img class="header__logo" src={`${KEKSTAGRAM_BASE_URL}/logo.png`} alt="Kekstagram" />
  <InteractionsButton />
</header>

<style>
  .header {
    --width-logo-container: 50dvw;

    display: grid;
    grid-template-columns: var(--width-logo-container) max-content;
    align-items: center;
    justify-content: space-between;

    @media (min-width: 500px) {
      --width-logo-container: 218px;
    }
  }

  .header__logo {
    width: var(--width-logo-container);
  }
</style>
