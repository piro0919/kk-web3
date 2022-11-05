import { promises as fs } from "fs";
import path from "path";
import SwrConfig from "app/SwrConfig";
import BlogTop from "components/BlogTop";
import Title from "components/Title";
import removeMarkdown from "markdown-to-text";

type MarkdownPage = {
  date: string;
  openingSentence: string;
  slug: string;
  title: string;
};

async function getEntries(): Promise<MarkdownPage[]> {
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

  return await Promise.all(markdownPages);
}

async function Page(): Promise<JSX.Element> {
  const entries = await getEntries();

  return (
    <>
      <Title title="BLOG" />
      <SwrConfig fallbackData={entries}>
        <BlogTop />
      </SwrConfig>
    </>
  );
}

export const revalidate = 60 * 60;

export default Page;
