type AppInitialState = {
  publicationId: string;
};

const appInitialState: AppInitialState = {
  publicationId: '',
};

export const createAppState = () => {
  const appState = $state(appInitialState);

  return {
    get state() {
      return appState;
    },

    setPublicationId(id: string) {
      appState.publicationId = id;
    },
    getPublicationId() {
      return appState.publicationId;
    },
  };
};

export type AppState = ReturnType<typeof createAppState>;
