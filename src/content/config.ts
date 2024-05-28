import { defineCollection, z } from "astro:content";

function removeDupsAndLowerCase(array: string[]) {
	if (!array.length) return array;
	const lowercaseItems = array.map((str) => str.toLowerCase());
	const distinctItems = new Set(lowercaseItems);
	return Array.from(distinctItems);
}

const post = defineCollection({
	schema: ({ image }) =>
		z.object({
      author: z.string().optional(),
			coverImage: z
				.object({
					alt: z.string(),
					src: image(),
				})
				.optional(),
			description: z.string().optional(),
			draft: z.boolean().default(false),
      featured: z.boolean().optional(),
			ogImage: z.string().optional(),
			publishDate: z
				.date()
				.or(z.date())
				.transform((val) => new Date(val)),
			tags: z.array(z.string()).default(["others"]).transform(removeDupsAndLowerCase),
      title: z.string(),
			updatedDate: z
				.date()
				.optional()
				.transform((str) => (str ? new Date(str) : undefined)),
		}),
	type: "content",
});

export const collections = { post };
