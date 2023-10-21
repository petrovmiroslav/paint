import React from "react";
import { cn } from "@/utils/styles/styles";
import { Tools, ToolsState } from "@/features/tools/constants";

import css from "./Cursor.module.scss";

export type CursorToolOption =
  | { tool: Tools.PEN }
  | ({ tool: Tools.BRUSH } & ToolsState[Tools.BRUSH])
  | ({ tool: Tools.ERASER } & ToolsState[Tools.ERASER]);

export type CursorProps = {
  x: number;
  y: number;
} & CursorToolOption;

export const Cursor = (props: CursorProps) => {
  const [canHover, setCanHover] = React.useState(false);

  React.useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  if (!canHover || props.tool === Tools.PEN) return null;
  return (
    <div
      className={cn(css.container)}
      style={{ transform: `translate3d(${props.x}px,${props.y}px,0)` }}
    >
      <div
        className={cn(
          css.cursor,
          css[`cursor_${props.tool}`],
          css[`cursor_${props.type}`],
        )}
        style={{
          width: props.size,
          height: props.size,
        }}
      />
    </div>
  );
};
