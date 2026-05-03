/**
 * Resolves raw image paths at build time using Vite's glob import.
 * Used by the remark-raw-image plugin to get correct URLs for @[alt](src) syntax.
 */
const imageFiles = import.meta.glob<ImageMetadata>("../content/**/*.jpg", {
	import: "default",
	eager: true,
});
const imageFiles2 = import.meta.glob<ImageMetadata>("../content/**/*.jpeg", {
	import: "default",
	eager: true,
});
const imageFiles3 = import.meta.glob<ImageMetadata>("../content/**/*.png", {
	import: "default",
	eager: true,
});
const imageFiles4 = import.meta.glob<ImageMetadata>("../content/**/*.gif", {
	import: "default",
	eager: true,
});
const imageFiles5 = import.meta.glob<ImageMetadata>("../content/**/*.webp", {
	import: "default",
	eager: true,
});
const imageFiles6 = import.meta.glob<ImageMetadata>("../content/**/*.avif", {
	import: "default",
	eager: true,
});
const imageFiles7 = import.meta.glob<ImageMetadata>("../content/**/*.svg", {
	import: "default",
	eager: true,
});

// Build a lookup map: normalized relative path -> asset URL string
const imageMap: Record<string, string> = {};
const allFiles = { ...imageFiles, ...imageFiles2, ...imageFiles3, ...imageFiles4, ...imageFiles5, ...imageFiles6, ...imageFiles7 };
for (const [key, value] of Object.entries(allFiles)) {
	const normalized = key.replace(/\\/g, "/");
	imageMap[normalized] = value as string;
}


/**
 * Resolve a relative image path to its final URL.
 * @param relativePath - Path relative to /src, e.g. "content/photos/test/sunrise.jpg"
 * @returns The resolved image URL, or the original path if not found
 */
export function resolveRawImagePath(relativePath: string): string {
	// relativePath is like "content/photos/test/sunrise.jpg" (relative to /src)
	// glob keys are like "../content/photos/test/sunrise.jpg" (relative to src/utils/)
	const normalized = `../${relativePath}`.replace(/\\/g, "/");
	const url = imageMap[normalized];
	return url || relativePath;
}
