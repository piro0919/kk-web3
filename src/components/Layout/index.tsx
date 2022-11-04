import NoSSR from "@mpth/react-no-ssr";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { Montserrat } from "@next/font/google";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import Footer from "components/Footer";
import Header from "components/Header";
import useNavigation from "hooks/useNavigation";
import Link from "next/link";
import { ReactNode, useMemo } from "react";
import { FaReact } from "react-icons/fa";
import { useBoolean, useWindowSize } from "usehooks-ts";
import styles from "./style.module.scss";

// eslint-disable-next-line new-cap
const montserrat = Montserrat({
  fallback: ["sans-serif"],
  preload: true,
  subsets: ["latin"],
});

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
                  <span className={styles.anchor}>
                    <span className={isActive ? styles.active : ""}>
                      {title}
                    </span>
                  </span>
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
            <Link className={styles.anchor} href={url}>
              <span className={isActive ? styles.active : ""}>{title}</span>
            </Link>
          )}
        </li>
      )),
    [navigations]
  );
  const { setValue: setIsShowStudyGroupLink, value: isShowStudyGroupLink } =
    useBoolean(true);

  useScrollPosition(({ currPos: { y } }) => {
    setIsShowStudyGroupLink(!y);
  });

  return (
    <NoSSR>
      <div className={styles.wrapper} style={{ minHeight: height }}>
        <div className={styles.headerWrapper}>
          <Header />
        </div>
        {children}
        <div className={styles.footerWrapper}>
          <Footer />
        </div>
      </div>
      <nav className={`${styles.nav} ${montserrat.className}`}>
        <ul className={styles.list}>{items}</ul>
      </nav>
      {isShowStudyGroupLink ? (
        <div className={styles.studyGroupLinkWrapper}>
          <Link className={styles.studyGroupAnchor} href="/lesson">
            <FaReact className={styles.icon} />
          </Link>
        </div>
      ) : null}
    </NoSSR>
  );
}

export default Layout;
