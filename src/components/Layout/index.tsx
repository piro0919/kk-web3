import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import Footer from "components/Footer";
import Header from "components/Header";
import useNavigation from "hooks/useNavigation";
import Link from "next/link";
import { ReactNode, useMemo } from "react";
import { useWindowSize } from "usehooks-ts";
import styles from "./style.module.scss";

export type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps): JSX.Element {
  const { height } = useWindowSize();
  const navigations = useNavigation();
  const items = useMemo(
    () =>
      navigations.map(({ isActive, subNavigations, title, url }) => (
        <li className={styles.item} key={url}>
          {subNavigations ? (
            <Menu
              align="center"
              arrow={true}
              direction="bottom"
              menuButton={
                <MenuButton>
                  <a className={styles.anchor}>
                    <span className={isActive ? styles.active : ""}>
                      {title}
                    </span>
                  </a>
                </MenuButton>
              }
              transition={true}
            >
              {subNavigations.map(({ title, url: subNavigationUrl }) => (
                <MenuItem key={url}>
                  <Link href={`${url}${subNavigationUrl}`}>
                    <a>{title}</a>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          ) : (
            <Link href={url}>
              <a className={styles.anchor}>
                <span className={isActive ? styles.active : ""}>{title}</span>
              </a>
            </Link>
          )}
        </li>
      )),
    [navigations]
  );

  return (
    <>
      <div className={styles.wrapper} style={{ minHeight: height }}>
        <div className={styles.headerWrapper}>
          <Header />
        </div>
        {children}
        <div className={styles.footerWrapper}>
          <Footer />
        </div>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.list}>{items}</ul>
      </nav>
    </>
  );
}

export default Layout;
