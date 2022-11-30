"use client";
import Link from "next/link";
import { useWindowSize } from "usehooks-ts";
import styles from "./style.module.scss";

function LessonTop(): JSX.Element {
  const { height } = useWindowSize();

  return (
    <div className={styles.wrapper} style={{ minHeight: height }}>
      <div className={styles.inner}>
        <h1 className={styles.heading1}>フロントエンド開発レッスン</h1>
        <hr className={styles.hr} />
        <dl className={styles.list}>
          <div className={styles.item}>
            <dt className={styles.term}>概要</dt>
            <dd className={styles.description}>
              React を使用しフロントエンド開発のいろはを学べます。
            </dd>
          </div>
          <div className={styles.item}>
            <dt className={styles.term}>目標</dt>
            <dd className={styles.description}>
              Web サイトまたは Web サービスのリリースを目標とします。
            </dd>
          </div>
          <div className={styles.item}>
            <dt className={styles.term}>対象</dt>
            <dd className={styles.description}>フロントエンド開発初心者の方</dd>
          </div>
          <div className={styles.item}>
            <dt className={styles.term}>会得可能なスキル</dt>
            <dd className={styles.description}>
              <ul>
                {[
                  "React",
                  "Next.js",
                  "SWR",
                  "CSS Modules",
                  "styled-components",
                  "TypeScript",
                  "ESLint",
                  "Stylelint",
                  "Prettier",
                  "Contentful",
                  "Atomic Design",
                  "Git",
                  "GitHub",
                  "Vercel",
                  "その他、河村が把握しているスキルはすべて会得可能です。",
                ].map((children) => (
                  <li className={styles.item2} key={children}>
                    {children}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div className={styles.item}>
            <dt className={styles.term}>受講方法</dt>
            <dd className={styles.description}>
              GitHub を使用し Issue ベースの開発を行っていただきます。
              <br />
              また質問やコミュニケーションについては Discord
              のダイレクトメッセージを使用し、河村と 1 対 1
              でやり取りを行います。
            </dd>
          </div>
          <div className={styles.item}>
            <dt className={styles.term}>準備物</dt>
            <dd className={styles.description}>
              <ul>
                {[
                  "パソコン（Windows, Mac は問いません）",
                  "エディター（Visual Studio Code の使用を推奨します）",
                  "GitHub のアカウント",
                ].map((children) => (
                  <li className={styles.item2} key={children}>
                    {children}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div className={styles.item}>
            <dt className={styles.term}>河村について</dt>
            <dd className={styles.description}>
              <Link className={styles.anchor} href="/">
                Web サイト
              </Link>
              をご確認いただきたく思います。
            </dd>
          </div>
          <div className={styles.item}>
            <dt className={styles.term}>2022 年 12 月時点の受講者数</dt>
            <dd className={styles.description}>5 人</dd>
          </div>
          <div className={styles.item}>
            <dt className={styles.term}>受講料</dt>
            <dd className={styles.description}>無料</dd>
          </div>
        </dl>
        <hr className={styles.hr} />
        <p>
          『ぜひレッスンを受けてみたい！』と思われましたら、河村の
          Discord（piro#7018）をフレンドに追加していただきたく思います。
          <br />
          またもう少しレッスンの詳細を知りたい方につきましては、
          <Link className={styles.anchor} href="/contact">
            コンタクトフォーム
          </Link>
          よりご連絡いただきたく思います。
        </p>
      </div>
    </div>
  );
}

export default LessonTop;
