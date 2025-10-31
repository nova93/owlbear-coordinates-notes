import homePage from "./src/pages/(root)/index.html";
import manifest from "./src/pages/manifest";
import notesPage from "./src/pages/notes/index.html";
import settingsPage from "./src/pages/settings/index.html";

Bun.serve({
	port: process.env.PORT || 3000,
	routes: {
		"/": homePage,
		"/settings": settingsPage,
		"/notes": notesPage,
		"/notebook-pen.svg": new Response(
			await Bun.file("./src/assets/notebook-pen.svg").bytes(),
			{
				headers: {
					"Content-Type": "image/svg+xml",
					"Access-Control-Allow-Origin": "https://www.owlbear.rodeo",
				},
			},
		),
		"/manifest": (req) => {
			const url = new URL(req.url);
			return Response.json(
				{ ...manifest, homepage_url: url.origin },
				{
					headers: {
						"Access-Control-Allow-Origin": "https://www.owlbear.rodeo",
					},
				},
			);
		},
	},

	fetch() {
		return new Response("Not Found", { status: 404 });
	},
});
