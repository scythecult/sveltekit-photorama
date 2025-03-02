import type { HeaderNavItem } from '$lib/types/navigation';
import type { Comment, Publication } from '$lib/types/publication';

export type AppState = {
  navItems: HeaderNavItem[];
  isModalVisible: boolean;
  comments: Comment[];
  publicationId: string | null;
};

const appState = $state<AppState>({
  navItems: [],
  isModalVisible: false,
  comments: [],
  publicationId: null,
});

export const getAppState = () => {
  const setNavItems = (navItems: HeaderNavItem[]) => {
    appState.navItems = navItems;
  };
  const setComments = (comments: Comment[]) => {
    appState.comments = comments;
  };
  const setPublicationId = (publicationId: string) => {
    appState.publicationId = publicationId;
  };
  const toggleModalVisibility = () => {
    appState.isModalVisible = !appState.isModalVisible;
  };
  const getComments = (publications: Publication[]) => {
    const { publicationId } = appState;

    return publicationId ? publications.find((picture) => +picture.id === +publicationId)?.comments || [] : [];
  };
  const getModalState = () => appState.isModalVisible;

  return {
    setNavItems,
    setComments,
    setPublicationId,
    toggleModalVisibility,
    getComments,
    getModalState,
    get state() {
      return appState;
    },
  };
};

export type PageState = Omit<AppState, 'navItems'>;

const createPageSlice = () => {
  const pageSlice = $state<PageState>({
    isModalVisible: false,
    comments: [],
    publicationId: null,
  });

  return {
    get state() {
      return pageSlice;
    },
    setPublicationId(publicationId: string) {
      pageSlice.publicationId = publicationId;
    },
    toggleModalVisibility() {
      pageSlice.isModalVisible = !pageSlice.isModalVisible;
    },
    getCommentsFromPublications(publications: Publication[]) {
      const { publicationId } = pageSlice;

      return publicationId
        ? publications.find((publication) => +publication.id === +publicationId)?.comments || []
        : [];
    },
    getModalState() {
      return pageSlice.isModalVisible;
    },
  };
};

export const pageSlice = createPageSlice();
