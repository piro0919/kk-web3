"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { GetEntriesData } from "pages/api/entries";
import queryString from "query-string";
import { useEffect, useMemo, useState } from "react";
import ReactAutosuggest from "react-autosuggest";
import { DebounceInput } from "react-debounce-input";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import useSWR from "swr";
// eslint-disable-next-line css-modules/no-unused-class
import styles from "./style.module.scss";

function Autosuggest(): JSX.Element {
  const [value, setValue] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = useMemo(() => searchParams.get("q"), [searchParams]);
  const { data, isValidating } = useSWR<GetEntriesData>(
    value ? `/api/entries?q=${value}` : null
  );

  useEffect(() => {
    if (typeof q !== "string") {
      return;
    }

    setValue(q);
  }, [q]);

  return (
    <div className={styles.wrapper}>
      <ReactAutosuggest<NonNullable<typeof data>[0]>
        getSuggestionValue={(): string => {
          return value;
        }}
        inputProps={{
          value,
          onChange: (_, { newValue }): void => {
            setValue(newValue);
          },
        }}
        multiSection={false}
        onSuggestionSelected={(_, { suggestion: { slug } }): void => {
          router.push(slug);
        }}
        onSuggestionsClearRequested={(): void => {
          if (value) {
            return;
          }

          router.push("/blog");
        }}
        onSuggestionsFetchRequested={async ({ value }): Promise<void> => {
          router.push(
            queryString.stringifyUrl({
              query: {
                q: value,
              },
              url: "/blog",
            })
          );
        }}
        renderInputComponent={({ ref, ...inputProps }): JSX.Element => (
          <div className={styles.inputWrapper}>
            <div className={styles.iconWrapper}>
              <FaSearch color="#808080" size={14} />
            </div>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <DebounceInput
              {...inputProps}
              debounceTimeout={250}
              inputRef={ref}
            />
            <div className={styles.iconWrapper}>
              <button
                onClick={(): void => {
                  router.push("/blog");

                  setValue("");
                }}
              >
                <IoClose color="#808080" size={22} />
              </button>
            </div>
          </div>
        )}
        renderSuggestion={({ title }): JSX.Element => <div>{title}</div>}
        suggestions={
          q === value && data && !isValidating
            ? data.filter((_, index) => index < 10)
            : []
        }
        theme={styles}
      />
    </div>
  );
}

export default Autosuggest;
