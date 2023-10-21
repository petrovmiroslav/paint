import React from "react";
import { cn, commonCss } from "@/utils/styles/styles";

import css from "./Button.module.scss";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, ref) => {
    const { className, ...restButtonProps } = props;

    return (
      <button
        ref={ref}
        className={cn(commonCss.interactive, css.button, className)}
        type="button"
        {...restButtonProps}
      />
    );
  },
);
Button.displayName = "Button";
