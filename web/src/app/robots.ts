import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },

      // Optional: Prevent indexing of admin pages
      {
        userAgent: "*",
        disallow: ["/blog/admin", "/api/"],
      },
    ],

    sitemap: "https://trekgroups.com/sitemap.xml",

    host: "https://trekgroups.com",
  };
}
