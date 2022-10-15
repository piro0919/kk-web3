import Layout from "components/Layout";
import Seo from "components/Seo";
import WebSiteTop from "components/WebSiteTop";
import { ReactElement } from "react";

function WebSite(): JSX.Element {
  return (
    <>
      <Seo title="WEBSITE" />
      <WebSiteTop />
    </>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};

export default WebSite;
