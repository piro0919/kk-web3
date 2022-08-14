import styles from "./style.module.scss";

function WebSiteTop(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.listBlock}>
          <a
            className={styles.anchor}
            href="https://kanaohonten.vercel.app/"
            rel="noreferrer"
            target="_blank"
          >
            <h2 className={styles.title}>金尾本店</h2>
            <p className={styles.description}>
              広島県福山市で営業している魚屋「金尾本店」のサイトを作成しました。
            </p>
          </a>
          <hr className={styles.hr} />
          <a
            className={styles.anchor}
            href="https://www.nbhyakuhati.com/"
            rel="noreferrer"
            target="_blank"
          >
            <h2 className={styles.title}>7:08</h2>
            <p className={styles.description}>
              イラストレーター「7:08」さんのサイトを作成しました。
            </p>
          </a>
          <hr className={styles.hr} />
          <a
            className={styles.anchor}
            href="https://kontaniki.com/"
            rel="noreferrer"
            target="_blank"
          >
            <h2 className={styles.title}>1stKontact</h2>
            <p className={styles.description}>
              イラストレーター「こんた」さんのサイトを作成しました。
            </p>
          </a>
          <hr className={styles.hr} />
          <a
            className={styles.anchor}
            href="https://hatake.kk-web.link/"
            rel="noreferrer"
            target="_blank"
          >
            <h2 className={styles.title}>
              はじめしゃちょーの畑 非公式ファンサイト
            </h2>
            <p className={styles.description}>
              YouTube
              チャンネル「はじめしゃちょーの畑」の非公式ファンサイトを作成しました。
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default WebSiteTop;
