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
  const markdownPages = Array(Math.ceil(filenames.length / 25))
    .fill(undefined)
    .map(
      async (_, index) =>
        await Promise.all(
          filenames
            .reverse()
            .filter(
              (_, index2) => index2 >= 25 * index && index2 < 25 * (index + 1)
            )
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
        )
    );

  return {
    props: {
      fallback: (await Promise.all(markdownPages)).reduce(
        (previousValue, currentValue, currentIndex) => {
          return {
            ...previousValue,
            [`/api/entries?page=${currentIndex}`]: currentValue,
          };
        },
        {}
      ),
    },
    revalidate: 60 * 60,
  };
};

export default Blog;
