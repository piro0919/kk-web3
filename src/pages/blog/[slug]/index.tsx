import { promises as fs } from "fs";
import path from "path";
import BlogEntry, { BlogEntryProps } from "components/BlogEntry";
import Seo, { SeoProps } from "components/Seo";
import { GetStaticPaths, GetStaticProps } from "next";
import { SWRConfig } from "swr";

type MarkdownPage = {
  body: string;
  date: string;
  slug: string;
  title: string;
};

export type SlugProps = Pick<BlogEntryProps, "slug"> &
  Pick<SeoProps, "description" | "title"> & {
    fallback: {
      [key in string]: MarkdownPage;
    };
  };

function Slug({ description, fallback, slug, title }: SlugProps): JSX.Element {
  return (
    <>
      <Seo description={description} title={title} />
      <SWRConfig value={{ fallback }}>
        <BlogEntry slug={slug} />
      </SWRConfig>
    </>
  );
}

type ParsedUrlQuery = {
  slug: string;
};

export const getStaticProps: GetStaticProps<
  SlugProps,
  ParsedUrlQuery
> = async ({ params }) => {
  if (!params) {
    return {
      redirect: {
        destination: "/404",
        permanent: true,
      },
    };
  }

  const filePath = path.join(
    process.cwd(),
    "/src/markdown-pages",
    `/${params.slug}.md`
  );
  const fileContents = await fs.readFile(filePath, "utf8");
  const body = fileContents.match(/---[\s\S]*?---[\s]*([\s\S]*)/);
  const date = fileContents.match(/date: "(.*?)"/);
  const title = fileContents.match(/title: "(.*?)"/);
  const slug = fileContents.match(/slug: "(.*?)"/);
  const markdownPage = {
    body: body ? body[1] : "",
    date: date ? date[1] : "",
    slug: slug ? slug[1] : "",
    title: title ? title[1] : "",
  };

  if (!markdownPage) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: {
      description: body ? body[1] : "",
      fallback: {
        [`/api/entries/${params.slug}`]: markdownPage,
      },
      slug: params.slug,
      title: title ? title[1] : "",
    },
    revalidate: 60 * 60 * 24,
  };
};

export const getStaticPaths: GetStaticPaths<ParsedUrlQuery> = async () => {
  const markdownPagesDirectory = path.join(
    process.cwd(),
    "/src/markdown-pages"
  );
  const filenames = await fs.readdir(markdownPagesDirectory);
  const markdownPages = filenames
    .reverse()
    .filter((_, index) => index < 10)
    .map((filename) => ({
      params: {
        slug: filename.replace(".md", ""),
      },
    }));

  return {
    fallback: "blocking",
    paths: await Promise.all(markdownPages),
  };
};

export default Slug;
