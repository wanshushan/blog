import { type CollectionEntry, getCollection } from "astro:content";

async function getRawSortedPhotos() {
	const allPhotos = await getCollection("photos", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});

	const sorted = allPhotos.sort((a, b) => {
		const dateA = new Date(a.data.published);
		const dateB = new Date(b.data.published);
		return dateA > dateB ? -1 : 1;
	});
	return sorted;
}

export async function getSortedPhotos() {
	const sorted = await getRawSortedPhotos();

	for (let i = 1; i < sorted.length; i++) {
		sorted[i].data.nextSlug = sorted[i - 1].slug;
		sorted[i].data.nextTitle = sorted[i - 1].data.title;
	}
	for (let i = 0; i < sorted.length - 1; i++) {
		sorted[i].data.prevSlug = sorted[i + 1].slug;
		sorted[i].data.prevTitle = sorted[i + 1].data.title;
	}

	return sorted;
}

export type PhotoForList = {
	slug: string;
	data: CollectionEntry<"photos">["data"];
};

export async function getSortedPhotosList(): Promise<PhotoForList[]> {
	const sortedFullPhotos = await getRawSortedPhotos();

	const sortedPhotosList = sortedFullPhotos.map((photo) => ({
		slug: photo.slug,
		data: photo.data,
	}));

	return sortedPhotosList;
}
