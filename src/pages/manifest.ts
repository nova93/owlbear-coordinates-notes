import { NODE_ENV } from "../config";

const manifest = {
	name: "Grid Notes",
	version: `1.1.0-${NODE_ENV}`,
	manifest_version: 1,
	icon: "/notebook-pen.svg",
	author: "Made with ☕️ by Sykst",
	description: "Attach notes to your map grid.",
	action: {
		title: "Grid Notes",
		icon: "/notebook-pen.svg",
		popover: "/settings",
		height: 600,
		width: 500,
	},
};

export default manifest;
