import styles from "./style.module.scss";

function WebServiceTop(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.listBlock}>
          <a
            className={styles.anchor}
            href="https://taicho.kk-web.link/"
            rel="noreferrer"
            target="_blank"
          >
            <h2 className={styles.title}>たいちょ</h2>
            <p className={styles.description}>
              調子を管理してくれるサービスです。
            </p>
          </a>
          <hr className={styles.hr} />
          <a
            className={styles.anchor}
            href="https://recban.kk-web.link/"
            rel="noreferrer"
            target="_blank"
          >
            <h2 className={styles.title}>りくばん！</h2>
            <p className={styles.description}>
              バンドメンバーを募集したり見つけたりすることができるサービスです。
            </p>
          </a>
          <hr className={styles.hr} />
          <a
            className={styles.anchor}
            href="https://omocoro-archive.kk-web.link/"
            rel="noreferrer"
            target="_blank"
          >
            <h2 className={styles.title}>オモコロアーカイブ</h2>
            <p className={styles.description}>
              メディアサイト「オモコロ」の記事をまとめたサービスです。
            </p>
          </a>
          <hr className={styles.hr} />
          <a
            className={styles.anchor}
            href="https://omocoro-daily.kk-web.link/"
            rel="noreferrer"
            target="_blank"
          >
            <h2 className={styles.title}>
              オモコロ&デイリーポータルＺ非公式リーダー
            </h2>
            <p className={styles.description}>
              メディアサイト「オモコロ」と「デイリーポータルＺ」の記事をまとめたサービスです。
            </p>
          </a>
          <hr className={styles.hr} />
          <a
            className={styles.anchor}
            href="https://on-memo.kk-web.link/"
            rel="noreferrer"
            target="_blank"
          >
            <h2 className={styles.title}>おんめも</h2>
            <p className={styles.description}>
              様々なデバイスでメモを共有できるサービスです。
            </p>
          </a>
          <hr className={styles.hr} />
          <a
            className={styles.anchor}
            href="https://siritori-timer.kk-web.link/"
            rel="noreferrer"
            target="_blank"
          >
            <h2 className={styles.title}>限界しりとりタイマー</h2>
            <p className={styles.description}>
              ボードゲーム「限界しりとりパーティー！」のタイマーとして使えるサービスです。
            </p>
          </a>
          <hr className={styles.hr} />
          <a
            className={styles.anchor}
            href="https://serifuya.kk-web.link/"
            rel="noreferrer"
            target="_blank"
          >
            <h2 className={styles.title}>せりふや</h2>
            <p className={styles.description}>
              女の子のボイスをフリー素材として配布しているサービスです。
            </p>
          </a>
          <hr className={styles.hr} />
          <a
            className={styles.anchor}
            href="https://recigle.kk-web.link/"
            rel="noreferrer"
            target="_blank"
          >
            <h2 className={styles.title}>レシグル</h2>
            <p className={styles.description}>
              レシピを検索しやすくしてくれるサービスです。
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default WebServiceTop;
