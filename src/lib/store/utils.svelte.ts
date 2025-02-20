import { getContext } from 'svelte';
import { APP_STATE_NAME } from '$lib/constants/store';
import type { AppState } from './store.svelte';

export const getAppState = () => getContext<AppState>(APP_STATE_NAME);
