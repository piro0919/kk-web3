import { promises as fs } from "fs";
import path from "path";
import SwrConfig from "app/SwrConfig";
import BlogEntry from "components/BlogEntry";
import Title from "components/Title";

type MarkdownPage = {
  body: string;
  date: string;
  slug: string;
  title: string;
};

async function getEntry({ slug }: { slug: string }): Promise<MarkdownPage> {
  const filePath = path.join(
    process.cwd(),
    "/src/markdown-pages",
    `/${slug}.md`
  );
  const fileContents = await fs.readFile(filePath, "utf8");
  const body = fileContents.match(/---[\s\S]*?---[\s]*([\s\S]*)/);
  const date = fileContents.match(/date: "(.*?)"/);
  const title = fileContents.match(/title: "(.*?)"/);
  // const slug = fileContents.match(/slug: "(.*?)"/);
  const markdownPage = {
    slug,
    body: body ? body[1] : "",
    date: date ? date[1] : "",
    title: title ? title[1] : "",
  };

  return markdownPage;
}

export type PageProps = {
  params: {
    slug: string;
  };
};

async function Page({ params: { slug } }: PageProps): Promise<JSX.Element> {
  const entry = await getEntry({ slug });

  return (
    <>
      <Title title={entry.title} />
      <SwrConfig fallbackData={entry}>
        <BlogEntry slug={slug} />
      </SwrConfig>
    </>
  );
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const markdownPagesDirectory = path.join(
    process.cwd(),
    "/src/markdown-pages"
  );
  const filenames = await fs.readdir(markdownPagesDirectory);
  const markdownPages = filenames.map((filename) => ({
    slug: filename.replace(".md", ""),
  }));

  return await Promise.all(markdownPages);
}

export const revalidate = 60 * 60 * 24;

export default Page;
