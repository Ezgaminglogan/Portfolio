import { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/seo";

// Single-page site — fragments like /#about are the same document to crawlers,
// so the sitemap lists only the canonical root URL.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
