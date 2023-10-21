export enum Tools {
  PEN = "pen",
  BRUSH = "brush",
  ERASER = "eraser",
}

export type PenOptions = {
  size: number;
};

export enum BrushType {
  CIRCLE = "circle",
  SQUARE = "square",
}

export type BrushOptions = {
  size: number;
  type: BrushType;
};

export enum EraserType {
  CIRCLE = "circle",
  SQUARE = "square",
}

export type EraserOptions = {
  size: number;
  type: EraserType;
};

export type ToolsState = {
  tool: Tools;
  color: string;
  [Tools.PEN]: PenOptions;
  [Tools.BRUSH]: BrushOptions;
  [Tools.ERASER]: EraserOptions;
};

const minPenSize = 1;
const maxPenSize = 4;
const minBrushSize = 16;
const maxBrushSize = 32;
const minEraserSize = 2;
const maxEraserSize = 48;

const penSizeList = [minPenSize, 2, maxPenSize];
const brushSizeList = [minBrushSize, 24, maxBrushSize];
const eraserSizeList = [minEraserSize, 8, 16, 24, maxEraserSize];

const toolsStateInitialValue: ToolsState = {
  tool: Tools.PEN,
  color: "#000000",
  [Tools.PEN]: { size: penSizeList[0] },
  [Tools.BRUSH]: { size: brushSizeList[0], type: BrushType.CIRCLE },
  [Tools.ERASER]: { size: eraserSizeList[2], type: EraserType.SQUARE },
} as const;

export const toolsConfig = {
  toolsStateInitialValue,
  [Tools.PEN]: { minPenSize, maxPenSize, penSizeList },
  [Tools.BRUSH]: { minBrushSize, maxBrushSize, brushSizeList },
  [Tools.ERASER]: { minEraserSize, maxEraserSize, eraserSizeList },
} as const;
