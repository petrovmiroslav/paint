import { CanvasElementType } from "@/features/canvas/model";

const maxHistoryStackLength = 5;

export type HistoryState = {
  undoStack: Array<CanvasElementType>;
  redoStack: Array<CanvasElementType>;
};

const historyInitialValue: HistoryState = {
  undoStack: [],
  redoStack: [],
};

export const historyConfig = {
  historyInitialValue,
  maxHistoryStackLength,
} as const;
