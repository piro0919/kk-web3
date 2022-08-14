import { promises as fs } from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

export type GetEntriesSlugQuery = {
  slug: string;
};

export type GetEntriesSlugData = {
  body: string;
  date: string;
  slug: string;
  title: string;
};

type ExtendedGetRequest = {
  query: GetEntriesSlugQuery;
};

type ExtendedGetResponse = {
  json: (body: GetEntriesSlugData) => void;
};

const handler = nc<NextApiRequest, NextApiResponse<ExtendedGetResponse>>({
  onError: (err, _, res) => {
    console.error(err.stack);

    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).get<ExtendedGetRequest, ExtendedGetResponse>(async ({ query }, res) => {
  const filePath = path.join(
    process.cwd(),
    "/src/markdown-pages",
    `/${query.slug}.md`
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
    res.status(500);
    res.end();

    return;
  }

  res.status(200);
  res.json(markdownPage);
  res.end();
});

export default handler;
