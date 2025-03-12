import type { Comment, Publication } from '$lib/types/publication';

export type PublicationPayload = {
  id: string | null;
  modalTrigger: string;
};

export type AppState = {
  isModalVisible: boolean;
  comments: Comment[];
  publicationPayload: PublicationPayload;
  publications: Publication[];
};

const createAppSlice = () => {
  const appSlice = $state<AppState>({
    isModalVisible: false,
    publications: [],
    comments: [],
    publicationPayload: {
      id: null,
      modalTrigger: '',
    },
  });

  return {
    get state() {
      return appSlice;
    },

    setPublications(publications: Publication[]) {
      appSlice.publications = publications;
    },

    setPublicationPayload(payload: PublicationPayload) {
      appSlice.publicationPayload = payload;
    },
    toggleModalVisibility() {
      appSlice.isModalVisible = !appSlice.isModalVisible;
    },
    getComments() {
      const {
        publications,
        publicationPayload: { id },
      } = appSlice;

      return id !== null ? publications.find((publication) => +publication.id === +id)?.comments || [] : [];
    },
    getModalTrigger() {
      return appSlice.publicationPayload.modalTrigger;
    },

    getModalState() {
      return appSlice.isModalVisible;
    },
  };
};

export const appSlice = createAppSlice();
