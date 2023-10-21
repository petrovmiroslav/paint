import { cn } from "@/utils/styles/styles";

import css from "./Divider.module.scss";

type DividerProps = {
  className?: string;
};

export const Divider = (props: DividerProps) => {
  return <div className={cn(css.divider, props.className)} />;
};
