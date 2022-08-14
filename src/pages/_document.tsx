import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>
          <link href="https://fonts.googleapis.com" rel="preconnect" />
          <link
            crossOrigin="true"
            href="https://fonts.gstatic.com"
            rel="preconnect"
          />
          <link
            as="style"
            href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
            rel="preload"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
            rel="stylesheet"
          />
          <link
            as="style"
            href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap&text=ケーウェブ"
            rel="preload"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=M+PLUS+1+Code:wght@700&display=swap&text=ケーウェブ"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
