import { useRouter } from "next/router";
import { GetEntriesData } from "pages/api/entries";
import { useEffect, useState } from "react";
import ReactAutosuggest from "react-autosuggest";
import { DebounceInput } from "react-debounce-input";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import useSWR from "swr";
// eslint-disable-next-line css-modules/no-unused-class
import styles from "./style.module.scss";

function Autosuggest(): JSX.Element {
  const [value, setValue] = useState("");
  const {
    query: { q },
    ...router
  } = useRouter();
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

          router.push("/blog", undefined, { shallow: true });
        }}
        onSuggestionsFetchRequested={async ({ value }): Promise<void> => {
          router.push(
            {
              pathname: "/blog",
              query: {
                q: value,
              },
            },
            undefined,
            { shallow: true }
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
                  router.push("/blog", undefined, { shallow: true });

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
