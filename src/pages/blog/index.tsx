import { promises as fs } from "fs";
import path from "path";
import BlogTop from "components/BlogTop";
import Layout from "components/Layout";
import Seo from "components/Seo";
import removeMarkdown from "markdown-to-text";
import { GetStaticProps } from "next";
import { ReactElement } from "react";
import { SWRConfig } from "swr";

type MarkdownPage = {
  date: string;
  openingSentence: string;
  slug: string;
  title: string;
};

export type BlogProps = {
  fallbackData: MarkdownPage[];
};

function Blog({ fallbackData }: BlogProps): JSX.Element {
  return (
    <>
      <Seo title="BLOG" />
      <SWRConfig value={{ fallbackData }}>
        <BlogTop />
      </SWRConfig>
    </>
  );
}

Blog.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const markdownPagesDirectory = path.join(
    process.cwd(),
    "/src/markdown-pages"
  );
  const filenames = await fs.readdir(markdownPagesDirectory);
  const markdownPages = await Promise.all(
    filenames
      .reverse()
      .filter((_, index) => index < 25)
      .map(async (filename) => {
        const filePath = path.join(markdownPagesDirectory, filename);
        const fileContents = await fs.readFile(filePath, "utf8");
        const date = fileContents.match(/date: "(.*?)"/);
        const openingSentence = fileContents.match(
          /---[\s\S]*?---[\s]*([\s\S]{150})/
        );
        const title = fileContents.match(/title: "(.*?)"/);
        const slug = fileContents.match(/slug: "(.*?)"/);

        return {
          date: date ? date[1] : "",
          openingSentence: openingSentence
            ? removeMarkdown(openingSentence[1]).slice(0, 72)
            : "",
          slug: slug ? slug[1] : "",
          title: title ? title[1] : "",
        };
      })
  );

  return {
    props: {
      fallbackData: await Promise.all(markdownPages),
    },
    revalidate: 60 * 60,
  };
};

export default Blog;
