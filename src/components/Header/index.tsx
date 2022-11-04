import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { Montserrat } from "@next/font/google";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import useNavigation from "hooks/useNavigation";
import Link from "next/link";
import { useMemo } from "react";
import { useBoolean } from "usehooks-ts";
import styles from "./style.module.scss";

// eslint-disable-next-line new-cap
const montserrat = Montserrat({
  fallback: ["sans-serif"],
  preload: true,
  subsets: ["latin"],
});

function Header(): JSX.Element {
  const navigations = useNavigation();
  const items = useMemo(
    () =>
      navigations.map(({ isActive, subNavigations, title, url }) => (
        <li key={url}>
          {subNavigations ? (
            <Menu
              align="center"
              arrow={true}
              direction="top"
              menuButton={
                <MenuButton>
                  <span className={isActive ? styles.active : ""}>{title}</span>
                </MenuButton>
              }
              transition={true}
            >
              {subNavigations.map(({ title, url: subNavigationUrl }) => (
                <MenuItem key={subNavigationUrl}>
                  <Link href={`${url}${subNavigationUrl}`}>{title}</Link>
                </MenuItem>
              ))}
            </Menu>
          ) : (
            <Link className={isActive ? styles.active : ""} href={url}>
              {title}
            </Link>
          )}
        </li>
      )),
    [navigations]
  );
  const { setValue: setIsNarrow, value: isNarrow } = useBoolean(false);

  useScrollPosition(({ currPos: { y } }) => {
    setIsNarrow(!!y);
  });

  return (
    <header className={`${styles.header} ${isNarrow ? styles.narrow : ""}`}>
      <nav className={`${styles.nav} ${montserrat.className}`}>
        <ul className={styles.list}>{items}</ul>
      </nav>
    </header>
  );
}

export default Header;
