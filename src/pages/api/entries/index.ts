import { promises as fs } from "fs";
import path from "path";
import removeMarkdown from "markdown-to-text";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

export type GetEntriesQuery = {
  page: string;
};

type Entry = {
  date: string;
  openingSentence: string;
  slug: string;
  title: string;
};

export type GetEntriesData = Entry[];

type ExtendedGetRequest = {
  query: GetEntriesQuery;
};

type ExtendedGetResponse = {
  json: (body: GetEntriesData) => void;
};

const handler = nc<NextApiRequest, NextApiResponse<ExtendedGetResponse>>({
  onError: (err, _, res) => {
    console.error(err.stack);

    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).get<ExtendedGetRequest, ExtendedGetResponse>(
  async ({ query: { page } }, res) => {
    const markdownPagesDirectory = path.join(
      process.cwd(),
      "/src/markdown-pages"
    );
    const filenames = await fs.readdir(markdownPagesDirectory);
    const markdownPages = filenames
      .reverse()
      .filter(
        (_, index) =>
          index >= 10 * parseInt(page, 10) &&
          index < 10 * (parseInt(page, 10) + 1)
      )
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

    res.status(200);
    res.json(await Promise.all(markdownPages));
    res.end();
  }
);

export default handler;
