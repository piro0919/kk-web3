import AboutTop from "components/AboutTop";
import Layout from "components/Layout";
import Seo from "components/Seo";
import { ReactElement } from "react";

function About(): JSX.Element {
  return (
    <>
      <Seo title="ABOUT" />
      <AboutTop />
    </>
  );
}

About.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};

export default About;
