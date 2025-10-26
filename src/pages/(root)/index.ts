import header from "../../components/header";
import "../../style.css";

const APP = document.querySelector<HTMLDivElement>("#app");

const paint = () => {
	APP.innerHTML = `
    <main>
      ${header("Grid Notes")}
      <section class="mt-4">
        <h2 class="text-2xl mt-3 mb-1">What is it?</h2>
        <p>This is an extension which does blah blah blah</p>
        <h2 class="text-2xl mt-3 mb-1">Installation</h2>
        <p>To install it, follow the instructions on the official Owlbear Rodeo website: <a href="https://docs.owlbear.rodeo/docs/getting-started/#adding-extensions" target="_blank" class="link">https://docs.owlbear.rodeo/docs/getting-started/#adding-extensions</a></p>
        <p>If you cannot locate Grid Notes, you can add it manually, by clicking the + icon in the top right corner and pasting this link:</p>
        <pre class="mt-4"><code>https://grid-notes.obr.sykst.me/manifest</code></pre>
      </section>
    </main>
  `;
};

paint();
