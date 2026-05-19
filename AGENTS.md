# AI Coding Agent Instructions

This file provides rules, project-specific conventions, and essential knowledge for AI coding agents working on the wanshushan-blog codebase. This blog is built using [Astro](https://astro.build/) and is based on the [Fuwari](https://github.com/saicaca/fuwari) theme.

## General Principles

- **Link, don't embed**: Do not duplicate large swaths of documentation that exist elsewhere. Standard contributor details are in [CONTRIBUTING.md](CONTRIBUTING.md).
- **Minimal by default**: Only suggest code changes necessary for the specific issue.
- **Commit Messages**: Follow [Conventional Commits](https://www.conventionalcommits.org/).

## Development Environment & Commands

This project uses `pnpm` strictly (`preinstall` enforces this). Execute all package scripts via `pnpm`.

- **Start Dev Server**: `pnpm dev`
- **Build Server**: `pnpm build` (Astro build + generates Pagefind search indexing)
- **Format Code**: `pnpm format` (using Biome)
- **Lint Code**: `pnpm lint` (using Biome)
- **Type Checking**: `pnpm type-check` (tsc diagnostics) and `pnpm check` (Astro type checking)
- **Content Creation**: Use `pnpm new-post` (blog) and `pnpm new-photo` (gallery) to scaffold markdown files.

## Architectural Boundaries

### Astro vs Svelte Usage
- **Astro (`.astro`)**: Used for the majority of structural UI, page layouts (`MainGridLayout.astro`, `Navbar.astro`), and content layouts. Rely on Astro's static build capabilities.
- **Svelte (`.svelte`)**: Used exclusively for stateful, interactive client-side functionality (e.g., `Search.svelte` wrapping Pagefind, `LightDarkSwitch.svelte`).

### Styling & CSS
- The project primarily uses **Tailwind CSS**.
- Markdown content styling is maintained in dedicated style files, utilizing standard CSS and Stylus located within `src/styles/` (`markdown.css`, `markdown-extend.styl`).

### Project Configuration & State
- **Site Configuration**: All site metadata, default themes, responsive navbar links, and author profile details are unified in [src/config.ts](src/config.ts). Do not hard-code these details into individual UI components.
- **Content Collections**: Content definitions are strictly typed with Zod in [src/content/config.ts](src/content/config.ts):
  - `posts`: Blog entries structure.
  - `photos`: Photography gallery structure.
  - `spec`: Meta-structured data like the friends list.

### Markdown Processing & Plugins
- The core custom configurations reside in `astro.config.mjs`.
- Specialized code highlighting relies on `astro-expressive-code`.
- Custom remark and rehype extensions (like reading time, raw image processing, and custom GitHub cards) sit in `src/plugins/`.
- Smooth page transitions are driven by `@swup/astro` rather than native Astro view transitions.
