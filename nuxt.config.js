import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
	meta: {
		title: "Arsya Group",
		meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }],
		link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
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
