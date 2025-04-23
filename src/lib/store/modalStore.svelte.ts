import type { ModalIdValue } from '$lib/constants/common';

type ModalState = {
  id: ModalIdValue | null;
  isVisible: boolean;
};

const createModalStore = () => {
  const modalStore = $state<ModalState>({
    id: null,
    isVisible: false,
  });

  return {
    get state() {
      return modalStore;
    },

    toggleModalVisibility() {
      modalStore.isVisible = !modalStore.isVisible;
    },

    getVisibilityState() {
      return modalStore.isVisible;
    },

    setId(id: ModalIdValue) {
      modalStore.id = id;
    },

    getId() {
      return modalStore.id;
    },
  };
};

export const modalStore = createModalStore();
