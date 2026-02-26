import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		published: z.date(),
		updated: z.date().optional(),
		draft: z.boolean().optional().default(false),
		pinned: z.boolean().optional().default(false),
		description: z.string().optional().default(""),
		image: z.string().optional().default(""),
		tags: z.array(z.string()).optional().default([]),
		category: z.string().optional().nullable().default(""),
		lang: z.string().optional().default(""),

		/* For internal use */
		prevTitle: z.string().default(""),
		prevSlug: z.string().default(""),
		nextTitle: z.string().default(""),
		nextSlug: z.string().default(""),
	}),
});
const specCollection = defineCollection({
	schema: z.object({
		friends: z
			.array(
				z.object({
					title: z.string(),
					imgurl: z.string(),
					desc: z.string(),
					siteurl: z.string(),
					tags: z.array(z.string()).optional().default([]),
				}),
			)
			.optional()
			.default([]),
	}),
});
export const collections = {
	posts: postsCollection,
	spec: specCollection,
};
