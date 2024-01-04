import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://jouno.vercel.app",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
        },
    ];
}
