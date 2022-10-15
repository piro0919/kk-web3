import Layout from "components/Layout";
import MovieTop from "components/MovieTop";
import Seo from "components/Seo";
import { ReactElement } from "react";

function Movie(): JSX.Element {
  return (
    <>
      <Seo title="MOVIE" />
      <MovieTop />
    </>
  );
}

Movie.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};

export default Movie;
