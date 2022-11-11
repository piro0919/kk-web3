"use client";
import { NextSeo, NextSeoProps } from "next-seo";
import { OpenGraph } from "next-seo/lib/types";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export type SeoProps = Pick<NextSeoProps, "description" | "title"> &
  Pick<OpenGraph, "type">;

function Seo({
  description: propDescription,
  title,
  type,
}: SeoProps): JSX.Element {
  const description = useMemo(
    () =>
      propDescription
        ? propDescription.substring(0, 150)
        : "Freelance front end developer and video creator piro's website",
    [propDescription]
  );
  const pathname = usePathname();

  return (
    <NextSeo
      canonical={`https://kk-web.link${pathname}`}
      description={description}
      openGraph={{
        description,
        type,
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
