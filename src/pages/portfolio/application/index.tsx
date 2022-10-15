import ApplicationTop from "components/ApplicationTop";
import Layout from "components/Layout";
import Seo from "components/Seo";
import { ReactElement } from "react";

function Application(): JSX.Element {
  return (
    <>
      <Seo title="APPLICATION" />
      <ApplicationTop />
    </>
  );
}

Application.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};

export default Application;
