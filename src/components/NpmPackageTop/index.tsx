import styles from "./style.module.scss";

function NpmPackageTop(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.listBlock}>
          <a
            className={styles.anchor}
            href="https://www.npmjs.com/package/next-firebase-authentication"
            rel="noreferrer"
            target="_blank"
          >
            <h2 className={styles.title}>next-firebase-authentication</h2>
            <p className={styles.description}>
              Next.js と Firebase Authentication
              を容易に繋ぎこむ独自フックを提供します。
            </p>
          </a>
          <hr className={styles.hr} />
          <a
            className={styles.anchor}
            href="https://www.npmjs.com/package/react-three-toggle"
            rel="noreferrer"
            target="_blank"
          >
            <h2 className={styles.title}>react-three-toggle</h2>
            <p className={styles.description}>
              3
              つ以上のスイッチを持つトグルボタン用のコンポーネントを提供します。
            </p>
          </a>
          <hr className={styles.hr} />
          <a
            className={styles.anchor}
            href="https://www.npmjs.com/package/react-comic-viewer"
            rel="noreferrer"
            target="_blank"
          >
            <h2 className={styles.title}>react-comic-viewer</h2>
            <p className={styles.description}>
              画像などを見開きで閲覧できるコンポーネントを提供します。
            </p>
          </a>
          <hr className={styles.hr} />
          <a
            className={styles.anchor}
            href="https://www.npmjs.com/package/use-pwa"
            rel="noreferrer"
            target="_blank"
          >
            <h2 className={styles.title}>use-pwa</h2>
            <p className={styles.description}>
              PWA の状態やインストール用の関数を渡す独自フックを提供します。
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default NpmPackageTop;
