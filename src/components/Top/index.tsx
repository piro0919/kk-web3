import Image from "next/image";
import styles from "./style.module.scss";

function Top(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.bubbleWrapper}>
          <div className={styles.bubbleImageWrapper}>
            <Image
              alt="kk-web"
              layout="fill"
              quality={100}
              src="/bubble.webp"
            />
          </div>
          <div className={styles.titleWrapper}>
            <div className={styles.title}>ケーケーウェブ</div>
            <h1 className={styles.heading1}>kk-web</h1>
          </div>
        </div>
        <div className={styles.tsumugiWrapper}>
          <div className={styles.tsumugiImageWrapper}>
            <Image
              alt="春日部つむぎ"
              layout="fill"
              quality={100}
              src="/kasukabetsumugi.webp"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Top;
