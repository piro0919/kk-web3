import SwrConfig from "app/SwrConfig";
import BlogTop from "components/BlogTop";
import Title from "components/Title";
import { GetEntriesData } from "pages/api/entries";

async function getEntries(): Promise<GetEntriesData> {
  const res = await fetch(`${process.env.URL}/api/entries?page=0`, {
    next: { revalidate: 60 * 60 },
  });

  return res.json();
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

export default Page;
