import React from "react";
import { PageWithLayout } from "@/utils/next/next";
import { PageLayout } from "@/layouts/PageLayout/PageLayout";
import {
  CanvasComponent,
  CanvasComponentProps,
} from "@/sections/Home/Canvas/CanvasComponent";
import { Canvas } from "@/features/canvas/model";
import { PointerState } from "@/features/pointer/constants";
import { useCanvas } from "@/features/canvas/hooks/useCanvas/useCanvas";
import { useHistory } from "@/features/history/hooks/useHistory/useHistory";
import { Tools, ToolsState } from "@/features/tools/constants";
import { ToolBar } from "@/sections/Home/ToolBar/ToolBar";
import { config } from "@/features/app/constants";
import { roundMousePosition } from "@/features/pointer/utils/utils";
import { CursorToolOption } from "@/sections/Home/Canvas/Cursor/Cursor";

import css from "../sections/Home/Home.module.scss";

const Home: PageWithLayout = () => {
  const [canvasInstance, setCanvasInstance] = React.useState<Canvas | null>(
    null,
  );
  const [pointerState, setPointerState] = React.useState<PointerState>(
    config.pointerConfig.pointerStateInitialValue,
  );
  const [toolsState, setToolsState] = React.useState<ToolsState>(
    config.toolsConfig.toolsStateInitialValue,
  );

  const penOptions = toolsState[Tools.PEN];
  const brushOptions = toolsState[Tools.BRUSH];
  const eraserOptions = toolsState[Tools.ERASER];

  const pointerStateRef = React.useRef(pointerState);

  const cursorToolOption = React.useMemo((): CursorToolOption => {
    if (toolsState.tool === Tools.PEN) return { tool: toolsState.tool };
    if (toolsState.tool === Tools.BRUSH)
      return { tool: toolsState.tool, ...brushOptions };

    return { tool: toolsState.tool, ...eraserOptions };
  }, [brushOptions, eraserOptions, toolsState.tool]);

  const { clearCanvas, drawDotWithPen, drawLineWithPen, drawWithBrush, erase } =
    useCanvas({
      canvasInstance,
      penOptions,
      brushOptions,
      eraserOptions,
      color: toolsState.color,
    });

  const {
    clearHistory,
    saveUndo,
    clearRedoState,
    undo,
    redo,
    undoStackEmpty,
    redoStackEmpty,
  } = useHistory({
    canvasInstance,
  });

  const handleOnPointerStateChange = React.useCallback(
    (state: PointerState) => {
      type OnlyKeyWithNumericValues = keyof {
        [P in keyof PointerState as PointerState[P] extends number | undefined
          ? P
          : never]: PointerState[P];
      };
      const stateKeysToRound: Array<OnlyKeyWithNumericValues> = [
        "downX",
        "downY",
        "moveX",
        "moveY",
      ];
      stateKeysToRound.forEach((key) => {
        state[key] = roundMousePosition(state[key]);
      });

      setPointerState(state);
    },
    [],
  );

  const handleOnPointerDown = React.useCallback<
    CanvasComponentProps["onPointerDown"]
  >(
    (_pointerState) => {
      switch (toolsState.tool) {
        case Tools.PEN: {
          drawDotWithPen({ x: _pointerState.downX, y: _pointerState.downY });
          break;
        }
        case Tools.BRUSH: {
          drawWithBrush({
            x: _pointerState.downX,
            y: _pointerState.downY,
          });
          break;
        }
        case Tools.ERASER: {
          erase({ x: _pointerState.downX, y: _pointerState.downY });
          break;
        }
      }
    },
    [drawDotWithPen, drawWithBrush, erase, toolsState.tool],
  );

  const handleOnPointerMove = React.useCallback<
    CanvasComponentProps["onPointerMove"]
  >(
    (_pointerState) => {
      if (!_pointerState.isPointerDown || !canvasInstance) return;

      const prevPointerState = pointerStateRef.current;

      switch (toolsState.tool) {
        case Tools.PEN: {
          drawLineWithPen({
            fromX: prevPointerState.moveX,
            fromY: prevPointerState.moveY,
            toX: _pointerState.moveX,
            toY: _pointerState.moveY,
          });
          break;
        }
        case Tools.BRUSH: {
          drawWithBrush({
            x: _pointerState.moveX,
            y: _pointerState.moveY,
          });
          break;
        }
        case Tools.ERASER: {
          erase({
            x: _pointerState.moveX,
            y: _pointerState.moveY,
          });
          break;
        }
      }
    },
    [canvasInstance, drawWithBrush, drawLineWithPen, erase, toolsState.tool],
  );

  const handleOnPointerUp = React.useCallback<
    CanvasComponentProps["onPointerUp"]
  >(
    (_pointerState) => {
      const prevPointerState = pointerStateRef.current;

      if (!prevPointerState.isPointerDown || !canvasInstance) return;

      switch (toolsState.tool) {
        case Tools.PEN: {
          drawLineWithPen({
            fromX: prevPointerState.moveX,
            fromY: prevPointerState.moveY,
            toX: _pointerState.moveX,
            toY: _pointerState.moveY,
          });
          break;
        }
      }

      clearRedoState();
      saveUndo();
    },
    [
      canvasInstance,
      clearRedoState,
      drawLineWithPen,
      saveUndo,
      toolsState.tool,
    ],
  );

  const handleOnDocumentPointerUp = React.useCallback(
    (event: WindowEventMap["pointerup"]) => {
      if (
        !canvasInstance ||
        !pointerStateRef.current.isPointerDown ||
        !canvasInstance.canvasElement.parentElement
      )
        return;

      const rect =
        canvasInstance.canvasElement.parentElement.getBoundingClientRect();

      const newState = {
        ...pointerStateRef.current,
        isPointerDown: false,
        moveX: Math.max(Math.min(event.clientX - rect.x, rect.width), 0),
        moveY: Math.max(Math.min(event.clientY - rect.y, rect.height), 0),
      };

      handleOnPointerStateChange(newState);
      handleOnPointerUp(newState);
    },
    [canvasInstance, handleOnPointerUp, handleOnPointerStateChange],
  );

  const handleOnResetClick = React.useCallback(() => {
    if (!canvasInstance) return;
    clearCanvas(canvasInstance);
    clearHistory();
  }, [canvasInstance, clearCanvas, clearHistory]);

  const handleOnUndoClick = React.useCallback(() => undo(), [undo]);
  const handleOnRedoClick = React.useCallback(() => redo(), [redo]);

  const setCanvasRef = React.useCallback((canvasElement: HTMLCanvasElement) => {
    const instance = new Canvas(canvasElement);
    setCanvasInstance(instance);
  }, []);

  React.useEffect(() => {
    pointerStateRef.current = pointerState;
  }, [pointerState]);

  React.useEffect(() => {
    const listener = handleOnDocumentPointerUp;
    document.addEventListener("pointerup", listener);
    return () => document.removeEventListener("pointerup", listener);
  }, [canvasInstance, handleOnDocumentPointerUp]);

  React.useEffect(() => {
    // init app
    if (!canvasInstance) return;
    clearCanvas(canvasInstance);
    saveUndo();
  }, [canvasInstance, clearCanvas, saveUndo]);

  return (
    <>
      <CanvasComponent
        onCanvasRef={setCanvasRef}
        pointerState={pointerState}
        cursorToolOption={cursorToolOption}
        onPointerStateChange={handleOnPointerStateChange}
        onPointerDown={handleOnPointerDown}
        onPointerMove={handleOnPointerMove}
        onPointerUp={handleOnPointerUp}
      />

      <ToolBar
        toolsState={toolsState}
        onToolsStateChange={setToolsState}
        onResetClick={handleOnResetClick}
        onUndoClick={handleOnUndoClick}
        onRedoClick={handleOnRedoClick}
        undoStackEmpty={undoStackEmpty}
        redoStackEmpty={redoStackEmpty}
        isDrawing={pointerState.isPointerDown}
      />
    </>
  );
};

Home.getLayout = (page) => {
  return <PageLayout mainClassName={css.main}>{page}</PageLayout>;
};

export default Home;
