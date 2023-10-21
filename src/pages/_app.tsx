import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "../utils/styles/styles";
import "../styles/index.scss";
import type { AppProps as NextAppProps } from "next/app";
import { AppProps, getLayoutFallback, PageWithLayout } from "@/utils/next/next";
import React from "react";
import { AppHead } from "@/components/AppHead/AppHead";
import { WindowSizeContextProvider } from "@/hooks/useWindowSize/useWindowSize";

type CommonAppProps = React.PropsWithChildren;

export const CommonApp = (props: CommonAppProps) => {
  const { children } = props;

  return (
    <>
      <AppHead />

      <WindowSizeContextProvider>{children}</WindowSizeContextProvider>
    </>
  );
};

type AppPropsWithLayout = NextAppProps<AppProps> & {
  Component: PageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? getLayoutFallback;

  return <CommonApp>{getLayout(<Component {...pageProps} />)}</CommonApp>;
}
