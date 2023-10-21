import React, { SetStateAction } from "react";
import { SizeOption } from "@/sections/Home/ToolBar/components/PenOptionsComponent/SizeOption/SizeOption";
import { Tools, ToolsState } from "@/features/tools/constants";
import { config } from "@/features/app/constants";

type PenOptionsComponentProps = {
  onToolsStateChange: React.Dispatch<SetStateAction<ToolsState>>;
} & ToolsState[Tools.PEN];

export const PenOptionsComponent = (props: PenOptionsComponentProps) => {
  const handleOnChangePenSize = (size: ToolsState[Tools.PEN]["size"]) => {
    props.onToolsStateChange((prevState) => ({
      ...prevState,
      [Tools.PEN]: {
        ...prevState[Tools.PEN],
        size,
      },
    }));
  };

  return (
    <>
      {config.toolsConfig.pen.penSizeList.map((size) => (
        <SizeOption
          key={size}
          size={size}
          selected={props.size === size}
          onSelect={handleOnChangePenSize}
        />
      ))}
    </>
  );
};
