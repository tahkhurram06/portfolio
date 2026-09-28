import type { MetadataRoute } from "next";

// TODO: replace with your real deployed domain (no trailing slash).
const BASE_URL = "https://taha-khurram.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}