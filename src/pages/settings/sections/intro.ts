import link from "../../../components/link";

export default `
  <p class="my-2">Thank you for installing Grid Notes.</p>
  <p class="my-2">Your notes are saved in your browser using ${link("https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage", "<code>localStorage</code>")}. This means they only exist on the browser and device you're currently using. If you open Owlbear Rodeo on another browser or device, your notes won't be there.</p>
  <p class="my-2">To keep your notes safe or move them to another device, you can export them. Later, you can import them back if needed.</p>
`;
