import Seo from "components/Seo";
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

export type HeadProps = {
  params: {
    slug: string;
  };
};

async function Head({ params: { slug } }: HeadProps): Promise<JSX.Element> {
  const { body, title } = await getEntry({ slug });

  return <Seo description={body} title={title} type="article" />;
}

export default Head;
