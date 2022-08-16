import "@szhsin/react-menu/dist/core.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import Layout from "components/Layout";
import ScrollToTop from "components/ScrollToTop";
import "github-markdown-css";
import fetcher from "libs/fetcher";
import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";
import type { AppProps, NextWebVitalsMetric } from "next/app";
import { GoogleAnalytics, event, usePageViews } from "nextjs-google-analytics";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import "ress";
import "styles/fonts.scss";
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

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  usePageViews({ gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID });

  return (
    <>
      <GoogleAnalytics />
      <SWRConfig value={{ fetcher, revalidateOnFocus: false }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
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
    </>
  );
}

export default MyApp;
