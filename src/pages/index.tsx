import Layout from "components/Layout";
import Seo from "components/Seo";
import Top from "components/Top";
import { ReactElement } from "react";

function Pages(): JSX.Element {
  return (
    <>
      <Seo />
      <Top />
    </>
  );
}

Pages.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};

export default Pages;
