import { ModalType, type ModalTypeValue } from '$lib/components/modal/constants';
import type { ModalIdValue } from '$lib/constants/common';

type ModalInitialState = {
  id: ModalIdValue | null;
  type: ModalTypeValue;
  isVisible: boolean;
};

const modalInitialState: ModalInitialState = {
  id: null,
  type: ModalType.SLIDE,
  isVisible: false,
};

export const createModalState = () => {
  const modalState = $state(modalInitialState);

  return {
    get state() {
      return modalState;
    },

    toggleModalVisibility() {
      modalState.isVisible = !modalState.isVisible;
    },

    getVisibilityState() {
      return modalState.isVisible;
    },

    setId(id: ModalIdValue) {
      modalState.id = id;
    },

    getId() {
      return modalState.id;
    },

    setType(type: ModalTypeValue) {
      modalState.type = type;
    },

    getType() {
      return modalState.type;
    },
  };
};

export type ModalState = ReturnType<typeof createModalState>;
