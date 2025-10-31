import markdownit from "markdown-it";
import * as LS from "../../lib/localStorage";

import type { Note } from "../../types";

const getNote = async (noteParams: Omit<Note, "content">) => {
	let note = LS.read(noteParams.sceneId, noteParams.x, noteParams.y);

	if (!note) {
		LS.create(noteParams.sceneId, noteParams.x, noteParams.y, "### new page");
		note = LS.read(noteParams.sceneId, noteParams.x, noteParams.y);
	}

	const md = markdownit();
	const formatted = md.render(note.content);

	return { formatted, raw: note.content };
};

export default getNote;
