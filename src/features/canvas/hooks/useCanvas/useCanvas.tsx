import React from "react";
import { Canvas } from "@/features/canvas/model";
import {
  BrushType,
  EraserType,
  Tools,
  ToolsState,
} from "@/features/tools/constants";
import { config } from "@/features/app/constants";

type UseCanvasParams = {
  canvasInstance: Canvas | null;
  penOptions: ToolsState[Tools.PEN];
  brushOptions: ToolsState[Tools.BRUSH];
  eraserOptions: ToolsState[Tools.ERASER];
} & Pick<ToolsState, "color">;

export const useCanvas = (props: UseCanvasParams) => {
  const clearCanvas = React.useCallback((canvas: Canvas) => {
    canvas.fillCanvas(config.canvasConfig.backgroundStyle);
  }, []);

  const drawDotWithPen = React.useCallback(
    (params: { x: number; y: number }) => {
      if (!props.canvasInstance) return;
      props.canvasInstance.drawFilledRectangle({
        x: params.x - props.penOptions.size / 2,
        y: params.y - props.penOptions.size / 2,
        width: props.penOptions.size,
        height: props.penOptions.size,
        fillStyle: props.color,
      });
    },
    [props.canvasInstance, props.penOptions.size, props.color],
  );

  const drawLineWithPen = React.useCallback(
    (params: { fromX: number; fromY: number; toX: number; toY: number }) => {
      if (!props.canvasInstance) return;
      props.canvasInstance.drawLine({
        ...params,
        lineWidth: props.penOptions.size,
        strokeStyle: props.color,
      });
    },
    [props.canvasInstance, props.penOptions.size, props.color],
  );

  const drawWithBrush = React.useCallback(
    (params: { x: number; y: number }) => {
      if (!props.canvasInstance) return;
      const fillStyle = props.color;

      switch (props.brushOptions.type) {
        case BrushType.CIRCLE: {
          props.canvasInstance.drawFilledCircle({
            ...params,
            size: props.brushOptions.size,
            fillStyle,
          });
          break;
        }
        case BrushType.SQUARE: {
          props.canvasInstance.drawFilledRectangle({
            x: params.x - props.brushOptions.size / 2,
            y: params.y - props.brushOptions.size / 2,
            width: props.brushOptions.size,
            height: props.brushOptions.size,
            fillStyle,
          });
        }
      }
    },
    [
      props.brushOptions.size,
      props.brushOptions.type,
      props.canvasInstance,
      props.color,
    ],
  );

  const erase = React.useCallback(
    (params: { x: number; y: number }) => {
      if (!props.canvasInstance) return;

      const fillStyle = config.canvasConfig.backgroundStyle;

      switch (props.eraserOptions.type) {
        case EraserType.SQUARE: {
          props.canvasInstance.drawFilledRectangle({
            x: params.x - props.eraserOptions.size / 2,
            y: params.y - props.eraserOptions.size / 2,
            width: props.eraserOptions.size,
            height: props.eraserOptions.size,
            fillStyle,
          });
          break;
        }
        case EraserType.CIRCLE: {
          props.canvasInstance.drawFilledCircle({
            x: params.x,
            y: params.y,
            size: props.eraserOptions.size,
            fillStyle,
          });
          break;
        }
      }
    },
    [props.canvasInstance, props.eraserOptions.size, props.eraserOptions.type],
  );

  return { clearCanvas, drawDotWithPen, drawLineWithPen, drawWithBrush, erase };
};
