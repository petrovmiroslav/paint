import React from "react";
import { cn, commonCss } from "@/utils/styles/styles";
import { EraserOptions } from "@/features/tools/constants";
import { InputStyledByLabel } from "@/components/ui/inputs/InputStyledByLabel/InputStyledByLabel";

import css from "./SizeOption.module.scss";

export type SizeOptionProps = {
  selected: boolean;
  onSelect: (size: EraserOptions["size"]) => void;
} & Pick<EraserOptions, "size">;

export const SizeOption = (props: SizeOptionProps) => {
  const name = "eraserSizeOption";
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
