"use client";
import localFont from "@next/font/local";
import "@szhsin/react-menu/dist/core.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import Layout from "components/Layout";
import ScrollToTop from "components/ScrollToTop";
import "github-markdown-css";
import fetcher from "libs/fetcher";
import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";
import type { NextWebVitalsMetric } from "next/app";
import { usePathname } from "next/navigation";
import { GoogleAnalytics, event, usePageViews } from "nextjs-google-analytics";
import NextNProgress from "nextjs-progressbar";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import "ress";
import "styles/globals.scss";
import "styles/mq-settings.scss";
import "styles/szh-menu.scss";
import { SWRConfig } from "swr";

if (
  typeof window !== "undefined" &&
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PUBLIC_LOG_ROCKET_APP_ID
) {
  LogRocket.init(process.env.NEXT_PUBLIC_LOG_ROCKET_APP_ID);

  setupLogRocketReact(LogRocket);
}

export function reportWebVitals({
  id,
  label,
  name,
  value,
}: NextWebVitalsMetric): void {
  event(
    name,
    {
      category: label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
      label: id,
      nonInteraction: true,
      value: Math.round(name === "CLS" ? value * 1000 : value),
    },
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  );
}

const jkg = localFont({
  fallback: ["sans-serif"],
  src: [{ path: "./JKG.ttf" }, { path: "./JKG.woff" }, { path: "./JKG.woff2" }],
});

export type RootLayoutProps = {
  children: ReactNode;
};

function RootLayout({ children }: RootLayoutProps): JSX.Element {
  const pathname = usePathname();

  usePageViews({ gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID });

  return (
    <html lang="ja">
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          name="viewport"
        />
      </head>
      <body className={jkg.className}>
        <GoogleAnalytics />
        <SWRConfig value={{ fetcher, revalidateOnFocus: false }}>
          {pathname === "/lesson" ? children : <Layout>{children}</Layout>}
        </SWRConfig>
        <NextNProgress color="#234794" height={2} />
        <ScrollToTop />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#234794",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}

export default RootLayout;
