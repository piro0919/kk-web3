import { promises as fs } from "fs";
import path from "path";
import Fuse from "fuse.js";
import removeMarkdown from "markdown-to-text";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

export type GetEntriesQuery = {
  page?: string;
  q?: string;
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
  async ({ query: { page, q } }, res) => {
    const markdownPagesDirectory = path.join(
      process.cwd(),
      "/src/markdown-pages"
    );
    const filenames = await fs.readdir(markdownPagesDirectory);
    const allMarkdownPages = await Promise.all(
      filenames.reverse().map(async (filename) => {
        const filePath = path.join(markdownPagesDirectory, filename);
        const fileContents = await fs.readFile(filePath, "utf8");
        const date = fileContents.match(/date: "(.*?)"/);
        const openingSentence = fileContents.match(
          /---[\s\S]*?---[\s]*([\s\S]{150})/
        );
        const title = fileContents.match(/title: "(.*?)"/);
        const slug = fileContents.match(/slug: "(.*?)"/);

        return {
          fileContents,
          date: date ? date[1] : "",
          openingSentence: openingSentence
            ? removeMarkdown(openingSentence[1]).slice(0, 72)
            : "",
          slug: slug ? slug[1] : "",
          title: title ? title[1] : "",
        };
      })
    );
    const markdownPages = q
      ? new Fuse(allMarkdownPages, {
          isCaseSensitive: false,
          keys: ["fileContents"],
          threshold: 0.75,
          useExtendedSearch: true,
        })
          .search(q)
          .map(({ item }) => item)
      : allMarkdownPages;

    res.status(200);
    res.json(
      markdownPages
        .filter(
          (_, index) =>
            index >= 25 * (typeof page === "string" ? parseInt(page, 10) : 0) &&
            index <
              25 * ((typeof page === "string" ? parseInt(page, 10) : 0) + 1)
        )
        .map((tmpMarkdownPages) => {
          // eslint-disable-next-line unused-imports/no-unused-vars
          const { fileContents, ...markdownPages } = tmpMarkdownPages;

          return markdownPages;
        })
    );
    res.end();
  }
);

export default handler;
