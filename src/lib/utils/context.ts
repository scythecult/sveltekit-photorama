import { getContext, setContext } from 'svelte';

type StateContextValue<State> = () => State;

/**
 * Set a context value that can be accessed with getStateContext.
 * The context value is stored as a function that returns the value.
 * This allows the value to be updated, and the update will be reflected
 * when the context value is accessed with getStateContext.
 * @param stateName The name of the context value to set.
 * @param stateValue A function that returns the context value.
 */
export const setStateContext = <State>(stateName: string, stateValue: StateContextValue<State>) =>
  setContext(stateName, () => stateValue());

/**
 * Get a context value that was previously set with setStateContext.
 * The context value is a function that returns the value.
 * This allows the value to be updated, and the update will be reflected
 * when the context value is accessed.
 * @param stateName The name of the context value to get.
 * @returns The context value as a function that returns the value.
 */
export const getStateContext = <State>(stateName: string): StateContextValue<State> =>
  getContext<StateContextValue<State>>(stateName);
