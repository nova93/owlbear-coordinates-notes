export type SceneMeta = {
	sceneId: string;
};

export type Note = {
	x: number;
	y: number;
	sceneId: string;
	content: string;
};

export type NoteQueryParams = {
	$x: number;
	$y: number;
	$sceneId: string;
	$content?: string;
};

export type UserSettings = {
	storage: "browser";
};
