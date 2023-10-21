import React from "react";
import { HistoryState } from "@/features/history/constants";
import { config } from "@/features/app/constants";
import { Canvas } from "@/features/canvas/model";

type UseHistoryParams = {
  canvasInstance: Canvas | null;
};

export const useHistory = (props: UseHistoryParams) => {
  const [historyState, setHistoryState] = React.useState<HistoryState>(
    config.historyConfig.historyInitialValue,
  );

  const undoStackEmpty =
    !historyState.undoStack.length || historyState.undoStack.length === 1;
  const redoStackEmpty = !historyState.redoStack.length;

  const saveUndo = React.useCallback(() => {
    if (!props.canvasInstance) return;
    const copy = Canvas.getCopyCanvas(props.canvasInstance.canvasElement);

    setHistoryState((prevState) => {
      const newUndoStack = [...prevState.undoStack, copy].slice(
        -config.historyConfig.maxHistoryStackLength - 1,
      );

      return {
        ...prevState,
        undoStack: newUndoStack,
      };
    });
  }, [props.canvasInstance]);

  const clearRedoState = React.useCallback(() => {
    setHistoryState((prevState) => {
      prevState.redoStack.forEach(Canvas.getClearSizeOfCanvas);

      return {
        ...prevState,
        redoStack: [],
      };
    });
  }, []);

  const clearHistory = React.useCallback(() => {
    setHistoryState((prevState) => {
      prevState.undoStack.forEach(Canvas.getClearSizeOfCanvas);
      prevState.redoStack.forEach(Canvas.getClearSizeOfCanvas);
      return config.historyConfig.historyInitialValue;
    });

    saveUndo();
  }, [saveUndo]);

  const undo = React.useCallback(() => {
    if (!props.canvasInstance || undoStackEmpty) return;
    const newUndoStack = historyState.undoStack.slice(0, -1);
    const lastUndoState = newUndoStack[newUndoStack.length - 1];
    const currentState =
      historyState.undoStack[historyState.undoStack.length - 1];
    const newRedoStack = [currentState, ...historyState.redoStack].slice(
      0,
      config.historyConfig.maxHistoryStackLength,
    );

    Canvas.pasteContentFromOtherCanvas(
      lastUndoState,
      props.canvasInstance.canvasElement,
    );

    setHistoryState({
      ...historyState,
      undoStack: newUndoStack,
      redoStack: newRedoStack,
    });
  }, [props.canvasInstance, undoStackEmpty, historyState]);

  const redo = React.useCallback(() => {
    if (!props.canvasInstance || redoStackEmpty) return;
    const [firstRedoState, ...newRedoStack] = historyState.redoStack;
    Canvas.pasteContentFromOtherCanvas(
      firstRedoState,
      props.canvasInstance.canvasElement,
    );
    setHistoryState({ ...historyState, redoStack: newRedoStack });
    saveUndo();
  }, [props.canvasInstance, redoStackEmpty, historyState, saveUndo]);

  return {
    historyState,
    clearHistory,
    saveUndo,
    clearRedoState,
    undo,
    redo,
    undoStackEmpty,
    redoStackEmpty,
  };
};
