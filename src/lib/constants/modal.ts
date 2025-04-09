export const ModalId = {
  SEND: 'send',
  COMMENT: 'comment',
} as const;

export type ModalIdKey = keyof typeof ModalId;
export type ModalIdValue = (typeof ModalId)[ModalIdKey];
