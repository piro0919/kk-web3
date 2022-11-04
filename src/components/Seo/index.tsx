"use client";
import { NextSeo, NextSeoProps } from "next-seo";
import { usePathname } from "next/navigation";

export type SeoProps = Pick<NextSeoProps, "description" | "title">;

function Seo({ description, title }: SeoProps): JSX.Element {
  const pathname = usePathname();

  return (
    <NextSeo
      canonical={`https://kk-web.link${pathname}`}
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
        url: `https://kk-web.link${pathname}`,
      }}
      title={`${title ? `${title} - ` : ""}kk-web`}
      twitter={{
        cardType: "summary_large_image",
      }}
      useAppDir={true}
    />
  );
}

export default Seo;
