import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://e-signature-nu.vercel.app";

  // Add routes you want indexed
  const routes = [
    "",
    "/app",
    "/#worksheets",
  ];

  // Note: sitemap entries shouldn’t include hash fragments (#...). We’ll omit that.
  const urls = [
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/app`, changeFrequency: "weekly", priority: 0.8 },
  ] satisfies MetadataRoute.Sitemap;

  return urls;
}
