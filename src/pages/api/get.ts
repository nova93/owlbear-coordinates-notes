import type { BunRequest } from "bun";
import markdownit from "markdown-it";
import { createNote, getNote } from "../../lib/db";

const GET = (req: BunRequest) => {
	const url = new URL(req.url);
	const x = Number(url.searchParams.get("x"));
	const y = Number(url.searchParams.get("y"));
	const sceneId = url.searchParams.get("sceneId");
	const noteParams = { $x: x, $y: y, $sceneId: sceneId };

	let note = getNote.get(noteParams);

	if (!note) {
		createNote.run({ ...noteParams, $content: "### new page" });
		note = getNote.get(noteParams);
	}

	const md = markdownit();
	const formatted = md.render(note.content);

	return Response.json({ formatted, raw: note.content });
};

export default GET;
