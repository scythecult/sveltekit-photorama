import { getContext } from 'svelte';
import type { AppState } from './store.svelte';
import { APP_STATE_NAME } from '$lib/constants/store';

export const getAppState = () => getContext<AppState>(APP_STATE_NAME);
