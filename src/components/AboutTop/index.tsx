import { useMemo } from "react";
import { SocialIcon } from "react-social-icons";
import styles from "./style.module.scss";

function AboutTop(): JSX.Element {
  const links = useMemo(
    () => [
      {
        url: "https://github.com/piro0919",
      },
      {
        url: "https://www.instagram.com/piro9190",
      },
      {
        url: "https://twitter.com/piro0919",
      },
    ],
    []
  );
  const abouts = useMemo(
    () => [
      {
        description: "Kouhei Kawamura",
        term: "Name",
      },
      {
        description: "piro",
        term: "Handle",
      },
      {
        description: "Tokyo, Japan",
        term: "Address",
      },
      {
        description: "Freelancer (Front End Developer, Video Creator)",
        term: "Job",
      },
      {
        description: (
          <a
            className={styles.anchor}
            href="https://www.wantedly.com/id/kawamura_kouhei"
            rel="noreferrer"
            target="_blank"
          >
            Wantedly
          </a>
        ),
        term: "Resume",
      },
      {
        description: (
          <ul className={styles.linkList}>
            {links.map(({ url }) => (
              <li key={url}>
                <SocialIcon
                  fgColor="#fff"
                  style={{ height: 36, width: 36 }}
                  target="_blank"
                  url={url}
                />
              </li>
            ))}
          </ul>
        ),
        term: "Link",
      },
    ],
    [links]
  );
  const items = useMemo(
    () =>
      abouts.map(({ description, term }) => (
        <div key={term}>
          <dt className={styles.term}>{term}</dt>
          <dd>{description}</dd>
        </div>
      )),
    [abouts]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <dl className={styles.list}>{items}</dl>
      </div>
    </div>
  );
}

export default AboutTop;
