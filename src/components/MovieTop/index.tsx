import styles from "./style.module.scss";

function MovieTop(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.listBlock}>
          <a
            className={styles.anchor}
            href="https://www.youtube.com/channel/UC--pDyTi3aPS5wf6PN6kXDA"
            rel="noreferrer"
            target="_blank"
          >
            <h2 className={styles.title}>YouTube</h2>
          </a>
          <hr className={styles.hr} />
          <a
            className={styles.anchor}
            href="https://vimeo.com/piro0919"
            rel="noreferrer"
            target="_blank"
          >
            <h2 className={styles.title}>Vimeo</h2>
          </a>
          <hr className={styles.hr} />
          <a
            className={styles.anchor}
            href="http://www.nicovideo.jp/mylist/30473930"
            rel="noreferrer"
            target="_blank"
          >
            <h2 className={styles.title}>niconico</h2>
          </a>
        </div>
      </div>
    </div>
  );
}

export default MovieTop;
