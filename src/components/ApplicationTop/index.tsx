import styles from "./style.module.scss";

function ApplicationTop(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.listBlock}>
          <a
            className={styles.anchor}
            href="https://play.google.com/store/apps/details?id=link.kk_web.omocoro_archive.twa"
            rel="noreferrer"
            target="_blank"
          >
            <h2 className={styles.title}>オモコロアーカイブ</h2>
            <p className={styles.description}>
              メディアサイト「オモコロ」の記事をまとめたアプリです。
            </p>
          </a>
          <hr className={styles.hr} />
          <a
            className={styles.anchor}
            href="https://play.google.com/store/apps/details?id=link.kk_web.on_memo.twa"
            rel="noreferrer"
            target="_blank"
          >
            <h2 className={styles.title}>おんめも</h2>
            <p className={styles.description}>
              様々なデバイスでメモを共有できるアプリです。
            </p>
          </a>
          <hr className={styles.hr} />
          <a
            className={styles.anchor}
            href="https://play.google.com/store/apps/details?id=link.kk_web.recigle.twa"
            rel="noreferrer"
            target="_blank"
          >
            <h2 className={styles.title}>レシグル</h2>
            <p className={styles.description}>
              レシピを検索しやすくしてくれるアプリです。
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ApplicationTop;
