<script lang="ts">
  import './styles.css';
  import { IconName } from '$lib/components/custom-icon/constants';
  import CustomIcon from '$lib/components/custom-icon/CustomIcon.svelte';
  import SignupEmailForm from '$lib/components/forms/signup-form/SignupEmailForm.svelte';
  import Header from '$lib/components/header/Header.svelte';
  import LangSwitcher from '$lib/components/lang-switcher/LangSwitcher.svelte';
  import Link from '$lib/components/link/Link.svelte';
  import { AppRoute } from '$lib/constants/common';
  import { m } from '$lib/paraglide/messages';
</script>

<Header className="signup-header">
  <nav class="signup-nav">
    <Link className="signup-nav__back-link" href={AppRoute.LOGIN}>
      <CustomIcon iconName={IconName.ARROW} />
    </Link>
    <h2 class="signup-nav__title">{m.page_register_title()}</h2>
  </nav>
  <LangSwitcher />
</Header>

<section class="signup">
  <div class="signup__form">
    <SignupEmailForm />
  </div>
</section>
