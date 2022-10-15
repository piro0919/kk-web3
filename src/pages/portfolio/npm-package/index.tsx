import Layout from "components/Layout";
import NpmPackageTop from "components/NpmPackageTop";
import Seo from "components/Seo";
import { ReactElement } from "react";

function NpmPackage(): JSX.Element {
  return (
    <>
      <Seo title="NPMPACKAGE" />
      <NpmPackageTop />
    </>
  );
}

NpmPackage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};

export default NpmPackage;
