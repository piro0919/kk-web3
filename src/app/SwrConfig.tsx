// eslint-disable-next-line filenames/match-regex
"use client";
import { ReactNode } from "react";
import { SWRConfig } from "swr";

export type SwrConfigProps = {
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fallbackData: any;
};

function SwrConfig({ children, fallbackData }: SwrConfigProps): JSX.Element {
  return <SWRConfig value={{ fallbackData }}>{children}</SWRConfig>;
}

export default SwrConfig;
