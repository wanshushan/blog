// import { tr } from "@i18n/languages/tr";
import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "wanshushan",
	subtitle: "blog",
	lang: "zh_CN", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
	// pinned: z.boolean().optional().default(false),
	// 主题颜色配置
	themeColor: {
		hue: 250, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: true, // Hide the theme color picker for visitors
	},
	// 横幅图片配置
	banner: {
		enable: true, // Display a banner image on the top of the homepage and post pages（开关）
		src: "assets/images/1.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: false, // Display the credit text of the banner image（是否显示版权信息）
			text: "", // Credit text to be displayed (e.g. "Photo by XXX on Unsplash")（版权信息文本，例如“Photo by XXX on Unsplash”）
			url: "", // (Optional) URL link to the original artwork or artist's page
		},
	},
	// 目录配置
	toc: {
		enable: true, // Display the table of contents on the right side of the post (目录开关，开启后在文章右侧显示目录)
		depth: 3, // Maximum heading depth to show in the table, from 1 to 3 
	},
	// 开关：是否启用响应式图片（srcset/sizes），以减少不同设备上的传输
	image: {
		adaptive: false, // Enable responsive images (srcset/sizes) to reduce transfer on different devices
	},
	// 网站图标配置
	favicon: [
		// Leave this array empty to use the default favicon
		{
			src: "/favicon/blog-icon.png", // Path of the favicon, relative to the /public directory
			//   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
			//   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		},
	],
};
// top栏配置
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		// 友链
		LinkPreset.Friends,
		{
			name: "GitHub",
			url: "https://github.com/wanshushan", // Internal links should not include the base path, as it is automatically added
			external: true, // Show an external link icon and will open in a new tab
		},
	],
};
// 右侧个人信息配置
export const profileConfig: ProfileConfig = {
	avatar: "assets/images/n2.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "wanshushan",
	bio: "A blog about life and code.",
	links: [
		// {
		// 	name: "Twitter",
		// 	icon: "fa6-brands:twitter", // Visit https://icones.js.org/ for icon codes
		// 	// You will need to install the corresponding icon set if it's not already included
		// 	// `pnpm add @iconify-json/<icon-set-name>`
		// 	url: "https://twitter.com",
		// },
		{
			name: "Bilibili",
			icon: "fa6-brands:bilibili",
			url: "https://space.bilibili.com/516016576?spm_id_from=333.1007.0.0",
		},
		{
			name: "QQ",
			icon: "fa6-brands:qq",
			url: "https://qm.qq.com/q/sOmzW4VyPC",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/wanshushan",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};
