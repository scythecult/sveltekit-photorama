<script>
  import './styles.css';
  import { KEKSTAGRAM_BASE_URL } from '$lib/constants/common';
  import InteractionsButton from '../buttons/interactions-button/InteractionsButton.svelte';
</script>

<header class="header">
  <img class="header__logo" src={`${KEKSTAGRAM_BASE_URL}/logo.png`} alt="Kekstagram" />
  <InteractionsButton />
</header>
