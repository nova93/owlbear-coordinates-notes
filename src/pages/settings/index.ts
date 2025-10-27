import OBR from "@owlbear-rodeo/sdk";
import * as z from "zod";
import header from "../../components/header";
import { LS_KEY, POPOVER_ID, TOOL_ID } from "../../config";
import openPopover from "../../lib/openPopover";
import "../../style.css";
import type { Note, SceneMeta } from "../../types";
import exportComponent from "./sections/export";
import importComponent from "./sections/import";
import introComponent from "./sections/intro";

const APP = document.querySelector<HTMLDivElement>("#app");

const NoteSchema = z.object({
	x: z.number(),
	y: z.number(),
	sceneId: z.string(),
	content: z.string(),
});

APP.innerHTML = `
  <main>
    ${header("Grid Notes")}
		<section class="mt-8">${introComponent}</section>
		<section class="mt-8">${exportComponent("export")}</section>
		<section class="mt-8 my-16">${importComponent("import", "import-file")}</section>
  </main>
`;

const exportEl = document.querySelector<HTMLButtonElement>("#export");
const importFormEl = document.querySelector<HTMLFormElement>("#import");
const importFileEl = document.querySelector<HTMLInputElement>("#import-file");

exportEl.addEventListener("click", () => {
	const raw = localStorage.getItem(LS_KEY);

	if (!raw) {
		alert("There's nothing to export");
		return;
	}

	let notes: Note[];
	try {
		notes = JSON.parse(raw);
	} catch (err) {
		console.log("error", err);
		alert("Stored data is not valid JSON.");
		return;
	}

	const blob = new Blob([JSON.stringify(notes, null, 2)], {
		type: "application/json",
	});
	const url = URL.createObjectURL(blob);

	const a = document.createElement("a");
	a.href = url;
	a.download = `${LS_KEY}-export.json`;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
});

importFormEl.addEventListener("submit", (ev) => {
	ev.preventDefault();
	// grab file
	const file = importFileEl.files[0];

	const reader = new FileReader();
	reader.onload = (e) => {
		const result = e.target.result;
		if (typeof result !== "string") {
			throw Error("Wrong file format");
		}

		try {
			const jsonData = JSON.parse(result);

			try {
				const parsed = NoteSchema.parse(jsonData);
				localStorage.setItem(LS_KEY, JSON.stringify(parsed));
				importFormEl.reset();
			} catch (err) {
				if (err instanceof z.ZodError) {
					console.log("File validation failed", err.issues);
					throw Error();
				}
			}
		} catch (err) {
			console.log("error", err);
			alert("Error: The uploaded file is not valid JSON.");
		}
	};

	reader.readAsText(file);
});

OBR.onReady(async () => {
	OBR.scene.onReadyChange(async (ready) => {
		if (ready) {
			const sceneMeta = (await OBR.scene.getMetadata())[
				`${TOOL_ID}/metadata`
			] as SceneMeta;

			if (sceneMeta?.sceneId) {
				console.log("Scene has an ID already!", sceneMeta.sceneId);
			} else {
				console.log("Creating a new ID for this scene!");
				await OBR.scene.setMetadata({
					[`${TOOL_ID}/metadata`]: {
						sceneId: window.crypto.randomUUID(),
					},
				});
			}
		}
	});

	await OBR.tool.create({
		id: `${TOOL_ID}/tool`,
		icons: [
			{
				icon: "/notebook-pen.svg",
				label: "Notes",
			},
		],
		defaultMode: `${TOOL_ID}/mode`,
	});

	await OBR.tool.createMode({
		id: `${TOOL_ID}/mode`,
		preventDrag: { dragging: false },
		cursors: [
			{
				cursor: "pointer",
				filter: {
					activeTools: [`${TOOL_ID}/tool`],
				},
			},
		],
		icons: [
			{
				icon: "/pen-line.svg",
				label: "Line",
				filter: {
					activeTools: [`${TOOL_ID}/tool`],
				},
			},
		],
		async onToolClick(_, event) {
			const { x, y } = await OBR.scene.grid.snapPosition(
				event.pointerPosition,
				1,
				false,
				true,
			);
			const sceneMeta = (await OBR.scene.getMetadata())[
				`${TOOL_ID}/metadata`
			] as SceneMeta;

			await openPopover(
				{
					x: Math.round(x),
					y: Math.round(y),
					sceneId: sceneMeta.sceneId,
				},
				"small",
			);
		},
		async onToolDoubleClick() {
			await OBR.popover.close(POPOVER_ID);
		},
	});
});
