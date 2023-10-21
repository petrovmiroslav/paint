import React from "react";
import { cn, commonCss } from "@/utils/styles/styles";

import css from "./InputStyledByLabel.module.scss";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;
type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

export type InputStyledByLabelProps = {
  inputProps?: InputProps;
  labelProps?: LabelProps;
} & ContainerProps;

export const InputStyledByLabel = React.forwardRef<
  HTMLInputElement,
  InputStyledByLabelProps
>((props, ref) => {
  const {
    inputProps = {} as InputProps,
    labelProps = {} as LabelProps,
    ...restContainerProps
  } = props;

  return (
    <div {...restContainerProps} className={cn(css.container, props.className)}>
      <input
        ref={ref}
        {...inputProps}
        className={cn(
          commonCss.visuallyHidden,
          css.input,
          inputProps.className,
        )}
        id={inputProps.id}
      />

      <label
        {...labelProps}
        className={cn(commonCss.interactive, css.label, labelProps.className)}
        htmlFor={inputProps.id}
      >
        {labelProps.children}
      </label>

      {props.children}
    </div>
  );
});
InputStyledByLabel.displayName = "InputStyledByLabel";
