import OBR from "@owlbear-rodeo/sdk";
import pencilLine from "../../assets/pen-line.svg" with { type: "text" };
import scaling from "../../assets/scaling.svg" with { type: "text" };
import xIcon from "../../assets/x.svg" with { type: "text" };
import { POPOVER_ID } from "../../config";
import openPopover from "../../lib/openPopover";
import "../../style.css";
import getNote from "./getNote";
import handleSubmit from "./handleSubmit";

const url = new URL(window.location.toString());
const sceneId = url.searchParams.get("sceneId");
const x = Number(url.searchParams.get("x"));
const y = Number(url.searchParams.get("y"));

const paint = async () => {
	const { raw, formatted } = await getNote({ sceneId, x, y }, url);

	document.querySelector<HTMLDivElement>("#app").innerHTML = `
		<main>
			<nav class="sticky top-0 py-4 -mt-4 bg-base-100 flex place-content-between">
				<div>
					<button class="btn btn-accent" id="editButton">${pencilLine} Edit</button>
					<button class="btn btn-success hidden" id="saveButton">Save</button>
					<button class="btn btn-error hidden" id="cancelButton">Cancel</button>
				</div>
				<div>
					<button class="btn btn-info" id="sizeUp">${scaling} Resize</button>
					<button class="btn btn-info hidden" id="sizeDown">${scaling} Resize</button>
					<button class="btn btn-info" id="closeButton">${xIcon} Close</button>
				</div>
			</nav>
			<div class="mb-16">
				<div id="formatted">${formatted}</div>
				<p id="raw" contentEditable class="textarea hidden w-full resize-none h-full">${raw}</p>
			</div>
		</main>
  `;

	const editButton = document.querySelector<HTMLButtonElement>("#editButton");
	const saveButton = document.querySelector<HTMLButtonElement>("#saveButton");
	const cancelButton =
		document.querySelector<HTMLButtonElement>("#cancelButton");
	const formattedElem = document.querySelector<HTMLButtonElement>("#formatted");
	const textarea = document.querySelector<HTMLTextAreaElement>("#raw");
	const sizeUp = document.querySelector<HTMLButtonElement>("#sizeUp");
	const sizeDown = document.querySelector<HTMLButtonElement>("#sizeDown");
	const closeButton = document.querySelector<HTMLButtonElement>("#closeButton");

	const toggleButtons = () => {
		editButton.classList.toggle("hidden");
		saveButton.classList.toggle("hidden");
		cancelButton.classList.toggle("hidden");
		textarea.classList.toggle("hidden");
		formattedElem.classList.toggle("hidden");
	};

	const toggleSizers = () => {
		sizeUp.classList.toggle("hidden");
		sizeDown.classList.toggle("hidden");
	};

	const handleEditClick = () => toggleButtons();
	const handleCancelClick = async () => await paint();
	const sizeUpClick = async () => {
		toggleSizers();
		await openPopover({ x, y, sceneId }, "large");
	};
	const sizeDownClick = async () => {
		toggleSizers();
		await openPopover({ x, y, sceneId }, "small");
	};
	const handleCloseClick = () => OBR.popover.close(POPOVER_ID);

	editButton.addEventListener("click", handleEditClick);
	saveButton.addEventListener("click", () =>
		handleSubmit({ sceneId, x, y, content: textarea.value }, paint),
	);
	cancelButton.addEventListener("click", handleCancelClick);
	sizeUp.addEventListener("click", sizeUpClick);
	sizeDown.addEventListener("click", sizeDownClick);
	closeButton.addEventListener("click", handleCloseClick);
};

await paint();
