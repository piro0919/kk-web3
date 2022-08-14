import { NextSeo, NextSeoProps } from "next-seo";
import { useRouter } from "next/router";

export type SeoProps = Pick<NextSeoProps, "description" | "title">;

function Seo({ description, title }: SeoProps): JSX.Element {
  const { asPath } = useRouter();

  return (
    <NextSeo
      canonical="https://kk-web.link/"
      description={
        description ||
        "Freelance front end developer and video creator piro's website"
      }
      openGraph={{
        description:
          description ||
          "Freelance front end developer and video creator piro's website",
        images: [
          {
            alt: "kk-web",
            height: 630,
            type: "image/png",
            url: "https://kk-web.link/kk-web.png",
            width: 1200,
          },
        ],
        site_name: "kk-web",
        title: `${title ? `${title} - ` : ""}kk-web`,
        url: `https://kk-web.link${asPath}`,
      }}
      title={`${title ? `${title} - ` : ""}kk-web`}
      twitter={{
        cardType: "summary_large_image",
      }}
    />
  );
}

export default Seo;
