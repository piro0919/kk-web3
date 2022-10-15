import Layout from "components/Layout";
import Seo from "components/Seo";
import WebServiceTop from "components/WebServiceTop";
import { ReactElement } from "react";

function WebService(): JSX.Element {
  return (
    <>
      <Seo title="WEBSERVICE" />
      <WebServiceTop />
    </>
  );
}

WebService.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};

export default WebService;
