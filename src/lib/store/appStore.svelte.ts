export type AppState = {
  publicationId: string;
};

const createAppStore = () => {
  const appStore = $state<AppState>({
    publicationId: '',
  });

  return {
    get state() {
      return appStore;
    },

    setPublicationId(id: string) {
      appStore.publicationId = id;
    },
    getPublicationId() {
      return appStore.publicationId;
    },
  };
};

export const appStore = createAppStore();
