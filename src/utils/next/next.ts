import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { GetStaticProps } from "next/types";

export interface PageProps {}

export interface AppProps extends PageProps {}

export type GetStaticPropsType = GetStaticProps<AppProps>;
export type GetServerSidePropsType = GetServerSideProps<AppProps>;

type GetLayout = (page: React.ReactElement) => React.ReactNode;

export const getLayoutFallback: GetLayout = (page) => page;

export type PageWithLayout<P = PageProps, IP = P> = NextPage<P, IP> & {
  getLayout?: GetLayout;
};
