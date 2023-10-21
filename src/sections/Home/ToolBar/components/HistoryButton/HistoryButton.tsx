import React from "react";
import { cn, commonCss } from "@/utils/styles/styles";
import { Button } from "@/components/ui/buttons/Button/Button";
import { Icons } from "@/components/ui/Icons/Icons";

import css from "./HistoryButton.module.scss";

export type HistoryButtonProps = {
  undo: boolean;
  disabled: boolean;
  onClick: () => void;
};

export const HistoryButton = (props: HistoryButtonProps) => {
  const Icon = props.undo ? Icons.Undo : Icons.Redo;

  return (
    <Button
      className={cn(commonCss.interactive_focusVisibleOuter, css.button)}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <Icon className={cn(commonCss.absoluteCenter, css.icon)} />
    </Button>
  );
};
