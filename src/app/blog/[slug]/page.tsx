import SwrConfig from "app/SwrConfig";
import BlogEntry from "components/BlogEntry";
import Title from "components/Title";
import { GetEntriesSlugData } from "pages/api/entries/[slug]";

async function getEntry({
  slug,
}: {
  slug: string;
}): Promise<GetEntriesSlugData> {
  const res = await fetch(`${process.env.URL}/api/entries/${slug}`, {
    next: { revalidate: 60 * 60 * 24 },
  });

  return res.json();
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

// export async function generateStaticParams(): Promise<{ slug: string }[]> {
//   const markdownPagesDirectory = path.join(
//     process.cwd(),
//     "/src/markdown-pages"
//   );
//   const filenames = await fs.readdir(markdownPagesDirectory);
//   const markdownPages = filenames
//     .reverse()
//     .filter((_, index) => index < 25)
//     .map((filename) => ({
//       slug: filename.replace(".md", ""),
//     }));

//   return await Promise.all(markdownPages);
// }

export default Page;
