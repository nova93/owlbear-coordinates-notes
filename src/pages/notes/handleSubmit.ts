import * as LS from "../../lib/localStorage";
import type { Note } from "../../types";

const handleSubmit = async (
	{ sceneId, x, y, content }: Note,
	callback: () => Promise<void>,
) => {
	LS.update(sceneId, x, y, content);
	await callback();
	return;
};

export default handleSubmit;
