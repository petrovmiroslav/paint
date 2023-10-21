export type PointerState = {
  isPointerDown: boolean;
  downX: number;
  downY: number;
  moveX: number;
  moveY: number;
};

const pointerStateInitialValue: PointerState = {
  isPointerDown: false,
  downX: 0,
  downY: 0,
  moveX: 0,
  moveY: 0,
} as const;

export const pointerConfig = {
  pointerStateInitialValue,
} as const;
