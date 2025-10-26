import homePage from "./src/pages/(root)/index.html";
import ApiGET from "./src/pages/api/get";
import ApiPOST from "./src/pages/api/post";
import manifest from "./src/pages/manifest";
import notesPage from "./src/pages/notes/index.html";

Bun.serve({
	development: true,
	port: process.env.PORT || 3000,
	routes: {
		"/": homePage,
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
		"/api": {
			GET: ApiGET,
			POST: ApiPOST,
		},
	},

	fetch() {
		return new Response("Not Found", { status: 404 });
	},
});
