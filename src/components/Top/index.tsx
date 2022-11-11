// eslint-disable-next-line camelcase
import { M_PLUS_1_Code } from "@next/font/google";
import Image from "next/image";
import styles from "./style.module.scss";

// eslint-disable-next-line new-cap
const mPlus1Code = M_PLUS_1_Code({
  fallback: ["sans-serif"],
  preload: true,
  subsets: ["japanese"],
  weight: "700",
});

function Top(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.bubbleWrapper}>
          <div className={styles.bubbleImageWrapper}>
            <Image alt="kk-web" fill={true} quality={100} src="/bubble.webp" />
          </div>
          <div className={styles.titleWrapper}>
            <div className={`${styles.title} ${mPlus1Code.className}`}>
              ケーケーウェブ
            </div>
          </div>
        </div>
        <div className={styles.tsumugiWrapper}>
          <div className={styles.tsumugiImageWrapper}>
            <Image
              alt="春日部つむぎ"
              fill={true}
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
