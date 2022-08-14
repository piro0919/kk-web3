import { useMemo } from "react";
import { SocialIcon } from "react-social-icons";
import styles from "./style.module.scss";

function Footer(): JSX.Element {
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
  const items = useMemo(
    () =>
      links.map(({ url }) => (
        <li key={url}>
          <SocialIcon
            fgColor="#fff"
            style={{ height: 36, width: 36 }}
            target="_blank"
            url={url}
          />
        </li>
      )),
    [links]
  );

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.copyrightWrapper}>&copy; 2018 kk-web</div>
        <ul className={styles.list}>{items}</ul>
      </div>
    </footer>
  );
}

export default Footer;
