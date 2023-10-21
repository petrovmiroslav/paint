import React, { SetStateAction } from "react";
import { Tools, ToolsState } from "@/features/tools/constants";
import { Tool } from "@/sections/Home/ToolBar/components/ToolPicker/Tool/Tool";

const toolsList = [Tools.PEN, Tools.BRUSH, Tools.ERASER];

type ToolPickerProps = {
  onToolsStateChange: React.Dispatch<SetStateAction<ToolsState>>;
} & Pick<ToolsState, "tool">;

export const ToolPicker = (props: ToolPickerProps) => {
  const handleOnChangeTool = (tool: Tools) => {
    props.onToolsStateChange((prevState) => ({
      ...prevState,
      tool,
    }));
  };

  return (
    <>
      {toolsList.map((tool) => (
        <Tool
          key={tool}
          name={tool}
          selected={props.tool === tool}
          onSelect={handleOnChangeTool}
        />
      ))}
    </>
  );
};
