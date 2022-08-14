import "@szhsin/react-menu/dist/core.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import Layout from "components/Layout";
import ScrollToTop from "components/ScrollToTop";
import "github-markdown-css";
import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";
import type { AppProps } from "next/app";
import { GoogleAnalytics, usePageViews } from "nextjs-google-analytics";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import "ress";
import "styles/fonts.scss";
import "styles/globals.scss";
import "styles/mq-settings.scss";
import "styles/szh-menu.scss";

if (
  typeof window !== "undefined" &&
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PUBLIC_LOG_ROCKET_APP_ID
) {
  LogRocket.init(process.env.NEXT_PUBLIC_LOG_ROCKET_APP_ID);

  setupLogRocketReact(LogRocket);
}

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  usePageViews();

  return (
    <>
      <GoogleAnalytics />
      <Layout>
        <Component {...pageProps} />
      </Layout>
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
