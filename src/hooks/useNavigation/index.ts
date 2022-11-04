import { usePathname } from "next/navigation";
import { useMemo } from "react";

type SubNavigation = {
  title: string;
  url: string;
};

type Navigation = {
  isActive: boolean;
  subNavigations?: SubNavigation[];
  title: string;
  url: string;
};

export type NavigationData = Navigation[];

function useNavigation(): NavigationData {
  const pathname = usePathname();
  const navigations = useMemo(
    () =>
      [
        {
          title: "HOME",
          url: "/",
        },
        {
          subNavigations: [
            {
              title: "WEBSERVICE",
              url: "/web-service",
            },
            {
              title: "WEBSITE",
              url: "/web-site",
            },
            {
              title: "MOVIE",
              url: "/movie",
            },
            {
              title: "APPLICATION",
              url: "/application",
            },
            {
              title: "NPMPACKAGE",
              url: "/npm-package",
            },
          ],
          title: "PORTFOLIO",
          url: "/portfolio",
        },
        {
          title: "BLOG",
          url: "/blog",
        },
        {
          title: "CONTACT",
          url: "/contact",
        },
        {
          title: "ABOUT",
          url: "/about",
        },
      ].map(({ subNavigations, title, url }) => ({
        subNavigations,
        title,
        url,
        isActive: pathname === url,
      })),
    [pathname]
  );

  return navigations;
}

export default useNavigation;
