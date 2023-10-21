import React from "react";
import { cn, commonCss } from "@/utils/styles/styles";
import { BrushOptions } from "@/features/tools/constants";
import { InputStyledByLabel } from "@/components/ui/inputs/InputStyledByLabel/InputStyledByLabel";

import css from "./SizeOption.module.scss";

export type SizeOptionProps = {
  selected: boolean;
  onSelect: (size: BrushOptions["size"]) => void;
} & Pick<BrushOptions, "size">;

export const SizeOption = (props: SizeOptionProps) => {
  const name = "brushSizeOption";
  const id = `${name}_${props.size}`;

  return (
    <InputStyledByLabel
      className={css.container}
      inputProps={{
        id,
        type: "radio",
        name,
        value: props.size,
        checked: props.selected,
        onChange: () => props.onSelect(props.size),
      }}
      labelProps={{
        className: cn(
          commonCss.absoluteCenter,
          css.label,
          props.selected && css.label_selected,
        ),
        children: props.size,
      }}
    />
  );
};
