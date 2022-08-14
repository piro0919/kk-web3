import { promises as fs } from "fs";
import path from "path";
import BlogTop from "components/BlogTop";
import Seo from "components/Seo";
import removeMarkdown from "markdown-to-text";
import { GetStaticProps } from "next";
import { SWRConfig } from "swr";

type MarkdownPage = {
  date: string;
  openingSentence: string;
  slug: string;
  title: string;
};

export type BlogProps = {
  fallback: {
    [key in string]: MarkdownPage[];
  };
};

function Blog({ fallback }: BlogProps): JSX.Element {
  return (
    <>
      <Seo title="BLOG" />
      <SWRConfig value={{ fallback }}>
        <BlogTop />
      </SWRConfig>
    </>
  );
}

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const markdownPagesDirectory = path.join(
    process.cwd(),
    "/src/markdown-pages"
  );
  const filenames = await fs.readdir(markdownPagesDirectory);
  const markdownPages = filenames
    .reverse()
    .filter((_, index) => index < 10)
    .map(async (filename) => {
      const filePath = path.join(markdownPagesDirectory, filename);
      const fileContents = await fs.readFile(filePath, "utf8");
      const date = fileContents.match(/date: "(.*?)"/);
      const openingSentence = fileContents.match(
        /---[\s\S]*?---[\s]*([\s\S]*)/
      );
      const title = fileContents.match(/title: "(.*?)"/);
      const slug = fileContents.match(/slug: "(.*?)"/);

      return {
        date: date ? date[1] : "",
        openingSentence: openingSentence
          ? removeMarkdown(openingSentence[1]).slice(0, 140)
          : "",
        slug: slug ? slug[1] : "",
        title: title ? title[1] : "",
      };
    });

  return {
    props: {
      fallback: {
        "/api/entries?page=0": await Promise.all(markdownPages),
      },
    },
    revalidate: 60 * 60,
  };
};

export default Blog;
