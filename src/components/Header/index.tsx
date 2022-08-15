import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import useNavigation from "hooks/useNavigation";
import Link from "next/link";
import { useMemo } from "react";
import styles from "./style.module.scss";

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
                  <Link href={`${url}${subNavigationUrl}`}>
                    <a>{title}</a>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          ) : (
            <Link href={url}>
              <a className={isActive ? styles.active : ""}>{title}</a>
            </Link>
          )}
        </li>
      )),
    [navigations]
  );

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.list}>{items}</ul>
      </nav>
    </header>
  );
}

export default Header;
