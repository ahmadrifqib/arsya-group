module.exports = {
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./**/*.vue",
		"./*.vue",
	],
	variants: {
		extend: {},
	},
	plugins: [],
	theme: {
		extend: {
			backgroundImage: {
				food: "url('assets/food.jpg')",
			},
		},
	},
};
