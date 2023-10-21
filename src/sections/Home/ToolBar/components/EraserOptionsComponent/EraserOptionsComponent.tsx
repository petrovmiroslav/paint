import React, { SetStateAction } from "react";
import { EraserType, Tools, ToolsState } from "@/features/tools/constants";
import { SizeOption } from "@/sections/Home/ToolBar/components/EraserOptionsComponent/SizeOption/SizeOption";
import { TypeOption } from "@/sections/Home/ToolBar/components/EraserOptionsComponent/TypeOption/TypeOption";
import { config } from "@/features/app/constants";

const eraserTypeList = [EraserType.CIRCLE, EraserType.SQUARE];

type EraserOptionsComponentProps = {
  onToolsStateChange: React.Dispatch<SetStateAction<ToolsState>>;
} & ToolsState[Tools.ERASER];

export const EraserOptionsComponent = (props: EraserOptionsComponentProps) => {
  const handleOnChangeEraseType = (type: ToolsState[Tools.ERASER]["type"]) => {
    props.onToolsStateChange((prevState) => ({
      ...prevState,
      [Tools.ERASER]: {
        ...prevState[Tools.ERASER],
        type,
      },
    }));
  };

  const handleOnChangeEraserSize = (size: ToolsState[Tools.ERASER]["size"]) => {
    props.onToolsStateChange((prevState) => ({
      ...prevState,
      [Tools.ERASER]: {
        ...prevState[Tools.ERASER],
        size,
      },
    }));
  };

  return (
    <>
      {eraserTypeList.map((type) => (
        <TypeOption
          key={type}
          type={type}
          selected={props.type === type}
          onSelect={handleOnChangeEraseType}
        />
      ))}

      {config.toolsConfig.eraser.eraserSizeList.map((size) => (
        <SizeOption
          key={size}
          size={size}
          selected={props.size === size}
          onSelect={handleOnChangeEraserSize}
        />
      ))}
    </>
  );
};
