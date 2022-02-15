import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
	meta: {
		title: "Arsya Group",
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ name: "author", content: "Arsya Group" },
			{ name: "keywords", content: "Arysa, Arsya Group, Arysa Buah, Arsya Catering, Arsya Cafe, Arsya Wisata" },
			{
				name: "description",
				content: "Arsya Group | Harmony Dalam Keselarasan",
			},
			//Open Graph Protocol
			{ property: "og:title", content: "Arsya Group" },
			{ property: "og:site_name", content: "Arsya Group" },
			{
				property: "og:description",
				content: "Arsya Group | Harmony Dalam Keselarasan",
			},
			{ property: "og:type", content: "website" },
			{ property: "og:url", content: "https://arsya.co.id/" },
			//Twitter Property
			{ name: "twitter:card", content: "summary" },
			{ name: "twitter:title", content: "Arsya Group" },
			{
				name: "twitter:description",
				content: "Arsya Group | Harmony Dalam Keselarasan",
			},
		],
		link: [{ rel: "icon", type: "image/x-icon", href: "static/favicon.ico" }],
	},
	build: {
		postcss: {
			postcssOptions: {
				plugins: {
					tailwindcss: {},
					autoprefixer: {},
				},
			},
		},
	},
	css: ["@/assets/css/main.css"],
});
