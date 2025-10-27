import installation from "../../assets/installation.gif";
import header from "../../components/header";
import link from "../../components/link";
import "../../style.css";

const APP = document.querySelector<HTMLDivElement>("#app");

const paint = () => {
	APP.innerHTML = `
    <main>
      ${header("Grid Notes")}
      <section class="mt-4">
        <h2 class="text-2xl mt-3 mb-1">What is it?</h2>
        <p class="my-2">This is an extension which allows you to keep notes attached to grid locations.</p>
        <p class="my-2">I've built this to help me run a hex-crawler. I used to keep my notes in Obsidian, but found it more and more challenging to cross reference party location with my notes. This extension solves that problem.</p>
        <p class="my-2">In the future, I hope to add an ability to attach notes to assets as well, so you can use it to plan combat encounters, or attach notes to NPCs and player tokens.</p>
      </section>
      <section class="mt-4 my-16">
        <h2 class="text-2xl mt-3 mb-1">Installation</h2>
        <p class="my-2">To install it, follow the instructions on the official Owlbear Rodeo website: ${link("https://docs.owlbear.rodeo/docs/getting-started/#adding-extensions", "https://docs.owlbear.rodeo/docs/getting-started/#adding-extensions")}</p>
        <p class="my-2">If you cannot locate Grid Notes, you can add it manually, by clicking the "<code>+</code>" icon in the top right corner and pasting this link:</p>
        <pre class="mt-4 my-2"><code>https://grid-notes.obr.sykst.me/manifest</code></pre>
        <img src=${installation} title="Installing a custom extension" alt="GIF showing steps to install a custom extension" class="mt-4" />
      </section>
    </main>
  `;
};

paint();
