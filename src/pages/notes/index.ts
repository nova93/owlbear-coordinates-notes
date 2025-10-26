import OBR from "@owlbear-rodeo/sdk";
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
    <header>
      <button class="btn btn-outline" id="editButton">Edit</button>
      <button class="btn btn-outline hidden" id="saveButton">Save</button>
      <button class="btn btn-outline hidden" id="cancelButton">Cancel</button>
      <button class="btn btn-outline" id="sizeUp">Resize</button>
      <button class="btn btn-outline hidden" id="sizeDown">Resize</button>
      <button class="btn btn-outline" id="closeButton">Close</button>
    </header>
    <main>
      <div id="formatted">${formatted}</div>
      <textarea id="raw" class="textarea hidden">${raw}</textarea>
    </main>
  `;

	const editButton: HTMLButtonElement = document.querySelector("#editButton");
	const saveButton: HTMLButtonElement = document.querySelector("#saveButton");
	const cancelButton: HTMLButtonElement =
		document.querySelector("#cancelButton");
	const formattedElem: HTMLDivElement = document.querySelector("#formatted");
	const textarea: HTMLTextAreaElement = document.querySelector("#raw");
	const sizeUp: HTMLButtonElement = document.querySelector("#sizeUp");
	const sizeDown: HTMLButtonElement = document.querySelector("#sizeDown");
	const closeButton: HTMLButtonElement = document.querySelector("#closeButton");

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
