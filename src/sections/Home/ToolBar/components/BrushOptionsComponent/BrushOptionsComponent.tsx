import React, { SetStateAction } from "react";
import { TypeOption } from "@/sections/Home/ToolBar/components/BrushOptionsComponent/TypeOption/TypeOption";
import { BrushType, Tools, ToolsState } from "@/features/tools/constants";
import { SizeOption } from "@/sections/Home/ToolBar/components/BrushOptionsComponent/SizeOption/SizeOption";
import { config } from "@/features/app/constants";

const brushTypeList = [BrushType.CIRCLE, BrushType.SQUARE];

type BrushOptionsComponentProps = {
  onToolsStateChange: React.Dispatch<SetStateAction<ToolsState>>;
} & ToolsState[Tools.BRUSH];

export const BrushOptionsComponent = (props: BrushOptionsComponentProps) => {
  const handleOnChangeBrushType = (type: ToolsState[Tools.BRUSH]["type"]) => {
    props.onToolsStateChange((prevState) => ({
      ...prevState,
      [Tools.BRUSH]: {
        ...prevState[Tools.BRUSH],
        type,
      },
    }));
  };

  const handleOnChangeBrushSize = (size: ToolsState[Tools.BRUSH]["size"]) => {
    props.onToolsStateChange((prevState) => ({
      ...prevState,
      [Tools.BRUSH]: {
        ...prevState[Tools.BRUSH],
        size,
      },
    }));
  };

  return (
    <>
      {brushTypeList.map((type) => (
        <TypeOption
          key={type}
          type={type}
          selected={props.type === type}
          onSelect={handleOnChangeBrushType}
        />
      ))}

      {config.toolsConfig.brush.brushSizeList.map((size) => (
        <SizeOption
          key={size}
          size={size}
          selected={props.size === size}
          onSelect={handleOnChangeBrushSize}
        />
      ))}
    </>
  );
};
