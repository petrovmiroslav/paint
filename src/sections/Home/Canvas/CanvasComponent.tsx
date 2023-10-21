import React from "react";
import { cn } from "@/utils/styles/styles";
import { Canvas } from "@/features/canvas/model";
import { PointerState } from "@/features/pointer/constants";
import { config } from "@/features/app/constants";
import { Cursor, CursorToolOption } from "@/sections/Home/Canvas/Cursor/Cursor";
import CursorCss from "./Cursor/Cursor.module.scss";
import { Tools } from "@/features/tools/constants";

import css from "./Canvas.module.scss";

export type CanvasComponentProps = {
  pointerState: PointerState;
  cursorToolOption: CursorToolOption;
  onCanvasRef: (canvasElement: HTMLCanvasElement) => void;
  onPointerStateChange: (pointerState: PointerState) => void;
  onPointerDown: (pointerState: PointerState) => void;
  onPointerMove: (pointerState: PointerState) => void;
  onPointerUp: (pointerState: PointerState) => void;
};

export const CanvasComponent = React.memo<CanvasComponentProps>((props) => {
  const {
    onCanvasRef,
    onPointerStateChange,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  } = props;

  const handleOnPointerDown = (event: React.PointerEvent) => {
    event.preventDefault();
    const newPointerState: PointerState = {
      ...props.pointerState,
      isPointerDown: true,
      downX: event.nativeEvent.offsetX,
      downY: event.nativeEvent.offsetY,
      moveX: event.nativeEvent.offsetX,
      moveY: event.nativeEvent.offsetY,
    };

    onPointerStateChange(newPointerState);
    onPointerDown(newPointerState);
  };

  const handleOnPointerMove = (event: React.PointerEvent) => {
    const newPointerState: PointerState = {
      ...props.pointerState,
      moveX: event.nativeEvent.offsetX,
      moveY: event.nativeEvent.offsetY,
    };

    onPointerStateChange(newPointerState);
    onPointerMove(newPointerState);
  };

  const handleOnPointerUp = (event: React.PointerEvent) => {
    if (!props.pointerState.isPointerDown) return;
    event.stopPropagation();
    const newPointerState: PointerState = {
      ...props.pointerState,
      isPointerDown: false,
      moveX: event.nativeEvent.offsetX,
      moveY: event.nativeEvent.offsetY,
    };

    onPointerStateChange(newPointerState);
    onPointerUp(newPointerState);
  };

  const handleOnPointerEnter = (event: React.PointerEvent) => {
    if (!props.pointerState.isPointerDown) return;
    const newPointerState: PointerState = {
      ...props.pointerState,
      moveX: event.nativeEvent.offsetX,
      moveY: event.nativeEvent.offsetY,
    };

    onPointerStateChange(newPointerState);
  };

  const handleOnPointerLeave = (event: React.PointerEvent) => {
    if (!props.pointerState.isPointerDown) return;
    const newPointerState: PointerState = {
      ...props.pointerState,
      moveX: event.nativeEvent.offsetX,
      moveY: event.nativeEvent.offsetY,
    };

    onPointerStateChange(newPointerState);
  };

  return (
    <div
      style={{
        maxWidth: config.canvasConfig.canvasWidth,
        maxHeight: config.canvasConfig.canvasHeight,
      }}
      className={cn(
        css.container,
        CursorCss.cursorWrapper,
        props.cursorToolOption.tool !== Tools.PEN &&
          CursorCss.cursorWrapper_cursorHidden,
      )}
      onPointerDown={handleOnPointerDown}
      onPointerMove={handleOnPointerMove}
      onPointerUp={handleOnPointerUp}
      onPointerEnter={handleOnPointerEnter}
      onPointerLeave={handleOnPointerLeave}
    >
      <canvas
        ref={onCanvasRef}
        width={config.canvasConfig.canvasWidth}
        height={config.canvasConfig.canvasHeight}
        className={css.canvas}
      >
        {"Canvas isn't supported by the browser"}
      </canvas>

      <Cursor
        x={props.pointerState.moveX}
        y={props.pointerState.moveY}
        {...props.cursorToolOption}
      />
    </div>
  );
});
CanvasComponent.displayName = "Canvas";
