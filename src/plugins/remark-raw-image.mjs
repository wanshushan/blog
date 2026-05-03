import path from "node:path";
import { visit } from "unist-util-visit";
import { resolveRawImagePath } from "../utils/raw-image-resolver.js";

/**
 * remark plugin to handle @[alt](src) syntax for raw images (no webp conversion).
 * Resolves image paths at build time using Vite's asset handling.
 */
export function remarkRawImage() {
	return (tree, file) => {
		// Get the directory of the current markdown file relative to /src
		const filePath = (file.history?.[0] || "").replace(/\\/g, "/");
		let baseDir = "/src/content/";
		const srcIndex = filePath.indexOf("/src/");
		if (srcIndex !== -1) {
			baseDir = `${path.dirname(filePath.substring(srcIndex))}/`.replace(/\\/g, "/");
		}
		// Strip /src/ prefix for resolver (glob keys are relative to src/utils/)
		const baseDirForResolver = baseDir.replace(/^\/src\//, "");

		visit(tree, "paragraph", (node) => {
			const children = node.children;
			for (let i = 0; i < children.length - 1; i++) {
				const textNode = children[i];
				const nextNode = children[i + 1];

				if (
					textNode.type === "text" &&
					textNode.value.endsWith("@") &&
					nextNode.type === "link" &&
					nextNode.url
				) {
					// Remove the "@" from the text node
					textNode.value = textNode.value.slice(0, -1);
					if (textNode.value === "") {
						textNode.type = "html";
						textNode.value = "";
					}

					const alt = nextNode.children
						.filter((c) => c.type === "text")
						.map((c) => c.value)
						.join("");

					// Resolve the image path (without /src/ prefix for the resolver)
					const resolvedRelative = path
						.normalize(path.join(baseDirForResolver, nextNode.url))
						.replace(/\\/g, "/")
						.replace(/^\//, "");

					const resolvedUrl = resolveRawImagePath(resolvedRelative);

					// Replace the link node with a raw img HTML node
					nextNode.type = "html";
					nextNode.value = `<img src="${resolvedUrl}" alt="${alt}" class="raw-image" loading="lazy" decoding="async" />`;
					delete nextNode.url;
					delete nextNode.children;
					delete nextNode.title;
				}
			}

			// Clean up empty html nodes
			node.children = node.children.filter(
				(child) => !(child.type === "html" && child.value === ""),
			);
		});
	};
}
