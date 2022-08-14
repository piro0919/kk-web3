import ReactScrollToTop from "react-scroll-to-top";
import styles from "./style.module.scss";

function ScrollToTop(): JSX.Element {
  return (
    <ReactScrollToTop
      className={styles.scrollToTop}
      color="#fff"
      height="24"
      smooth={true}
      width="24"
    />
  );
}

export default ScrollToTop;
