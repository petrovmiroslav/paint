import React, { SetStateAction } from "react";
import { cn, commonCss } from "@/utils/styles/styles";
import { ToolsState } from "@/features/tools/constants";
import { InputStyledByLabel } from "@/components/ui/inputs/InputStyledByLabel/InputStyledByLabel";

import css from "./ColorPicker.module.scss";

type ColorPickerProps = {
  color: string;
  onToolsStateChange: React.Dispatch<SetStateAction<ToolsState>>;
};

export const ColorPicker = (props: ColorPickerProps) => {
  const id = "tool_colorPicker";

  const handleOnChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.currentTarget.value;
    props.onToolsStateChange((prevState) => ({
      ...prevState,
      color,
    }));
  };

  return (
    <InputStyledByLabel
      className={css.container}
      inputProps={{
        id,
        type: "color",
        name: "color",
        value: props.color,
        onChange: handleOnChangeColor,
      }}
      labelProps={{
        className: cn(commonCss.absoluteCenter, css.label),
        style: { backgroundColor: props.color },
      }}
    />
  );
};
