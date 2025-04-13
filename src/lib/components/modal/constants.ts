export const ModalType = {
  SLIDE: 'slide',
  FLOATING: 'floating',
} as const;

export type ModalTypeKey = keyof typeof ModalType;
export type ModalTypeValue = (typeof ModalType)[ModalTypeKey];
