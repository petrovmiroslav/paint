import React from "react";
import { cn, commonCss } from "@/utils/styles/styles";
import { EraserOptions } from "@/features/tools/constants";
import { InputStyledByLabel } from "@/components/ui/inputs/InputStyledByLabel/InputStyledByLabel";

import css from "./TypeOption.module.scss";

export type TypeOptionProps = {
  selected: boolean;
  onSelect: (type: EraserOptions["type"]) => void;
} & Pick<EraserOptions, "type">;

export const TypeOption = (props: TypeOptionProps) => {
  const name = "eraserTypeOption";
  const id = `${name}_${props.type}`;

  return (
    <InputStyledByLabel
      className={css.container}
      inputProps={{
        id,
        type: "radio",
        name,
        value: props.type,
        checked: props.selected,
        onChange: () => props.onSelect(props.type),
      }}
      labelProps={{
        className: cn(
          commonCss.absoluteCenter,
          css.label,
          css[`label_${props.type}`],
          props.selected && css.label_selected,
        ),
        children: <span className={css.preview} />,
      }}
    />
  );
};
