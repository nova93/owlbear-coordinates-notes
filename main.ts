import notebookPen from "./src/assets/notebook-pen.svg";
import homePage from "./src/pages/(root)/index.html";
import ApiGET from "./src/pages/api/get";
import ApiPOST from "./src/pages/api/post";
import manifest from "./src/pages/manifest";
import notesPage from "./src/pages/notes/index.html";

Bun.serve({
	port: 3000,
	routes: {
		"/": homePage,
		"/notes": notesPage,
		"/notebook-pen.svg": new Response(notebookPen, {
			headers: {
				"Content-Type": "image/svg+xml",
				"Access-Control-Allow-Origin": "https://www.owlbear.rodeo",
			},
		}),
		"/manifest": Response.json(manifest, {
			headers: {
				"Access-Control-Allow-Origin": "https://www.owlbear.rodeo",
			},
		}),
		"/api": {
			GET: ApiGET,
			POST: ApiPOST,
		},
	},

	fetch() {
		return new Response("Not Found", { status: 404 });
	},
});
