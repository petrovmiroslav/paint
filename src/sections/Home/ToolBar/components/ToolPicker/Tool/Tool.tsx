import React from "react";
import { cn, commonCss } from "@/utils/styles/styles";
import { Tools } from "@/features/tools/constants";
import { InputStyledByLabel } from "@/components/ui/inputs/InputStyledByLabel/InputStyledByLabel";
import { Icons } from "@/components/ui/Icons/Icons";

import css from "./Tool.module.scss";

const toolsData = {
  [Tools.PEN]: { Icon: Icons.Pen },
  [Tools.BRUSH]: { Icon: Icons.Brush },
  [Tools.ERASER]: { Icon: Icons.Eraser },
} satisfies Record<Tools, { Icon: (typeof Icons)[keyof typeof Icons] }>;

export type ToolProps = React.PropsWithChildren<{
  name: Tools;
  selected: boolean;
  onSelect: (tool: Tools) => void;
}>;

export const Tool = (props: ToolProps) => {
  const id = `tool_${props.name}`;

  const Icon = toolsData[props.name].Icon;

  const handleOnChange = () => {
    props.onSelect(props.name);
  };

  return (
    <InputStyledByLabel
      className={css.container}
      inputProps={{
        id,
        type: "radio",
        name: "tool",
        value: props.name,
        checked: props.selected,
        onChange: handleOnChange,
      }}
      labelProps={{
        className: cn(
          commonCss.absoluteCenter,
          css.label,
          props.selected && css.label_selected,
        ),
        children: <Icon className={css.icon} />,
      }}
    />
  );
};
