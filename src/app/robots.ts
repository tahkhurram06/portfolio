import type { MetadataRoute } from "next";

// TODO: replace with your real deployed domain (no trailing slash).
const BASE_URL = "https://tahakhurram.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}