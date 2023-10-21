import React from "react";
import { cn, commonCss } from "@/utils/styles/styles";
import { PenOptions } from "@/features/tools/constants";
import { InputStyledByLabel } from "@/components/ui/inputs/InputStyledByLabel/InputStyledByLabel";

import css from "./SizeOption.module.scss";

export type SizeOptionProps = {
  selected: boolean;
  onSelect: (size: PenOptions["size"]) => void;
} & Pick<PenOptions, "size">;

export const SizeOption = (props: SizeOptionProps) => {
  const id = `penSizeOption_${props.size}`;

  return (
    <InputStyledByLabel
      className={css.container}
      inputProps={{
        id,
        type: "radio",
        name: "penSizeOption",
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
        children: (
          <span
            className={css.preview}
            style={{ width: props.size, height: props.size }}
          />
        ),
      }}
    />
  );
};
