import type { MetadataRoute } from "next";

// TODO: replace with your real deployed domain (no trailing slash).
const BASE_URL = "https://portfolio-nine-rouge-86.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/projects", "/contact"];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
