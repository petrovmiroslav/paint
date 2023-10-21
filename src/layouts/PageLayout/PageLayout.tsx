import React from "react";
import { cn } from "../../utils/styles/styles";
import css from "./PageLayout.module.scss";

export type PageLayoutProps = {
  children: React.ReactNode;
  mainClassName?: string;
};

export const PageLayout = (props: PageLayoutProps) => {
  return (
    <div className={cn(css.container)}>
      <main className={cn(css.main, props.mainClassName)}>
        {props.children}
      </main>
    </div>
  );
};
