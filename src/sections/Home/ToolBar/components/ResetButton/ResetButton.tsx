import React from "react";
import { cn, commonCss } from "@/utils/styles/styles";
import { Button } from "@/components/ui/buttons/Button/Button";
import { Icons } from "@/components/ui/Icons/Icons";

import css from "./ResetButton.module.scss";

export type ResetButtonProps = {
  onClick: () => void;
};

export const ResetButton = (props: ResetButtonProps) => {
  return (
    <Button
      className={cn(commonCss.interactive_focusVisibleOuter, css.button)}
      onClick={props.onClick}
    >
      <Icons.Bin className={cn(commonCss.absoluteCenter, css.icon)} />
    </Button>
  );
};
