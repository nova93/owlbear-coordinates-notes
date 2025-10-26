import * as LS from "../../lib/localStorage";
import type { Note } from "../../types";
import getUserSettings from "./getUserSettings";

const handleSubmit = async (
	{ sceneId, x, y, content }: Note,
	callback: () => Promise<void>,
) => {
	const { storage } = getUserSettings();

	if (storage === "browser") {
		LS.update(sceneId, x, y, content);
		await callback();
		return;
	}

	const res = await fetch("/api", {
		method: "POST",
		body: JSON.stringify({
			x,
			y,
			sceneId,
			content,
		}),
	});

	if (res.ok) {
		await callback();
		return;
	}

	throw Error("failed to submit");
};

export default handleSubmit;
