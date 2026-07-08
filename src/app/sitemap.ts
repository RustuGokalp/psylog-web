import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";
import { getPosts } from "@/services/post.service";
import { getSpecializations } from "@/services/specialization.service";

const staticRoutes = [
  "/",
  "/hakkimda",
  "/yazilarim",
  "/calisma-alanlarim",
  "/iletisim",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
  }));

  try {
    const [postsResponse, specializations] = await Promise.all([
      getPosts({ size: 1000 }),
      getSpecializations(),
    ]);

    const postEntries: MetadataRoute.Sitemap = postsResponse.content.map(
      (post) => ({
        url: `${siteConfig.url}/yazilarim/${post.slug}`,
        lastModified: new Date(post.createdAt),
      })
    );

    const specializationEntries: MetadataRoute.Sitemap = specializations.map(
      (spec) => ({
        url: `${siteConfig.url}/calisma-alanlarim/${spec.slug}`,
        lastModified: new Date(spec.updatedAt),
      })
    );

    return [...staticEntries, ...postEntries, ...specializationEntries];
  } catch {
    return staticEntries;
  }
}
