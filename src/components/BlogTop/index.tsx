import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import Autosuggest from "components/Autosuggest";
import Link from "next/link";
import { GetEntriesData } from "pages/api/entries";
import { Fragment, useCallback, useMemo } from "react";
import InfiniteScroll, { Props } from "react-infinite-scroll-component";
import { Oval } from "react-loader-spinner";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { useBoolean } from "usehooks-ts";
import styles from "./style.module.scss";

const getKey: SWRInfiniteKeyLoader = (
  pageIndex,
  previousPageData: GetEntriesData
) =>
  previousPageData && !previousPageData.length
    ? null
    : `/api/entries?page=${pageIndex}`;

function BlogTop(): JSX.Element {
  const { data, setSize } = useSWRInfinite<GetEntriesData>(getKey, null, {
    revalidateFirstPage: false,
  });
  const entries = useMemo(() => (data ? data.flat() : []), [data]);
  const items = useMemo(
    () =>
      entries.map(({ date, openingSentence, slug, title }, index) => (
        <Fragment key={index}>
          {index ? <hr className={styles.hr} /> : null}
          <Link href={slug}>
            <a className={styles.anchor}>
              <h2 className={styles.title}>{title}</h2>
              <p className={styles.openingSentence}>{`${openingSentence}…`}</p>
              <div className={styles.dateWrapper}>{date}</div>
            </a>
          </Link>
        </Fragment>
      )),
    [entries]
  );
  const next = useCallback<Props["next"]>(() => {
    setSize((prevSize) => prevSize + 1);
  }, [setSize]);
  const isReachingEnd = useMemo(
    () =>
      data?.[0]?.length === 0 || (data && data[data.length - 1]?.length < 25),
    [data]
  );
  const { setValue: setIsNarrow, value: isNarrow } = useBoolean(false);

  useScrollPosition(({ currPos: { y } }) => {
    setIsNarrow(!!y);
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div
          className={`${styles.autosuggestWrapper} ${
            isNarrow ? styles.narrow : ""
          }`}
        >
          <Autosuggest />
        </div>
        <InfiniteScroll
          className={styles.infiniteScroll}
          dataLength={items.length}
          hasMore={!isReachingEnd}
          loader={
            <div className={styles.loaderWrapper}>
              <Oval
                color="#bdc1c6"
                height={48}
                secondaryColor="#808080"
                strokeWidth={2}
                strokeWidthSecondary={2}
                visible={true}
                width={48}
              />
            </div>
          }
          next={next}
        >
          {items}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default BlogTop;
