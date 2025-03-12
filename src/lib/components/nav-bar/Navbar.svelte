<script lang="ts">
  import './styles.css';
  import { AppRoute } from '$lib/constants/common';
  import AddButton from '../buttons/add-button/AddButton.svelte';
  import HomeButton from '../buttons/home-button/HomeButton.svelte';
  import SearchButton from '../buttons/search-button/SearchButton.svelte';
  import { UserAvatarSize } from '../user-avatar/constants';
  import UserAvatar from '../user-avatar/UserAvatar.svelte';
</script>

<nav class="nav-bar">
  <HomeButton className="nav-bar__button" />
  <SearchButton className="nav-bar__button" />
  <AddButton className="nav-bar__button" />
  <UserAvatar
    className="nav-bar__button"
    src="/"
    alt="User logo"
    href={`${AppRoute.USER}?name=UsernameUsernameUsername`}
    avatarSize={UserAvatarSize.SMALL}
  />
</nav>
