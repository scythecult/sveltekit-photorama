import type { HeaderNavItem } from '$lib/types/navigation';
import type { Comment, Picture } from '$lib/types/picture';

export type AppState = {
  navItems: HeaderNavItem[];
  isModalVisible: boolean;
  comments: Comment[];
  pictureId: string | null;
};

const appState = $state<AppState>({ navItems: [], isModalVisible: false, comments: [], pictureId: null });

export const getAppState = () => {
  const setNavItems = (navItems: HeaderNavItem[]) => {
    appState.navItems = navItems;
  };
  const setComments = (comments: Comment[]) => {
    appState.comments = comments;
  };
  const setPictureId = (pictureId: string) => {
    appState.pictureId = pictureId;
  };
  const toggleModalVisibility = () => {
    appState.isModalVisible = !appState.isModalVisible;
  };
  const getComments = (pictures: Picture[]) => {
    const { pictureId } = appState;

    return pictureId ? pictures.find((picture) => +picture.id === +pictureId)?.comments || [] : [];
  };
  const getModalState = () => appState.isModalVisible;

  return {
    setNavItems,
    setComments,
    setPictureId,
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
  const pageSlice = $state<PageState>({ isModalVisible: false, comments: [], pictureId: null });

  return {
    setPictureId(pictureId: string) {
      pageSlice.pictureId = pictureId;
    },
    toggleModalVisibility() {
      pageSlice.isModalVisible = !pageSlice.isModalVisible;
    },
    getCommentsFromPictures(pictures: Picture[]) {
      const { pictureId } = pageSlice;

      return pictureId ? pictures.find((picture) => +picture.id === +pictureId)?.comments || [] : [];
    },
    getModalState() {
      return pageSlice.isModalVisible;
    },
  };
};

export const pageSlice = createPageSlice();
