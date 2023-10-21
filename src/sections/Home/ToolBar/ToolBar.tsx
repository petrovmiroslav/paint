import React, { SetStateAction } from "react";
import { cn } from "@/utils/styles/styles";
import { Tools, ToolsState } from "@/features/tools/constants";
import { ToolPicker } from "@/sections/Home/ToolBar/components/ToolPicker/ToolPicker";
import { ColorPicker } from "@/sections/Home/ToolBar/components/ColorPicker/ColorPicker";
import { PenOptionsComponent } from "@/sections/Home/ToolBar/components/PenOptionsComponent/PenOptionsComponent";
import { HistoryButton } from "@/sections/Home/ToolBar/components/HistoryButton/HistoryButton";
import { ResetButton } from "@/sections/Home/ToolBar/components/ResetButton/ResetButton";
import { BrushOptionsComponent } from "@/sections/Home/ToolBar/components/BrushOptionsComponent/BrushOptionsComponent";
import { EraserOptionsComponent } from "@/sections/Home/ToolBar/components/EraserOptionsComponent/EraserOptionsComponent";
import { Divider } from "@/components/ui/Divider/Divider";

import css from "./ToolBar.module.scss";

export type ToolBarProps = {
  toolsState: ToolsState;
  onToolsStateChange: React.Dispatch<SetStateAction<ToolsState>>;
  onResetClick: () => void;
  onUndoClick: () => void;
  onRedoClick: () => void;
  undoStackEmpty: boolean;
  redoStackEmpty: boolean;
  isDrawing: boolean;
};

export const ToolBar = React.memo<ToolBarProps>((props) => {
  const { onToolsStateChange } = props;

  const divider = <Divider className={css.divider} />;

  const toolsOptions: Record<Tools, React.ReactNode> = {
    [Tools.PEN]: (
      <PenOptionsComponent
        onToolsStateChange={onToolsStateChange}
        {...props.toolsState[Tools.PEN]}
      />
    ),
    [Tools.BRUSH]: (
      <BrushOptionsComponent
        onToolsStateChange={onToolsStateChange}
        {...props.toolsState[Tools.BRUSH]}
      />
    ),
    [Tools.ERASER]: (
      <EraserOptionsComponent
        onToolsStateChange={onToolsStateChange}
        {...props.toolsState[Tools.ERASER]}
      />
    ),
  };

  return (
    <div
      className={cn(
        css.container,
        props.isDrawing && css.container_transparentForMouse,
      )}
    >
      <div className={css.scroller}>
        <div className={css.contentContainer}>
          <HistoryButton
            undo={true}
            onClick={props.onUndoClick}
            disabled={props.undoStackEmpty}
          />
          <HistoryButton
            undo={false}
            onClick={props.onRedoClick}
            disabled={props.redoStackEmpty}
          />

          {divider}

          <ToolPicker
            tool={props.toolsState.tool}
            onToolsStateChange={onToolsStateChange}
          />

          {divider}

          <ColorPicker
            color={props.toolsState.color}
            onToolsStateChange={onToolsStateChange}
          />

          {divider}

          <ResetButton onClick={props.onResetClick} />

          {divider}

          {toolsOptions[props.toolsState.tool]}
        </div>
      </div>
    </div>
  );
});
ToolBar.displayName = "ToolBar";
