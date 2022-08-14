import fetcher from "libs/fetcher";
import { GetEntriesSlugData } from "pages/api/entries/[slug]";
import { ReactElement, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import useScrollbarSize from "react-scrollbar-size";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import useSWR from "swr";
import useBreakpoint from "use-breakpoint";
import { useWindowSize } from "usehooks-ts";
import styles from "./style.module.scss";

const BREAKPOINTS = { desktop: 980, mobile: 0, tablet: 740, wide: 1300 };

export type BlogEntryProps = {
  slug: string;
};

function BlogEntry({ slug }: BlogEntryProps): JSX.Element {
  const { data } = useSWR<GetEntriesSlugData>(`/api/entries/${slug}`, fetcher);
  const { width: windowWidth } = useWindowSize();
  const { width: scrollbarWidth } = useScrollbarSize();
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "desktop");
  const style = useMemo(
    () => ({
      maxWidth:
        windowWidth -
        (scrollbarWidth + (breakpoint === "mobile" ? 12 : 24) * 2),
    }),
    [breakpoint, scrollbarWidth, windowWidth]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        {data ? (
          <article className={`markdown-body ${styles.markdownBody}`}>
            <h1 className={styles.title}>{data.title}</h1>
            <div className={styles.dateWrapper}>{data.date}</div>
            <ReactMarkdown
              components={{
                a: ({ children, href }) => (
                  <a
                    className={styles.anchor}
                    href={href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {children}
                  </a>
                ),
                blockquote: ({ children }) => (
                  <blockquote className={styles.blockquote}>
                    {children}
                  </blockquote>
                ),
                code: ({
                  children,
                  className,
                  inline,
                  // eslint-disable-next-line unused-imports/no-unused-vars
                  node,
                  ...props
                }): ReactElement => {
                  const match = /language-(\w+)/.exec(className || "");

                  return !inline && match ? (
                    <SyntaxHighlighter
                      PreTag="div"
                      language={match[1]}
                      style={
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        atomOneDark as any
                      }
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={`${className} ${styles.code}`} {...props}>
                      {children}
                    </code>
                  );
                },
                h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
                hr: () => <hr className={styles.hr} />,
                iframe: (
                  // eslint-disable-next-line unused-imports/no-unused-vars
                  { node, src, ...props }
                ) =>
                  typeof src === "string" && src.includes("youtube") ? (
                    <div className={styles.youtubeWrapper} style={style}>
                      <iframe
                        {...props}
                        className={styles.youtube}
                        src={src as string}
                      />
                    </div>
                  ) : (
                    <iframe {...props} src={src as string} />
                  ),
                pre: ({ children }) => (
                  <pre className={styles.pre}>{children}</pre>
                ),
                table: ({ children }) => (
                  <div className={styles.tableWrapper} style={style}>
                    <table className={styles.table}>{children}</table>
                  </div>
                ),
                ul: ({ children }) => <ul className={styles.ul}>{children}</ul>,
              }}
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
            >
              {data.body}
            </ReactMarkdown>
          </article>
        ) : null}
      </div>
    </div>
  );
}

export default BlogEntry;
